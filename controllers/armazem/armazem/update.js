const models = require('models');
const stockModel = models.armazem.stock;
const logsModel = models.armazem.logs;
const async = require('async');
const moment = require('moment-timezone');
const timeZone = 'Europe/Lisbon';

module.exports = {
  update: update
};

function update (req, res, next) {
  let itemsWithSerial = req.query.data;
  let itemsWithoutSerial = req.query.data;
  let to = req.query.to;
  let from = req.query.from;
  let user = req.user.id;

  let opts = {
    itemsWithoutSerial: itemsWithoutSerial,
    itemsWithSerial: itemsWithSerial,
    to: to,
    from: from,
    user: user
  };

  let tasks = [
    async.constant(opts),
    adjustItems,
    updateItemsWithSerial,
    verifyItemsWithoutSerial,
    updateItemsWithoutSerial,
    sendLogs
  ];

  async.waterfall(tasks, after);

  function after (err, data) {
    if (err) next(err);
    res.jason(data);
  }
}

function adjustItems (params, next) {
  let adjustedItemsWithSerial = [];
  let adjustedItemsWithoutSerial = [];
  let arrays = [adjustedItemsWithSerial, adjustedItemsWithoutSerial];
  let nArray = 0;

  async.each(params.itemsWithSerial, loop, end);

  function loop (each, callback) {
    let data = {
      from: params.from,
      to: params.to,
      user: params.user,
      serial: each.serial,
      ref: each.ref,
      quantity: each.quantity,
      name: each.name,
      date: moment.tz(timeZone).format(),
      state: params.state,
      obs: each.obs
    };

    arrays[nArray].push(data);
    callback();
  }

  function end (err) {
    if (err) next(err);

    if (nArray === 1) {
      params.adjustedItemsWithSerial = adjustedItemsWithSerial;
      params.adjustedItemsWithoutSerial = adjustedItemsWithoutSerial;
      next(null, params);
    } else {
      nArray++;
      async.each(params.itemsWithoutSerial, loop, end);
    }
  }
}

function updateItemsWithSerial (params, next) {
  let itemsWithSerialNotUpdated = [];

  async.each(params.adjustedItemsWithSerial, loop, end);

  function loop (each, callback) {
    stockModel.find.serialOwner(each, function (err, results) {
      if (err) callback(err);

      if (results.length) {
        stockModel.update.owner(each, function (err, results) {
          if (err) callback(err);
          callback();
        });
      } else {
        itemsWithSerialNotUpdated.push(each);
        callback();
      }
    });
  }

  function end (err) {
    if (err) next(err);

    params.itemsWithSerialNotUpdated = itemsWithSerialNotUpdated;
    next(null, params);
  }
}

function verifyItemsWithoutSerial (params, next) {
  let itemsWithoutSerialNotUpdated = [];
  let verifiedItemsWithouSerial = [];

  async.each(params.adjustedItemsWithoutSerial, loop, end);

  function loop (each, callback) {
    stockModel.find.ref(each.ref, each.value, each.from, function (err, results) {
      if (err) callback(err);

      let value = +results[0].quantity - each.quantity;
      each.value = value;
      if (value < 0) itemsWithoutSerialNotUpdated.push(each);
      else verifiedItemsWithouSerial.push(each);
      callback();
    });
  }

  function end (err) {
    if (err) next(err);
    params.itemsWithoutSerialNotUpdated = itemsWithoutSerialNotUpdated;
    params.verifiedItemsWithouSerial = verifiedItemsWithouSerial;
    next(null, params);
  }
}

function updateItemsWithoutSerial (params, next) {
  async.each(params.verifiedItemsWithouSerial, loop, end);

  function loop (each, callback) {
    stockModel.update.quantity(each.ref, each.value, each.from, function (err, results) {
      if (err) callback(err);
      stockModel.find.ref(each.ref, each.to, function (err, results) {
        if (err) callback(err);

        if (!results.length) {
          stockModel.insert(each, function (err, results) {
            if (err) callback(err);
            callback();
          });
        } else {
          let value = +each.quantity + results[0].quantity;
          stockModel.update.quantity(each.ref, value, each.to, function (err, results) {
            if (err) callback(err);
            callback();
          });
        }
      });
    });
  }

  function end (err) {
    if (err) next(err);
    next(null, params);
  }
}

function sendLogs (params, next) {
  let allDone = false;
  async.each(params.adjustedItemsWithSerial, loop, end);

  function loop (each, callback) {
    logsModel.insert(each, function (err, results) {
      if (err) callback(err);
      callback();
    });
  }

  function end (err) {
    if (err) next(err);
    if (allDone) {

    } else {
      allDone = true;
      async.each(params.verifiedItemsWithouSerial, loop, end);
    }
  }
}

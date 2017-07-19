const models = require('models');
const stock = models.armazem.stock;
const logs = models.armazem.logs;
const async = require('async');
const moment = require('moment-timezone');
const timeZone = 'Europe/Lisbon';

module.exports = function (req, res, next) {
  let serial = [];
  let noSerial = [];
  let tec = req.query.tec;
  let city = req.query.city;

  async.each(req.query.itemList, loop, end);

  function loop (item, callback) {
    item.tec = tec;
    item.date = moment.tz(timeZone).format();
    item.from = city;
    item.to = tec;
    item.user = req.user.firstName + ' ' + req.user.lastName;
    item.obs = '';
    item.state = 'Confirmed';
    if (item.serial !== 'Não Seriado') {
      item.quantity = 1;
      serial.push(item);
    } else noSerial.push(item);
    callback();
  }

  function end () {
    insertSerial(serial, function (err, serialRes) {
      if (err) next(err);
      insertNoSerial(noSerial, function (err, noSerialRes) {
        if (err) next(err);
        res.sendStatus(200);
      });
    });
  }
};

function insertSerial (items, callback) {
  async.each(items, loop, end);

  function loop (item, loopCB) {
    stock.updateOwner(item, function (err, results) {
      if (err) loopCB(err);
      logs.insert(item, function (err, res) {
        if (err) loopCB(err);
        loopCB();
      });
    });
  }

  function end () {
    callback(null);
  }
}

function insertNoSerial (items, callback) {
  let errors = [];
  let opts = {
    items: items,
    errors: errors,
    callback: callback
  };

  let tasks = [
    async.constant(opts),
    verifyItems,
    updateStock,
    insertLog
  ];

  async.waterfall(tasks, after);

  function after (err, data) {
    if (err) return callback(err);
    callback(null, data.errors);
  }
}

function verifyItems (params, next) {
  let items = [];
  async.each(params.items, loop, end);

  function loop (item, loopCB) {
    stock.findRef(item.ref, item.from, function (err, results) {
      if (err) loopCB(err);

      let value = +results[0].quantity - item.quantity;
      item.value = value;
      if (value < 0) params.errors.push(item);
      else items.push(item);
      loopCB();
    });
  }

  function end () {
    params.items = items;
    next(null, params);
  }
}

function updateStock (params, next) {
  async.each(params.items, loop, end);

  function loop (item, loopCB) {
    stock.updateQuantity(item.ref, item.value, item.from, function (err, results) {
      if (err) throw err;
      stock.findRef(item.ref, item.to, function (err, results) {
        if (err) throw err;

        if (!results.length) {
          stock.insert(item, function (err, results) {
            if (err) throw err;
            loopCB();
          });
        } else {
          let value = +item.quantity + results[0].quantity;
          stock.updateQuantity(item.ref, value, item.to, function (err, results) {
            if (err) throw err;
            loopCB();
          });
        }
      });
    });
  }

  function end () {
    next(null, params);
  }
}

function insertLog (params, next) {
  async.each(params.items, loop, end);

  function loop (item, loopCB) {
    logs.insert(item, function (err, results) {
      if (err) loopCB(err);
      loopCB();
    });
  }

  function end () {
    params.callback(null, params);
  }
}

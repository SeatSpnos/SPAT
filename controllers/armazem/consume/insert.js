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
  let ot = req.query.ot;
  let updateDelete = stock.removeSerial;

  if (ot === 'Lisboa' || ot === 'Porto' || ot === 'Alverca') {
    updateDelete = stock.updateOwner;
  }

  async.each(req.query.itemList, loop, end);

  function loop (item, callback) {
    item.tec = tec;
    item.date = moment.tz(timeZone).format();
    item.from = tec;
    item.to = ot;
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
    insertSerial(serial, updateDelete, function (err, serialRes) {
      if (err) next(err);
      insertNoSerial(noSerial, function (err, noSerialRes) {
        if (err) next(err);
        res.json([serialRes, noSerialRes]);
      });
    });
  }
};

function insertSerial (items, updateDelete, callback) {
  async.each(items, loop, end);

  function loop (item, loopCB) {
    updateDelete(item, function (err, results) {
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
    stock.findRef(item.ref, item.tec, function (err, results) {
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
    stock.updateQuantity(item.ref, item.value, item.tec, function (err, results) {
      if (err) loopCB(err);
      loopCB();
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

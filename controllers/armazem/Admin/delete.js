const models = require('models');
const stockModel = models.armazem.stock;
const logsModel = models.armazem.logs;
const async = require('async');
const moment = require('moment-timezone');
const timeZone = 'Europe/Lisbon';

module.exports = function (req, res, next) {
  let serial = [];
  let noSerial = [];
  let to = req.query.to;
  let city = req.query.city;

  async.each(req.query.itemList, loop, end);

  function loop (item, callback) {
    item.tec = to;
    item.date = moment.tz(timeZone).format();
    item.from = city;
    item.to = to;
    item.user = req.user.firstName + ' ' + req.user.lastName;
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
  console.log(`serial insert : ${items} `);
  async.each(items, loop, end);

  function loop (item, loopCB) {
    console.log(`serial insert loop: ${item} `);
    let opts = item;
    let tasks = [
      async.constant(opts),
      stock,
      logs
    ];
    async.waterfall(tasks, loopCB);
  }

  function end () {
    callback(null);
  }

  function stock (item, next) {
    console.log(`serial insert stock: ${item} `);
    stockModel.removeSerial(item, function (err, results) {
      if (err) return next(err);
      next(null, item);
    });
  }

  function logs (item, next) {
    console.log(`serial insert logs: ${item} `);
    logsModel.insert(item, function (err, res) {
      if (err) next(err);
      next(null, item);
    });
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
    stockModel.findRef(item.ref, item.from, function (err, results) {
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
    stockModel.updateQuantity(item.ref, item.value, item.from, function (err, results) {
      if (err) throw err;
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
    logsModel.insert(item, function (err, results) {
      if (err) loopCB(err);
      loopCB();
    });
  }

  function end () {
    params.callback(null, params);
  }
}

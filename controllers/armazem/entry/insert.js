const models = require('models');
const stock = models.armazem.stock;
const logs = models.armazem.logs;
const itemsModel = models.armazem.items;
const async = require('async');
const moment = require('moment-timezone');
const timeZone = 'Europe/Lisbon';

module.exports = {
  insertSerial: insertSerial,
  insertNoSerial: insertNoSerial
};

function insertSerial (req, res, next) {
  let itemsSerial = req.query.itemsSerial;

  prepareSerial(itemsSerial, req.user, req.query.city, function (err, serials) {
    if (err) next(err);
    res.json(serials);
  });
}

// ***** SERIALS ***** //

function prepareSerial (items, user, city, callback) {
  let dataArray = [];
  async.each(items, loop, end);

  function loop (each, loopCB) {
    let data = {
      name: each.item.nome,
      ref: each.item.referencia,
      quantity: 1,
      tec: city,
      date: moment.tz(timeZone).format(),
      from: 'Fornecedor',
      to: city,
      user: user.firstName + ' ' + user.lastName,
      state: 'Confirmed',
      obs: each.obs ? each.obs : ''
    };

    for (let i in each.serials) {
      let temp = (JSON.parse(JSON.stringify(data))); // hack to clone object so it pushes new object instead of data ref
      temp.serial = each.serials[i];
      dataArray.push(temp);
    }
    loopCB();
  }

  function end () {
    insertSerials(dataArray, callback); // bypass excell
    // checkFornecedor(dataArray, insertSerials, callback);
  }
}

function insertSerials (data, callback) {
  let duplicates = [];
  async.each(data, loop, end);

  function loop (item, loopCB) {
    stock.findSerial(item.serial, function (err, serialRes) {
      if (err) loopCB(err);
      if (!serialRes.length) {
        stock.insert(item, function (err, results) {
          if (err) loopCB(err);
          logs.insert(item, function (err, res) {
            if (err) loopCB(err);
            loopCB();
          });
        });
      } else {
        duplicates.push(item.serial);
        loopCB();
      }
    });
  }

  function end () {
    callback(null, duplicates);
  }
}

// ***** NO SERIALS ***** //

function insertNoSerial (req, res, next) {
  let itemsNoSerial = req.query.itemsNoSerial;
  if (itemsNoSerial) {
    itemsNoSerial.city = req.query.city;
    itemsNoSerial.obs = req.query.obs;
  }

  prepareNoSerial(itemsNoSerial, req.user, function (err, noSerials) {
    if (err) next(err);
    console.log(noSerials);
    res.json(noSerials);
  });
}

function prepareNoSerial (items, user, callback) {
  let dataArray = [];

  async.each(items, loop, end);

  items.obs = items.obs ? items.obs : '';

  function loop (item, loopCB) {
    
    let data = {};
    data.name = item.name;
    data.ref = item.ref;
    data.quantity = item.quantity;
    data.tec = items.city;
    data.date = moment.tz(timeZone).format();
    data.from = 'Fornecedor';
    data.to = items.city;
    data.user = user.firstName + ' ' + user.lastName;
    data.state = 'Confirmed';
    data.obs = item.obs.length ? item.obs : items.obs;
    data.serial = 'Não Seriado';

    let temp = (JSON.parse(JSON.stringify(data))); // hack to clone object so it pushes new object instead of data ref
    dataArray.push(temp);
    loopCB();
  }

  function end () {
    insertNoSerials(dataArray, callback); // bypass excell
    // checkFornecedor(dataArray, insertNoSerials, callback);
  }
}

function insertNoSerials (data, callback) {
  async.each(data, loop, end);

  function loop (item, loopCB) {
    stock.insertUpdate(item, function (err, results) {
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

function checkFornecedor (data, insert, callback) {
  let excel = [];
  let toInsert = [];
  async.each(data, loop, end);

  function loop (element, loopCB) {
    itemsModel.findREF(element.ref, function (err, res) {
      if (err) loopCB(err);
      if (res[0].fornecedor !== 'Logistica') toInsert.push(element);
      else excel.push(element);
      loopCB();
    });
  }
  function end () {
    insert(toInsert, function (err, results) {
      console.log('Back' + results )
      if (err) callback(err);      
      callback(null, excel);
    });
  }
}

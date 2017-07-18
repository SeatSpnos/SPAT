const model = require('models');
const async = require('async');
const moment = require('moment');
const tecsModel = model.tec;
const escalaModel = model.escala;
const nTecs = {
  Lisboa: [3, 4],
  Porto: [2, 2]
};
const folgas = {
  Lisboa: [4, 3, 2],
  Porto: [4, 2]
};

module.exports = function (req, res, next) {
  let dateBegin = moment(req.query.dateBegin);
  let dateEnd = moment(req.query.dateEnd);
  let zone = req.query.zone;

  async.whilst(compare, loop, after);

  function loop (callback) {
    doOneWeek(dateBegin, zone, function (err, results) {
      if (err) next(err);
      dateBegin.add(7, 'd');
      callback();
    });
  }

  function compare () { return dateEnd.diff(dateBegin, 'd') > 0; }

  function after () { res.sendStatus(200); }
};

function doOneWeek (dateBegin, zone, callback) {
  let opts = {
    date: dateBegin.clone(),
    zone: zone,
    nSaturday: nTecs[zone][0],
    nHorario: nTecs[zone][1]
  };

  let tasks = [
    async.constant(opts),
    init,
    saturdayAvailability,
    saturdayPickTecs,
    horarioAvailability,
    horarioPickTecs,
    createWeek,
    addSaturday,
    addHorario
  ];

  async.waterfall(tasks, after);

  function after (err, data) {
    if (err) return callback(err);
    callback(null, data);
  }
}

function init (params, next) {
  tecsModel.findZone(params.zone, function (err, tecsResults) {
    if (err) next(err);
    params.tecs = tecsResults;
    next(null, params);
  });
}

function saturdayAvailability (params, next) {
  let friday = params.date.clone().add(4, 'd');
  let monday = friday.clone().add(3, 'd');
  let availableTecs = [];

  async.each(params.tecs, loop, end);

  function loop (tec, callback) {
    escalaModel.findSaturday(tec.id, friday.format('YYYY-MM-DD'), monday.format('YYYY-MM-DD'), function (err, results) {
      if (err) next(err);
      if (results[0].available < 1) {
        availableTecs.push(tec);
      }
      callback();
    });
  }

  function end () {
    params.availableTecsSaturday = availableTecs;
    next(null, params);
  }
}

function saturdayPickTecs (params, next) {
  let tecsOrder = [];
  let saturday = params.date.clone().add(5, 'd');
  async.each(params.availableTecsSaturday, loop, end);

  function loop (tec, callback) {
    escalaModel.tecLastSaturday(tec.id, params.date.format('YYYY-MM-DD'), function (err, results) {
      if (err) next(err);
      if (!results.length) return callback();
      tecsOrder.push({ tec: tec, nWeeks: moment(saturday).diff(results[0].date, 'weeks') });
      callback();
    });
  }

  function end () {
    tecsOrder.sort(function (a, b) {
      return a.nWeeks - b.nWeeks;
    });
    params.tecsOrderSaturday = tecsOrder;
    next(null, params);
  }
}

function horarioAvailability (params, next) {
  let friday = params.date.clone().add(4, 'd');
  let availableTecs = [];

  async.each(params.tecs, loop, end);

  function loop (tec, callback) {
    escalaModel.findNight(tec.id, params.date.format('YYYY-MM-DD'), friday.format('YYYY-MM-DD'), function (err, results) {
      if (err) next(err);
      if (results[0].available > 3) {
        callback();
      } else {
        availableTecs.push(tec);
        callback();
      }
    });
  }

  function end () {
    params.availableTecsHorario = availableTecs;
    next(null, params);
  }
}

function horarioPickTecs (params, next) {
  let tecsOrder = [];
  let sunday = params.date.clone().add(6, 'd');
  async.each(params.availableTecsSaturday, loop, end);

  function loop (tec, callback) {
    escalaModel.tecLastNight(tec.id, sunday.format('YYYY-MM-DD'), function (err, results) {
      if (err) next(err);
      if (!results.length) return callback();
      tecsOrder.push({ tec: tec, nWeeks: moment(sunday).diff(results[0].date, 'weeks') });
      callback();
    });
  }

  function end () {
    tecsOrder.sort(function (a, b) {
      return a.nWeeks - b.nWeeks;
    });
    params.tecsOrderHorario = tecsOrder;
    params.weekStart = true;
    next(null, params);
  }
}

function createWeek (params, next) {
  async.each(params.tecs, loop, end);

  function loop (tec, callback) {
    escalaModel.findTec(tec.id, params.date.format('YYYY-MM-DD'), function (err, results) {
      if (err) callback(err);
      if (!results.length) {
        escalaModel.insert(tec.id, params.date.format('YYYY-MM-DD'), function (err, res) {
          if (err) callback(err);
          callback();
        });
      } else {
        escalaModel.reset(tec.id, params.date.format('YYYY-MM-DD'), function (err, res) {
          if (err) callback(err);
          callback();
        });
      }
    });
  }

  function end (err) {
    if (err) next(err);
    if (params.weekStart) {
      params.dateBegin = params.date.clone();
      params.dateEnd = params.date.clone().add(7, 'd');
      params.weekStart = false;
      createWeek(params, next);
    } else if (params.dateEnd.diff(params.date, 'd') < 2) {
      next(null, params);
    } else {
      params.date.add(1, 'd');
      createWeek(params, next);
    }
  }
}

function addSaturday (params, next) {
  let date = params.dateBegin.clone().add(5, 'd');
  async.whilst(compare, loop, end);

  function compare () { return params.nSaturday > 0; }

  function loop (callback) {
    let one = params.tecsOrderSaturday.pop();
    escalaModel.updateTecAddSaturday(one.tec.id, date.format('YYYY-MM-DD'), function (err, results) {
      if (err) callback(err);
      params.nSaturday--;
      let folgaDate = params.dateBegin.clone().add(folgas[params.zone][params.nSaturday], 'd').format('YYYY-MM-DD');
      escalaModel.updateTecFolga(one.tec.id, folgaDate, function (err, results) {
        if (err) callback(err);
        callback();
      });
    });
  }

  function end (err) {
    if (err) next(err);
    next(null, params);
  }
}

function addHorario (params, next) {
  let dateEnd = params.dateBegin.clone().add(5, 'd');
  async.whilst(compare, loop, end);

  function compare () { return params.nHorario > 0; }

  function loop (callback) {
    let one = params.tecsOrderHorario.pop();
    escalaModel.updateTecAddWeekHorario(one.tec.id, params.dateBegin.format('YYYY-MM-DD'), dateEnd.format('YYYY-MM-DD'), function (err, results) {
      if (err) callback(err);
      params.nHorario--;
      callback();
    });
  }

  function end (err) {
    if (err) next(err);
    next(null, params);
  }
}

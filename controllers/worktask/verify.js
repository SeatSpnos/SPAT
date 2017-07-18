const model = require('models').worktask;
const async = require('async');
const timeSlot = [
  '08:00 09:30',
  '09:30 11:00',
  '11:00 12:30',
  '12:30 14:00',
  '14:00 15:30',
  '15:30 17:00',
  '17:00 18:30',
  '18:30 20:00',
  '20:00 21:30',
  '22:00 23:30'
];

module.exports = function (req, res, next) {
  let status = [];
  let data = {
    // API data regarding selected slot
    date: req.body.newDate,
    tecnico: req.body.tec_id,
    slot_hora: timeSlot.indexOf(req.body.slot),
    slotsID: req.body.slotsID,
    // Client options
    nSlots: req.body.nSlots,
    helptec: req.body.helptec == 0 ? false : req.body.helptec,
    swaptec: req.body.newTec == 0 ? false : req.body.newTec,
    swapSlot: req.body.swapSlot == 0 ? false : req.body.swapSlot,
    jumpLunch: req.body.lunch == 0 ? true : false,
    help: false
  };

  adjustData(data, status, callback);

  function callback (err, results) {
    if (err) next(err);
    res.json(results);
  }
};

function adjustData (data, status, callback) {
  let numberOfSlots = 0;
  let currentSlot = data.swapSlot ? data.swapSlot : data.slot_hora;
  data.firstMainSlot = data.slot_hora;

  if (data.swaptec) data.tecnico = data.swaptec;

  async.whilst(condition, loop, end);

  function condition () { return numberOfSlots < data.nSlots; }

  function loop (loopCB) {
    data.slot_hora = currentSlot;

    if (data.swapSlot) data.originalSlot = data.firstMainSlot + numberOfSlots;

    if (data.originalSlot == 3 && data.jumpLunch) data.originalSlot++;

    sendData(data, function (err, response) {
      if (err) loopCB(err);
      status.push(response);
      currentSlot++;
      numberOfSlots++;

      if (currentSlot == 3 && data.jumpLunch) currentSlot++;

      loopCB();
    });
  }

  function end (err) {
    if (err) callback(err);

    if (data.helptec) {
      data.tecnico = data.helptec;
      data.swaptec = false;
      data.helptec = false;
      data.slot_hora = data.firstMainSlot;
      data.help = true;
      adjustData(data, status, callback);
    } else {
      callback(null, status);
    }
  }
}

function sendData (data, callback) {
  data.slot_hora = timeSlot[data.slot_hora];
  data.originalSlot = timeSlot[data.originalSlot];
  let ok = 'ok';
  let nok = ' já têm slot ocupada';
  let slotStatus = {
    tecnico: data.tecnico
  };

  checkSlotAvailability(data, function (err, status) {
    if (err) callback(err);
    if (status) {
      slotStatus.status = ok;
    } else {
      slotStatus.status = ' ás ' + data.slot_hora + nok;
    }
    callback(null, slotStatus);
  });
}

function checkSlotAvailability (data, callback) {
  model.checkSlotAvailability(data, function (err, results) {
    console.log('tecnico : ' + data.tecnico + ' data : '+ data.date + ' slot_hora : ' + data.slot_hora + ' results : ' + results)
    if (err) callback(err);
    if (results.length) {
      callback(null, false);
    } else {
      callback(null, true);
    }
  });
}

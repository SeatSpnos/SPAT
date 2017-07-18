
var moment 	= require('moment');
let query = require('models/query2');
let db = 'SE_SPNOS';

module.exports = {
  findSaturday: findS,
  findNight: findN,
  findTec: findT,
  findD: findD,
  findID: findID,
  create: create,
  updateFolga: updateF,
  updateFerias: updateFE,
  updateFalta: updateFA,
  updateHorario: updateH,
  updateFormacao: updateForm,
  updateFeriado: updateFeriado,
  updateClear: updateClear,
  updateSabado: updateSabado,
  updateInsert: updateInsert,
  update: update,
  clear: clear,
  tecLastSaturday: tecLastSaturday,
  tecLastNight: tecLastNight,
  insert: insert,
  reset: reset,
  updateTecAddSaturday: updateTecAddSaturday,
  updateTecAddWeekHorario: updateTecAddWeekHorario,
  updateTecFolga: updateTecFolga
};

function findS (id, friday, monday, callback) {
  var sql = 'SELECT sum( vacation + falta ) as available FROM day WHERE tecnico_FK_id = ? AND ( date = ? OR date =? )';
  var values = [id, friday, monday];
  query.post(db, sql, values, callback);
}

function findID (id, callback) {
  var sql = 'SELECT * FROM day WHERE id = ?';
  var values = [id];
  query.post(db, sql, values, callback);
}

function findN (id, begin, end, callback) {
  var sql = 'SELECT sum( case when vacation >= 1 then 1 else 0 end + case when falta >= 1 then 1 else 0 end ) as available FROM day WHERE tecnico_FK_id = ? AND date >= ? AND date <= ?';
  var values = [id, begin, end];
  query.post(db, sql, values, callback);
}

function findT (id, date, callback) {
  var sql = 'SELECT * FROM day WHERE tecnico_FK_id = ? AND date = ?';
  var values = [id, date];
  query.post(db, sql, values, callback);
}

function create (data, callback) {
  var sql = 'INSERT day SET tecnico_FK_id = ?, date = ?, horario = ?, escala= ?, folga = ?, feriado = ?, vacation  = ?, falta = ? ';
  var values = [data.id, data.date.format(), data.horario, data.escala, data.folga, data.feriado, data.ferias, data.falta];
  query.post(db, sql, values, callback);
}

function updateF (value, id, callback) {
  var sql = 'UPDATE day SET folga = ?, horario = 0, escala = 0, vacation = 0, falta = 0, feriado  = 0 WHERE id= ?';
  var values = [value, id];
  query.post(db, sql, values, callback);
}

function updateFE (value, id, callback) {
  var sql = 'UPDATE day SET vacation = ?, folga = 0, horario = 0, escala = 0, falta = 0, feriado  = 0 WHERE id= ?';
  var values = [value, id];
  query.post(db, sql, values, callback);
}
function updateFA (value, id, callback) {
  var sql = 'UPDATE day SET falta = ?, folga = 0, horario = 0, escala = 0, vacation = 0, feriado  = 0 WHERE id= ?';
  var values = [value, id];
  query.post(db, sql, values, callback);
}
function updateH (value, id, callback) {
  var sql = 'UPDATE day SET horario = ?, folga = 0, escala = 0, vacation = 0, falta = 0, feriado  = 0 WHERE id= ?';
  var values = [value, id];
  query.post(db, sql, values, callback);
}
function updateForm (value, id, callback) {
  var sql = 'UPDATE day SET folga = ?, horario = 0, escala = 0, vacation = 0, falta = 0, feriado  = 0 WHERE id= ?';
  var values = [value, id];
  query.post(db, sql, values, callback);
}
function updateFeriado (value, id, callback) {
  var sql = 'UPDATE day SET feriado = ?, folga = 0, horario = 0, escala = 0, vacation = 0, falta = 0 WHERE id= ?';
  var values = [value, id];
  query.post(db, sql, values, callback);
}
function updateSabado (value, id, callback) {
  var sql = 'UPDATE day SET feriado = 0, folga = 0, horario = 0, escala = ?, vacation = 0, falta = 0 WHERE id= ?';
  var values = [value, id];
  query.post(db, sql, values, callback);
}
function updateInsert (data, id, callback) {
  var sql = 'UPDATE day SET horario=?, escala=?, folga=? WHERE id= ?';
  var values = [data.horario, data.escala, data.folga, data.did];
  query.post(db, sql, values, callback);
}
function updateClear (value, id, callback) {
  var sql = 'UPDATE day SET feriado = 0, folga = 0, horario = 0, escala = 0, vacation = 0, falta = 0 WHERE id= ?';
  var values = [id];
  query.post(db, sql, values, callback);
}

function update (data, callback) {
  var sql = 'UPDATE day SET falta = ?, horario = ?, vacation = ? WHERE tecnico_FK_id = ? AND date =? ';
  var values = [data.falta, data.horario, data.ferias, data.tec, data.begin];
  query.post(db, sql, values, callback);
}

function findD (begin, end, callback) {
  var sql = 'SELECT day.*, tecnico.active FROM day INNER JOIN tecnico WHERE tecnico_FK_id = tecnico.id AND date >= ? AND date <= ? AND active = ? ORDER by tecnico_FK_id ASC , date ASC';
  var values = [begin, end, 1];
  query.post(db, sql, values, callback);
}

function clear (id, callback) {
  var sql = 'DELETE FROM day WHERE id = ? ';
  var values = [id];
  query.post(db, sql, values, callback);
}

function tecLastSaturday (tec, date, callback) {
  let sql = 'SELECT date FROM day WHERE escala = "1" AND tecnico_FK_id = ? AND date <= ? ORDER BY Date DESC LIMIT 1';
  let values = [tec, date];
  query.post(db, sql, values, callback);
}

function tecLastNight (tec, date, callback) {
  let sql = 'SELECT date FROM day WHERE horario = "1" AND tecnico_FK_id = ? AND date <= ? ORDER BY Date DESC LIMIT 1';
  let values = [tec, date];
  query.post(db, sql, values, callback);
}

function insert (tec, date, callback) {
  let sql = 'INSERT day SET tecnico_FK_id = ?, date = ?, horario = ?, escala= ?, folga = ?, feriado = ?, vacation  = ?, falta = ? ';
  let values = [tec, date, 0, 0, 0, 0, 0, 0];
  query.post(db, sql, values, callback);
}

function reset (tec, date, callback) {
  let sql = 'UPDATE day set horario = ?, escala= ?, folga= ? WHERE tecnico_FK_id = ? AND  date = ?';
  let values = [0, 0, 0, tec, date];
  query.post(db, sql, values, callback);
}

function updateTecAddSaturday (tec, date, callback) {
  let sql = 'UPDATE day SET escala = ? WHERE tecnico_FK_id = ? AND date = ?';
  let values = [1, tec, date];
  query.post(db, sql, values, callback);
}

function updateTecAddWeekHorario (tec, begin, end, callback) {
  let sql = 'UPDATE day SET horario = ? WHERE  tecnico_FK_id = ? AND (date >= ? AND date <= ?)';
  let values = [1, tec, begin, end];
  query.post(db, sql, values, callback);
}

function updateTecFolga (tec, date, callback) {
  let sql = 'UPDATE day SET folga = ? WHERE  tecnico_FK_id = ? AND date = ?';
  let values = [1, tec, date];
  query.post(db, sql, values, callback);
}

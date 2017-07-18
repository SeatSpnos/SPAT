let query = require('models/query2');
let db = 'SE_SPNOS';
module.exports = {

  find                  : find,
  findSlot              : findSlot,
  findTec               : findTec,
  findTS                : findTS,
  findID                : findID,
  findOT                : findOT,
  findSID               : findSID,
  findTD                : findTD,
  findTSD               : findTSD,
  findReserve           : findReserve,
  create                : create,
  update                : update,
  updateMass            : updateMass,
  updateMassNoTec       : updateMassNoTec,
  updateControl         : updateControl,
  updateTratado         : updateTratado,
  updateIncObs          : updateIncObs,
  updateSlot            : updateSlot,
  updateWithSlot        : updateWithSlot,
  updateWithTec         : updateWithTec,
  updateWithSlotAndTec  : updateWithSlotAndTec,
  updateCreateInfo      : updateCreateInfo,
  del                   : del,
  delOT                 : delOT,
  delTec                : delTec,
  reserve               : reserve,
  picket                : picket,
  noWork                : noWork,
  state                 : state,
  stateNoOt             : stateNoOt,
  checkSlotAvailability : checkSlotAvailability

}

function create(data,callback){
  var sql = 'INSERT work_flow SET slotsID = ?, date = ?, tecnico_FK_id = ?, client_number = ?, OT = ?,tipo_OT_FK_id = ?,tipo_TRB_FK_id =?, obs = ?, operador = ?, slot_hora = ?, celula_FK_id = ?, relatorio = ?, contact_number = ?, orcamento= ?'
  var values = [data.slotsID, data.date, data.tecnico, data.client_number, data.OT, data.tipo_OT, data.tipo_TRB, data.obs, data.operador, data.slot_hora, data.celula, data.relatorio, data.contact_number, data.orcamento]
  query.post(db, sql, values, callback)
}

function find(date, callback){
  var sql = 'SELECT * FROM work_flow WHERE date = ? AND reserve = "false" ORDER BY tecnico_FK_id ASC'
  let values = [date]
  query.post(db, sql, values, callback)
}

function findReserve(date, callback){
  var sql = 'SELECT * FROM work_flow WHERE date = ? AND reserve = "true" ORDER BY tecnico_FK_id ASC'
  let values = [date]
  query.post(db, sql, values, callback)
}

function findOT(OT, callback){
  var sql = 'SELECT * FROM work_flow WHERE slotsID = ? ORDER BY id ASC'
  let values = [OT]
  query.post(db, sql, values, callback)
}

function findID(id, callback){
  var sql = 'SELECT * FROM work_flow WHERE id = ?'
  let values = [id]
  query.post(db, sql, values, callback)
}

function findSlot(slot, callback){
  var sql = 'SELECT * FROM work_flow WHERE slot_hora = ? ORDER BY tecnico_FK_id ASC'
  let values = [slot]
  query.post(db, sql, values, callback)
}

function findTec(tec, callback){
  var sql = 'SELECT * FROM work_flow WHERE tecnico_FK_id = ? ORDER BY tecnico_FK_id ASC'
  let values = [tec]
  query.post(db, sql, values, callback)
}

function findTS(tec, slot, callback){
  var sql = 'SELECT * FROM work_flow WHERE tecnico_FK_id = ? AND slot_hora = ? ORDER BY tecnico_FK_id ASC'
  let values = [tec, slot]
  query.post(db, sql, values, callback)
}

function findTSD(tec, slot, date, callback){

  var sql = 'SELECT * FROM work_flow WHERE tecnico_FK_id = ? AND slot_hora = ? AND date = ? ORDER BY tecnico_FK_id ASC'
  let values = [ tec, slot, date ]
  query.post(db, sql, values, callback)
}

function findTD(tec, date, callback){
  var sql = 'SELECT * FROM work_flow WHERE tecnico_FK_id = ? AND date = ? ORDER BY slotsID ASC'
  let values = [tec, date]
  query.post(db, sql, values, callback)
}

function findSID( slotsID, callback){
  var sql = 'SELECT * FROM work_flow WHERE slotsID = ? ORDER BY tecnico_FK_id ASC'
  let values = [ slotsID ]
  query.post(db, sql, values, callback)
}

function update(data, callback){
  var sql = 'UPDATE work_flow SET date = ?, tecnico_FK_id = ?, client_number = ?, OT = ?, tipo_OT_FK_id = ?, tipo_TRB_FK_id =?, obs = ?, operador = ?, slot_hora = ?, celula_FK_id = ?, relatorio=?, contact_number = ?, orcamento = ? WHERE id = ?'
  var y = [data.date, data.tecnico, data.client_number, data.OT, data.tipo_OT, data.tipo_TRB, data.obs, data.operador, data.slot_hora, data.celula, data.relatorio, data.contact_number, data.orcamento, data.id]
  query.post( db, sql, y, callback )
}
function updateControl(data, callback){
  var sql = 'UPDATE work_flow SET c_obs = ?, inc_tratado = ?  WHERE id = ?'
  var y = [data.c_obs, data.inc_tratado, data.id]
  query.post( db, sql, y, callback )
}

function updateTratado(id, callback){
  var sql = 'UPDATE work_flow SET inc_tratado = 1  WHERE slotsID = ?'
  var y = [id]
  query.post( db, sql, y, callback )
}

function updateSlot(data, callback){
  var sql = 'UPDATE work_flow SET slot_hora = ?  WHERE slotsID = ? AND slot_hora = ?'
  var y = [ data.swapSlot, data.slotsID, data.slot_hora ]
  query.post( db, sql, y, callback )
}

function updateIncObs( id, obs, callback ) {
  var sql = 'UPDATE work_flow SET inc_obs = ?  WHERE slotsID = ?'
  var y = [ obs, id ]
  query.post( db, sql, y, callback )
}

function updateMass( data, callback ) {
  var sql = 'UPDATE work_flow SET date = ?, tecnico_FK_id = ?, client_number = ?, OT = ?, tipo_OT_FK_id = ?, tipo_TRB_FK_id =?, obs = ?, operador = ?, celula_FK_id = ?, relatorio = ?, contact_number = ?, orcamento = ? WHERE slotsID = ? AND tecnico_FK_id = ?'
  var y = [data.date, data.swaptec, data.client_number, data.OT, data.tipo_OT, data.tipo_TRB, data.obs, data.operador, data.celula, data.relatorio, data.contact_number, data.orcamento, data.slotsID, data.tecnico ]
  query.post( db, sql, y, callback )
}

function updateMassNoTec(data,callback){
  var sql = 'UPDATE work_flow SET date = ?, client_number = ?, OT = ?, tipo_OT_FK_id = ?, tipo_TRB_FK_id =?, obs = ?, operador = ?, celula_FK_id = ?, relatorio = ?, contact_number = ?, orcamento= ? WHERE slotsID = ?'
  var y = [data.date, data.client_number, data.OT, data.tipo_OT, data.tipo_TRB, data.obs, data.operador, data.celula, data.relatorio, data.contact_number, data.orcamento, data.slotsID]
  query.post( db, sql, y, callback)
}

function updateWithSlot( data, callback ) {
  var sql = 'UPDATE work_flow SET date = ?, slotsID = ?, slot_hora = ?, client_number = ?, OT = ?, tipo_OT_FK_id = ?, tipo_TRB_FK_id =?, obs = ?, operador = ?, slot_hora = ?, celula_FK_id = ?, relatorio=?, contact_number = ?, orcamento = ? WHERE tecnico_FK_id = ? AND date = ? AND slot_hora = ?'
  var y = [ data.date, data.slotsID, data.slot_hora, data.client_number, data.OT, data.tipo_OT, data.tipo_TRB, data.obs, data.operador, data.slot_hora, data.celula, data.relatorio, data.contact_number, data.orcamento, data.tecnico, data.originalDate, data.originalSlot ]
  query.post( db, sql, y, callback )
}


function updateWithTec( data, callback ) {
  var sql = 'UPDATE work_flow SET date = ?, slotsID = ?, tecnico_FK_id = ?, client_number = ?, OT = ?, tipo_OT_FK_id = ?, tipo_TRB_FK_id =?, obs = ?, operador = ?, slot_hora = ?, celula_FK_id = ?, relatorio=?, contact_number = ?, orcamento = ? WHERE tecnico_FK_id = ? AND date = ? AND slot_hora = ?'
  var y = [ data.date, data.slotsID, data.tecnico, data.client_number, data.OT, data.tipo_OT, data.tipo_TRB, data.obs, data.operador, data.slot_hora, data.celula, data.relatorio, data.contact_number, data.orcamento, data.previousTec, data.originalDate, data.slot_hora ]
  query.post( db, sql, y, callback )
}

function updateWithSlotAndTec( data, callback ) {
  var sql = 'UPDATE work_flow SET date = ?, slotsID = ?, tecnico_FK_id = ?, slot_hora = ?, client_number = ?, OT = ?, tipo_OT_FK_id = ?, tipo_TRB_FK_id =?, obs = ?, operador = ?, slot_hora = ?, celula_FK_id = ?, relatorio=?, contact_number = ?, orcamento = ? WHERE tecnico_FK_id = ? AND date = ? AND slot_hora = ?'
  var y = [ data.date, data.slotsID, data.tecnico, data.slot_hora, data.client_number, data.OT, data.tipo_OT, data.tipo_TRB, data.obs, data.operador, data.slot_hora, data.celula, data.relatorio, data.contact_number, data.orcamento, data.previousTec, data.originalDate, data.originalSlot ]
  query.post( db, sql, y, callback )
}

function updateCreateInfo( data, callback ) {

  let sql = 'SELECT * FROM work_flow WHERE tecnico_FK_id = ? AND date = ? AND slot_hora = ? '
  let values = [ data.tecnico, data.originalDate, data.slot_hora ]

  query.post(db, sql, values, function (err, results) {
    if (results.length) {
      sql = 'UPDATE work_flow SET date = ?, client_number = ?, OT = ?, tipo_OT_FK_id = ?, tipo_TRB_FK_id =?, obs = ?, operador = ?, celula_FK_id = ?, relatorio=?, contact_number = ?, orcamento = ? WHERE tecnico_FK_id = ? AND date = ? AND slot_hora = ?'
      values = [ data.date, data.client_number, data.OT, data.tipo_OT, data.tipo_TRB, data.obs, data.operador, data.celula, data.relatorio, data.contact_number, data.orcamento, data.tecnico, data.originalDate, data.slot_hora]
      query.post( db, sql, values, callback )
    } else {
      create( data, callback )
    }
  });
}

function del(id, callback){
  var sql = 'DELETE FROM work_flow WHERE id = ?'
  var values = [id]
  query.post(db, sql, values, callback)
}

function delOT(OT, callback){
  var sql = 'DELETE FROM work_flow WHERE slotsID = ?'
  var values = [OT]
  query.post(db, sql, values, callback)
}

function delTec( data, callback){
  var sql = 'DELETE FROM work_flow WHERE tecnico_FK_id = ? AND date = ? AND slot_hora = ?'
  var values = [ data.tecnico, data.date, data.slot_hora ]
  query.post(db, sql, values, callback)
}

function reserve(id, reserve, slotsID, operador, callback){
  var sql = 'UPDATE work_flow SET reserve = ?, slotsID = ?, operador = ? WHERE id = ?'
  var values = [reserve, slotsID, operador, id]
  query.post(db, sql, values, callback)
}

function noWork(id, slot, date, slotsID, callback){
  var sql = 'INSERT work_flow SET date = ?, tecnico_FK_id = ?, tipo_OT_FK_id = ?,tipo_TRB_FK_id =?, slot_hora = ?, celula_FK_id = ?, obs = "Sem Trabalho Disponivel", slotsID = ?'
  var values = [date, id, "9", "13", slot, "4474", slotsID]
  query.post(db, sql, values, callback)
}

function picket(id, slot, date, slotsID, callback){
  var sql = 'INSERT work_flow SET date = ?, tecnico_FK_id = ?, tipo_OT_FK_id = ?,tipo_TRB_FK_id =?, slot_hora = ?, celula_FK_id = ?, obs = "Prevenção", slotsID = ?'
  var values = [date, id, "9", "13", slot, "4474", slotsID]
  query.post(db, sql, values, callback)
}

function state( begin, end, callback ) {
  var sql = `SELECT work_flow.date, 
                SE_SPNOS.tecnico.name as tecnico, 
                SE_SPNOS.work_flow.client_number, 
                SE_SPNOS.work_flow.OT, 
                SE_SPNOS.tipo_ot.name as tipoOt, 
                SE_SPNOS.tipo_trb.name as tipoTrb, 
                SE_SPNOS.work_flow.slot_hora, 
                skynet.vw_edist_new.RESULTADO  
              FROM SE_SPNOS.work_flow 
              INNER JOIN SE_SPNOS.tecnico ON SE_SPNOS.work_flow.tecnico_FK_id = SE_SPNOS.tecnico.id 
              INNER JOIN SE_SPNOS.tipo_ot ON SE_SPNOS.work_flow.tipo_OT_FK_id = SE_SPNOS.tipo_ot.id 
              INNER JOIN SE_SPNOS.tipo_trb ON SE_SPNOS.work_flow.tipo_TRB_FK_id = SE_SPNOS.tipo_trb.id 
              JOIN skynet.vw_edist_new
              WHERE SE_SPNOS.work_flow.OT = skynet.vw_edist_new.CODIGO_OT && SE_SPNOS.work_flow.date >= ? && SE_SPNOS.work_flow.date <= ? `;
  var values = [begin, end];
  query.noDbPost( sql, values, callback );
}  

function stateNoOt( begin, end, callback ) {
  var sql = `SELECT work_flow.date, 
                tecnico.name as tecnico, 
                work_flow.client_number, 
                work_flow.OT, tipo_ot.name as tipoOt, 
                tipo_trb.name as tipoTrb, 
                work_flow.slot_hora 
              FROM work_flow INNER JOIN tecnico ON work_flow.tecnico_FK_id = tecnico.id 
              INNER JOIN tipo_ot ON work_flow.tipo_OT_FK_id = tipo_ot.id 
              INNER JOIN tipo_trb ON work_flow.tipo_TRB_FK_id = tipo_trb.id 
              WHERE work_flow.date >= ? AND work_flow.date <= ?  AND OT = ?`;
  var values = [ begin, end, '' ]
  query.post( db, sql, values, callback );
}  
  
function checkSlotAvailability( data, callback ) {
  var sql = 'SELECT * FROM work_flow WHERE tecnico_FK_id = ? AND date = ? AND slot_hora = ? AND reserve = ?';
  var y = [ data.tecnico, data.date, data.slot_hora, 'false' ];
  query.post(db, sql, y, callback);
}

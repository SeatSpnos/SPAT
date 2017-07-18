const model = require('models').worktask
const tec = require('models').tec
const updateWithSlotAndTec = require('models').worktask.updateWithSlotAndTec
const updateWithTec = require('models').worktask.updateWithTec
const updateWithSlot = require('models').worktask.updateWithSlot
const updateCreateInfo = require('models').worktask.updateCreateInfo
const async = require('async')
const Find = require('./find')
const uuidV4 = require('uuid/v4')
const util = require('util')


const timeSlot  = [
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
]

const emptyCelula   = 4474
const emptyOt_type  = 9
const emptyTRB      = 13

module.exports = function( req , res , next ) {

  let data = {
    //API data regarding selected slot
    date            : req.body.date,
    tecnico         : req.body.tec_id,
    slot_hora       : timeSlot.indexOf( req.body.slotHora ),
    operador        : req.user.firstName + " " + req.user.lastName,
    slotsID         : req.body.slotsID && req.body.newSlot == 1 ? req.body.slotsID : uuidV4(),
    //Client data 
    relatorio       : req.body.relatorio,
    orcamento       : req.body.orcamento,
    contact_number  : req.body.contact_number,
    client_number   : req.body.nclient.trim(),
    OT              : req.body.OT.trim(),
    tipo_OT         : !req.body.ot_type ? emptyOt_type  : req.body.ot_type,
    tipo_TRB        : !req.body.trb     ? emptyTRB      : req.body.trb,
    celula          : !req.body.celula  ? emptyCelula   : req.body.celula,
    obs             : req.body.obs,   
    //Client options
    nSlots          : req.body.nSlots, 
    helptec         : req.body.helptec  == 0 ? false : req.body.helptec,
    swaptec         : req.body.newTec   == 0 ? false : req.body.newTec,
    swapSlot        : req.body.swapSlot == 0 ? false : req.body.swapSlot,   
    jumpLunch       : req.body.lunch    == 0 ? true  : false, 
    createUpdate    : req.body.newSlot  == 0 ? false : true, // create false, update true this is globaly, default is create
    newDate         : req.body.newDate,     

  }


  if( data.helptec ) {
    if (req.body.obs.includes('Com a ajuda do tecnico')) {
      let index = req.body.obs.indexOf('Com a ajuda do tecnico')
      req.body.obs = req.body.obs.slice(0, index)
    }
    data.obs1 = req.body.obs
    data.obs2 = req.body.obs  

    tec.findTec( req.body.tec_id, function( err, tecData ) {

      data.obs2 += " Ajuda o tecnico " + tecData[0].name

      tec.findTec( req.body.helptec, function( err, tecData ) {

        data.obs1 += " Com a ajuda do tecnico " + tecData[0].name

        data.obs = data.obs1

        adjustData( data, callback )

      })  

    })

  } else {

    adjustData( data, callback )

  }

  function callback( err, results ) {

    if ( err ) next( err, results )

    Find( { body : { date: data.date, tec_id : req.body.tec_id}, user : req.user }, res, next )

  }

}



function adjustData( data, callback ) {

  let numberOfSlots = 0
  let currentSlot   = data.swapSlot ? data.swapSlot : data.slot_hora
  

  if( data.date !== data.newDate ) {
    data.createUpdate = true
  }

  data.originalDate = data.date 
  data.date         = data.newDate
  



  data.firstMainSlot = data.slot_hora

  if( data.swaptec ) {
    data.createUpdate = true;
    data.previousTec  = data.tecnico
    data.tecnico      = data.swaptec 
  }


  async.whilst( condition, loop, end )

  function condition() { return numberOfSlots < data.nSlots }

  function loop( loopCB ) {
    
    data.slot_hora = currentSlot

    if( data.swapSlot ) data.originalSlot = data.firstMainSlot + numberOfSlots

    if( data.originalSlot == 3 && data.jumpLunch ) data.originalSlot++  

    sendData( data, function( err, response ) {

      if( err ) loopCB( err )

      currentSlot++
      numberOfSlots++

      if( currentSlot == 3 && data.jumpLunch ) currentSlot++

      loopCB()

    })    

  } 

  function end() {

    if( data.helptec ) {

      data.tecnico    = data.helptec
      data.swaptec    = false
      data.helptec    = false
      data.slot_hora  = data.firstMainSlot
      data.obs        = data.obs2

      adjustData( data, callback )

    } else {
      callback( null, null )
    }

  }

}



function sendData( data, callback ) {

  data.slot_hora    = timeSlot[ data.slot_hora ]
  data.originalSlot = timeSlot[ data.originalSlot ]

  if( !data.createUpdate ) {

    create( data, callback )

  } else {

    if( data.swaptec && data.swapSlot ) {

      update( updateWithSlotAndTec, data, true, callback )

    } else if( data.swaptec ) {

      update( updateWithTec, data, true, callback)

    } else if( data.swapSlot ) {

      update( updateWithSlot, data, false, callback)

    } else {

      update( updateCreateInfo, data, false, callback )

    }

  }

}



function create( data, callback ) { model.create( data, callback ) }


function update( updateType, data, hasTec,callback ) {

  if( hasTec ) {

    model.delTec( data, function( err, response ) {

      updateType( data, callback )

    })

  } else {

    updateType( data, callback )

  }

}
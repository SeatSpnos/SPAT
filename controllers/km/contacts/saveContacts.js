var jsonfile = require('jsonfile')
var async = require('async')
var model = require('models').km.contacts.contacts


module.exports = function( data , daddy, callbacks ) {

  var dbInsert = []

  var father= { id : -1, pai : daddy  }

  callbacks( null, setupData( data, father, dbInsert ) )

}



function setupData( node, father) {

  var dbData = {

    id            : node.id,
    name          : node.name,
    title         : node.title,
    competencias  : node.competencias,
    phone         : node.phone, 
    email         : node.email,
    p_ID          : father.id,
    pai           : father.pai

  }
 
  node.pai = dbData.pai

  saveDB2( dbData, function( err , res ) {

    node.id = res

    if( node.children ) {

      node.children.forEach( function( cNode ) {

        setupData( cNode, node )

        return true;

      })

    }

    

  })

}


function saveDB2( contact, callback ) {

  model.findID( contact.id, contact.pai, function( err, res ) {

    if(!res.length) {

      model.insert( contact, function( err, rows) {

        if( err ) throw err

        callback( null, rows.insertId )

      })

    } else {

      callback( null, contact.id ) 

    }           

  })

 }






function saveDB( file, callback ) {

  var inserts = []

  async.each( file, loop, end )

  function loop( contact, cb ) {

    model.findID( contact.id, function( err, res ) {

      if(res.length) 
          
        cb()

      else model.insert( contact, function( err, rows) {

        if( err ) throw err

        inserts.push( rows.insertId )

        

        cb()

      } )

    })

  }

  function end() {

    callback( null, inserts )

  }

}


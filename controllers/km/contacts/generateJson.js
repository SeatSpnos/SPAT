var jsonfile = require('jsonfile')
var async = require('async')
var model = require('models').km.contacts.contacts


module.exports = function( data , callbacks ) {

  model.findPai( data, function( err, table ) {

    if( err ) callbacks( 0, null )

    if( table.length ) {

      findHead( table, function(err, head ) {

        if( err ) console.log("generateJson find head " + err)

        callbacks( null, writeJSON( head, table ) )  

      })   

    }  else {

      callbacks( 0, null )

    }     

  })

}



function writeJSON( node, table ) {

  var configFile = {

	id : node.id,
	name : node.name,
  title : "<p>" + node.title + "</p><p>" + node.competencias + "</p><i class='fa fa-address-book-o fa-2x' aria-hidden='true' data-toggle='tooltip_contact' title='" + node.phone + "' value='" + node.phone + "' style='float:left' onclick='copyToClipboard(this)' ></i><i style='float:right' class='fa fa-envelope-o fa-2x' aria-hidden='true' onclick='copyToClipboard(this)' value='" + node.email + "' data-toggle='tooltip_mail' title='" + node.email + "'></i>",
	children : []

  }

  getChildren( node, table).forEach( function( node ) {

      configFile.children.push( writeJSON( node, table ) )

  })

  return configFile

}



function findHead ( data, callback ){

  var node

  data.forEach( function ( contact ) {

    if( contact.p_ID == -1 ) {

      node = contact

      return true
    }     

  })

  callback( null, node)

}



function getChildren ( node, data){

  var temp = []

  data.forEach( function ( contact ) {

    if( contact.p_ID == node.id ) {

      temp.push( contact )      

    }

  })

  return temp 

}
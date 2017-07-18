
	$('[data-toggle="tooltip"]').tooltip({

			animated: 'fade',
			track: true,	
	    html: true

		});

	$(".category").on('contextmenu', function(e){

		e.preventDefault()

		$('#myModal').modal('toggle')

	})

	$('[name=Links]').on('contextmenu', function(e){

		e.preventDefault()

		var id = this.id

		$('#EditModal').find('.modal-body').load('/km_link_edit', { id : id } , function (responseText, textStatus) {

      if ( textStatus === 'success' || textStatus === 'notmodified'){

        $('#EditModal').modal('show')

      }

    })

	})

	$('#query1').on('click', function(e) {
		e.preventDefault()
		$('.query2').hide()
		$('.query3').hide()
		$('.query1').show()
	})

	$('#query2').on('click', function(e) {
		e.preventDefault()
		$('.query1').hide()
		$('.query3').hide()
		$('.query2').show()
	})
	$('#query3').on('click', function(e) {
		e.preventDefault()
		$('.query1').hide()
		$('.query2').hide()
		$('.query3').show()
	})


	$(document).on('click', 'a.links', function(e){ 

    e.preventDefault()

    var url = $(this).attr('href')

    var id 	= this.id

    window.open(url, '_blank')

    $.post( "/km_link_updateHits", { link : id }, function() { 

      	window.location.href = "http://wdt19167:3000/km_link";

    } )

    

	})
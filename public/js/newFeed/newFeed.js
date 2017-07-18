var $selectCategory = $('select.editableCategory').selectize({
		create: true,
		placeholder : 'Categoria',
		maxItems: 1,
		hideSelected: true
	})
	

	var $selectTags = $('select.editableTags').selectize({

		delimiter: '#',
		create: true,
		maxItems: null,
		hideSelected: true,
		placeholder : 'Tags'

	});

	$(function () {
		var now = moment().add(3, 'M');

    $('#datetimepicker').datetimepicker({
    	locale: 'pt',
    	format: 'YYYY-MM-DD',
    	defaultDate : now,
    })
  })
  var quill = new Quill('#editor', {
  	image: true,
    modules: {
	    toolbar: [
	    	['bold', 'italic', 'underline', 'strike'],        
	  		['blockquote', 'code-block'],

	  		[{ 'header': 1 }, { 'header': 2 }],               
			  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
			  [{ 'script': 'sub'}, { 'script': 'super' }],      
			  [{ 'indent': '-1'}, { 'indent': '+1' }],          
			  [{ 'direction': 'rtl' }],                         

			  [{ 'size': ['small', false, 'large', 'huge'] }],  
			  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

			  [{ 'color': [] }, { 'background': [] }],          
			  [{ 'font': [] }],
			  [{ 'align': [] }],
			  ['image']
			  ]
	  },
	  placeholder: 'I hid the body. Now what?',
	  theme: 'snow' 
	})

	var news = <%-JSON.stringify(oldNews)%>

  
	$('.edit').on( 'click', function() {

		var val = $('.editNews:selected')[0].value

		$('.isEdit').val(val)

		for (var i in news) {

			var temp = news[i].id

			if(temp == val) {
				
				$('[name=Title]').val(news[i].title)
				$selectCategory[0].selectize.addItem(news[i].category, true)
				console.log(news[i].tags)

				var arr = news[i].tags
				arr = arr.replace(/,/g, '#')
				arr = arr.split('#')
				console.log(arr)
				arr.forEach( function(tag) {

					$selectTags[0].selectize.addItem(tag, true)

				})
			
				
				$('[name=priority]').val(news[i].priority)
				$('[name=required]').val(news[i].required)
				$('[name=group]').val(news[i].grupo)
				$('[name=dateEnd]').val(news[i].expireDate)

				quill.setContents( JSON.parse( news[i].text ) )

				return

			}

		}
		
	})

	$('.new').on( 'click', function() {

		$('[name=Title]').val("")
		$selectCategory[0].selectize.clear(false)
		$selectTags[0].selectize.clear(false)
		$('[name=priority]').val("0")
		$('[name=required]').val("Não")
		$('[name=group]').val("Todos")

		quill.setContents( "" )

	})

	$('.inactive').on( 'click', function() {

		bootbox.confirm({ 
  		size: "small",
  		message: "Are you sure?", 
  		callback: function(result){ 

  			if( result ) {

  			var el = $('.editNews:selected')
				var val = el[0].value

				$.post( "/newfeed_inactive", { id : val } )

				el.remove();

  			}
  			
  		}
		})


		
		
	})

	$('#save').on('click', function() {

	  var about = document.querySelector('input[name=about]')

	  about.value = JSON.stringify(quill.getContents())

	})

	var form = document.querySelector('.insert')

	form.onsubmit = function() {

	  var about = document.querySelector('input[name=about]')

	  about.value = JSON.stringify(quill.getContents())
	  
	  return true
	}

$(document).ready(function(){
	$('#add-user-form').submit(function(e){
		e.preventDefault();
		var validation_errors = validate_form();
		if (!validation_errors) {
			var data = $('#add-user-form').serializeArray();
			add_to_grid(data);
			$('#add-user-form').trigger("reset");
		}

	});
});


/**
*
* Function to validate the form
* Returns errors. TRUE with error. FALSE with no errors
*
**/
function validate_form(){
	var errors = false;
	var errors_list = [];
	$('#form-results').empty();
	$('#form-results').removeClass();

	$('#add-user-form [type="text"]').each(function(){
		if ($(this).val() == ''){
			$(this).addClass('validation-error');
			errors=true;
			errors_list.push($(this).attr('label') + ' is required.'); 
		}
	});
	if(errors){
		$('#form-results').addClass('errors');
		$.each(errors_list, function(index, value){
			$('#form-results').append('<div class="response">' + value + '</div>');
		});

		// Remove validation errors if set in field
		$('.validation-error').focus(function(){
			$(this).removeClass('validation-error');
		});
	}else{
		$('#form-results').addClass('correct');
		$('#form-results').html('<div class="response">Form is correct. Student added to the table<div>');
	}
	return errors;
}


/**
*
* Function to add data to the grid
*
**/
function add_to_grid(data){
	var data_array = [];
	$.each(data, function(index, value){
		data_array[value.name] = value.value;
	});

	if(!$('#results-list .title:contains("' + data_array["Language"] +'")').length){
		$('#results-list').append('<h2 class="title ' + data_array["Language"] + '">' + data_array["Language"] + '</h2>');
	}

	$('#results-list .title:contains("' + data_array["Language"] +'")').after('<div class="student last-name">' + data_array["lastName"] + '</div>');
	$('#results-list .title:contains("' + data_array["Language"] +'")').after('<div class="student first-name">' + data_array["firstName"] + '</div>');
}
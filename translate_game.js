// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var lang_to		= "English";
	var lang_from		= "Spanish";
	var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	
	
	$( "#lang-from" ).text( lang_from );
	$( "#lang-to" ).text( lang_to );

	var cur = reload_cur(current_dict);

	$( "#entry" ).autocomplete({
      	source: Object.keys(current_dict),
      	minLength: 2,
      	delay: 0,
      	select: function( event, ui ) {
      		// Prevent default in order for clearing input field to work
      		event.preventDefault();
      		if(ui.item){
          	  $(event.target).val(ui.item.value);
       		}
       		// This will add the entry to history, and reload the current tanslation
      		cur = add_entry(cur, current_dict);
      	}
   	});

	// Click on submit button
    $( "#submit" ).click(function( event ) {
    	cur = add_entry(cur, current_dict);
    });

    // User hits enter
    $( "#entry" ).keypress(function( event ) {
	    if (event.which == 13) {
	        event.preventDefault();
	        cur = add_entry(cur, current_dict);
	        $( "#entry" ).autocomplete( "close" );
	    }
	});

});

// Randomly selects a new current translation,
// clears the input and gives it focus
function reload_cur(current_dict) {
	var keys = Object.keys(current_dict);
	var cur = keys[Math.floor(Math.random()*keys.length)];

	$( ".current" ).text ( current_dict[cur] );
	$( "#entry" ).val('');
	$( "#entry" ).focus();
	return cur;
}

// Adds cur to history and calls reload to get a new cur
function add_entry(cur, current_dict) {
	$( ".entry-row" ).after("<tr><td>" + current_dict[cur] + "</td><td>" + $( "#entry" ).val() + "</td>");

	if ( $( "#entry" ).val() === cur ){
		$( ".entry-row + tr" ).addClass("correct");
		$( ".entry-row + tr" ).append("<td><span class=\"ui-icon ui-icon-check\"></span></td>");
	} else {
		$( ".entry-row + tr" ).addClass("incorrect");
		$( ".entry-row + tr" ).append("<td>" + cur + "</td>");
	}
	
	cur = reload_cur(current_dict);
	return cur;
}
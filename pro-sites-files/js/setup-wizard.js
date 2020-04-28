jQuery( document ).ready( function(){
	var current_fs, next_fs, previous_fs;
	
	jQuery( '.next' ).on( 'click', function() {
		current_fs = jQuery( this ).parent().parent();
		next_fs = jQuery( this ).parent().parent().next();

		jQuery( '#progressbar li' ).removeClass( 'active' );
		jQuery( '#progressbar li' ).eq( jQuery( '.wpsass-setup-wizard-content' ).index( next_fs ) ).addClass( 'active' );

		next_fs.show();
		current_fs.hide();
	});
	
	jQuery( '.previous' ).on( 'click', function() {
		current_fs = jQuery( this ).parent().parent();
		previous_fs = jQuery( this ).parent().parent().prev();

		jQuery( '#progressbar li' ).removeClass( 'active' );
		jQuery( '#progressbar li' ).eq( jQuery( '.wpsass-setup-wizard-content' ).index( previous_fs ) ).addClass( 'active' );

		previous_fs.show();
		current_fs.hide();
	});

});

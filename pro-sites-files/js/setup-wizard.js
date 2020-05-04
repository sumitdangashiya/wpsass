jQuery( document ).ready( function(){
	var current_fs, next_fs, previous_fs;
	
	jQuery( '.next' ).on( 'click', function() {
		current_fs = jQuery( this ).parent().parent();
		next_fs = jQuery( this ).parent().parent().next();

		jQuery( '#progressbar li' ).eq( jQuery( '.wpsass-setup-wizard-content' ).index( next_fs ) ).addClass( 'active' );

		next_fs.show();
		current_fs.hide();
	});
	
	jQuery( '.previous' ).on( 'click', function() {
		current_fs = jQuery( this ).parent().parent();
		previous_fs = jQuery( this ).parent().parent().prev();

		jQuery( '#progressbar li' ).eq( jQuery( '.wpsass-setup-wizard-content' ).index( current_fs ) ).removeClass( 'active' );

		previous_fs.show();
		current_fs.hide();
	});
	/* Search Extensions */
	jQuery( ".wpsass-setup-wizard-extensions-search input" ).on( "keyup", function() {
		var search_value = jQuery( this ).val().toLowerCase();
		jQuery( ".wpsass-setup-wizard-extensions-block" ).filter(function() {
		  jQuery( this ).toggle( jQuery( this ).data( "search" ).toLowerCase().indexOf( search_value ) > -1 );
		});
	});	
	/*Add plan*/
	jQuery( '.wizard-add-level' ).on( 'click', function(){
		var add_name = jQuery( 'input[name="add_name"]' ).val();
		var price_1 = jQuery( 'input[name="add_price_1"]' ).val();
		var price_3 = jQuery( 'input[name="add_price_3"]' ).val();
		var price_12 = jQuery( 'input[name="add_price_12"]' ).val();
		var is_visible = jQuery( 'input[name="add_is_visible"]' ).val();
		
		var error = false;
		var error_Text = '';
		
		if( add_name == '' ) {
			error_Text += 'Please enter a valid level name.';
			error = true;
		}
		if( price_1 == '' && price_3 == '' && price_12 == '' ) {
			error_Text += '<br>You must enter a price for at least one payment period.';
			error = true;
		}
		if ( ! error ) {
			jQuery.ajax({
				url: ajax_object.ajax_url,
				type :'POST',
				data : {
					'action' : 'add_level_fn', // the php name function
					'add_name' : add_name,
					'price_1' : price_1,
					'price_3' : price_3,
					'price_12' : price_12,
					'is_visible' : is_visible,
				},
				beforeSend : function() {
					
				},
				success: function ( result ) {
					var level_no = parseInt( jQuery( '.level-no' ).text() ) + 1;
					jQuery( '.level-no' ).text( level_no );
					jQuery( 'input[name="add_name"]' ).val('');
					jQuery( 'input[name="add_price_1"]' ).val('');
					jQuery( 'input[name="add_price_3"]' ).val('');
					jQuery( 'input[name="add_price_12"]' ).val('');
					jQuery( 'input[name="add_is_visible"]' ).prop('checked');
					jQuery( '#prosites-level-list #the-list' ).html( result );
				}
			});
			
		} else {
			jQuery( '.msg_wrap' ).html( '<div class="error"><p>'+ error_Text +'</p></div>' );
		}
	} );	
	/*Delete plan*/
	jQuery( '#prosites-level-list' ).on( 'click', '.wizard-delete-level', function(){
		var delete_level_id = jQuery( this ).data( 'id' );
		jQuery.ajax({
			url: ajax_object.ajax_url,
			type :'POST',
			data : {
				'action' : 'delete_level_fn', // the php name function
				'delete_level_id' : delete_level_id,
			},
			beforeSend : function() {
				
			},
			success: function ( result ) {
				jQuery( '#prosites-level-list #the-list' ).html( result );
				var total_count = jQuery( '#prosites-level-list #the-list tr' ).length;
				var level_no = parseInt( total_count ) + 1;
				jQuery( '.level-no' ).text( level_no );
			}
		});
	} );
	
	jQuery( 'input[name="offer_trial_check"]' ).on( 'click', function(){
		if( jQuery( this ).prop( 'checked' ) == true ){
			jQuery( '.wpsass-setup-wizard-offer-trial' ).prop( 'disabled', false );
		} else {
			jQuery( '.wpsass-setup-wizard-offer-trial' ).prop( 'disabled', true );
			jQuery( '.wpsass-setup-wizard-offer-trial' ).val( '0' );
		}
	});
	
	jQuery( 'input[name="setup_fee_check"]' ).on( 'click', function(){
		if( jQuery( this ).prop( 'checked' ) == true ){
			jQuery( '.wpsass-setup-wizard-offer-fee' ).prop( 'disabled', false );
		} else {
			jQuery( '.wpsass-setup-wizard-offer-fee' ).prop( 'disabled', true );
			jQuery( '.wpsass-setup-wizard-offer-fee' ).val( '0' );
		}
	});
	
	jQuery( 'input[name="wpsass_setup_wizard_submit"]' ).on( 'click', function(){
		jQuery( '.wpsass-setup-wizard-extensions-pro .wpsass-setup-wizard-extensions-block input[type="checkbox"]' ).each( function(){
			if( jQuery( this ).prop( 'checked' ) == true ){
				window.open( 'https://wpsaas.pro', '_blank' );
				return false;
			}
		} );
	} );
	
	jQuery( '.extension-btn' ).on( 'click', function(){
		jQuery( '.wpsass-setup-wizard-payment-wrap .wpsass-setup-wizard-payment-block input[type="checkbox"]' ).each( function(){
			if( jQuery( this ).prop( 'checked' ) == true ){
				jQuery( '.payment-note-text' ).show();
				return false;
			}
		} );
	} );
	/* Subscribe Popup */
	jQuery( '.wpsass-setup-wizard-newsletter-btn a' ).on( 'click', function(){
		jQuery( '.wpsass-setup-wizard-subscribe-popup' ).show();
		jQuery( 'body' ).addClass( 'wpsaas-popup' );
	} );
	
	jQuery( '.subscribe-popup-close' ).on( 'click', function(){
		jQuery( '.wpsass-setup-wizard-subscribe-popup' ).hide();
		jQuery( 'body' ).removeClass( 'wpsaas-popup' );
	} );
});

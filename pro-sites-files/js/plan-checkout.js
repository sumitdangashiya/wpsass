jQuery( document ).ready( function(){
	jQuery( '.wpsaas-plan-tabs' ).tabs();
	jQuery('.wpsaas-plan-tabs-wrap .wpsaas-sign-up').each(function(){
		jQuery(this).click(function(){
			jQuery('.plan_name_select').val(jQuery(this).data('name'));
			jQuery('.plan_price_select').val(jQuery(this).data('price'));
			jQuery('.plan_length_select').val(jQuery(this).data('length'));
			jQuery('.wpsaas-plan-checkout-content').hide();
			jQuery('.wpsaas-plan-checkout-content#sitesetup-step').show();
			jQuery('#plan_progressbar #sitesetup-step').addClass('active');
		});
	});
	jQuery('.wpsaas-site-setup-btn .wpsaas-sign-up').click(function(){
		jQuery( '.msg_wrap' ).html('');
		var site_email = jQuery( 'input[name="site_email"]' ).val();
		var site_password = jQuery( 'input[name="site_password"]' ).val();
		var your_site = jQuery( 'input[name="your_site"]' ).val();
		var site_title = jQuery( 'input[name="site_title"]' ).val();
		var error = false;
		var error_Text = '';
		if( site_email == '' ) {
			error_Text += '<br>Please enter a valid email address.';
			error = true;
		}
		if( site_password == '' ) {
			error_Text += '<br>Please enter a valid password.';
			error = true;
		}
		if( your_site == '' ) {
			error_Text += '<br>Please enter a valid site name.';
			error = true;
		}
		if( site_title == '' ) {
			error_Text += '<br>Please enter a valid site title.';
			error = true;
		}if ( ! error ) {
			jQuery.ajax({
				url: ajax_checkout.ajax_url,
				type :'POST',
				dataType: 'json',
				data : {
					'action' : 'check_email_blog', // the php name function
					'site_email' : site_email,
					'your_site' : your_site,
					'site_title' : site_title,
				},
				success: function (data) {
					console.log(data.validate);
					if(data.validate == 'wrong'){
						jQuery( '.wrong_wrap' ).html( '<div class="error"><p>'+ data.message +'</p></div>' );
						return false;
					}
					else if(data.validate == false){
						jQuery( '.msg_wrap' ).html( '<div class="error"><p>'+ data.message +'</p></div>' );
						return false;
					}
					else if(data.validate == true){
						jQuery('.wpsaas-payment-setup-wrap .wpsaas-site-email').text(jQuery('.wpsaas-site-setup-wrap .site_email').val());
						jQuery('.wpsaas-payment-setup-wrap .wpsaas-site-name').text(jQuery('.wpsaas-site-setup-wrap .your_site').val());
						jQuery('.wpsaas-payment-setup-wrap .wpsaas-plan-value').text(jQuery('#pricing-step .plan_price_select').val());
						jQuery('.wpsaas-payment-setup-wrap .wpsaas-plan-length').text(jQuery('#pricing-step .plan_length_select').val());
						jQuery('.wpsaas-plan-checkout-content').hide();
						jQuery('.wpsaas-plan-checkout-content#planpayment-step').show();
						jQuery('#plan_progressbar #planpayment-step').addClass('active');
					}
				}
			});
			
		} else {
			jQuery( '.msg_wrap' ).html( '<div class="error"><p>'+ error_Text +'</p></div>' );
		}
	});
	jQuery('.wpsaas-plan-checkout-main').on("submit",function(){
		var site_email = jQuery( 'input[name="site_email"]' ).val();
		var site_password = jQuery( 'input[name="site_password"]' ).val();
		var your_site = jQuery( 'input[name="your_site"]' ).val();
		var site_title = jQuery( 'input[name="site_title"]' ).val();
		jQuery.ajax({
			url: ajax_checkout.ajax_url,
			type :'POST',
			data : {
				'action' : 'insert_site_user', // the php name function
				'site_email' : site_email,
				'site_password' : site_password,
				'your_site' : your_site,
				'site_title' : site_title,
			},
			success: function (data) {
				
			}
		});
		return false;
	});
});

jQuery( document ).ready( function(){
	jQuery('.wpsaas-login-form .login-username label').text('Email Address');
	jQuery( '.wpsaas-plan-tabs' ).tabs();
	jQuery('.wpsaas-plan-tabs-wrap .wpsaas-sign-up').each(function(){
		jQuery(this).click(function(){
			jQuery('.plan_name_select').val(jQuery(this).data('name'));
			jQuery('.plan_price_select').val(jQuery(this).data('price'));
			jQuery('.plan_length_select').val(jQuery(this).data('length'));
			jQuery('.plan_period_select').val(jQuery(this).data('period'));
			if(jQuery( '.wpsaas-login-form' ).hasClass('wpsaas-login-show')==false) {
				jQuery('.wpsaas-plan-checkout-content').hide();
				jQuery('.wpsaas-plan-checkout-content#sitesetup-step').show();
				jQuery('#plan_progressbar #sitesetup-step').addClass('active');
			}
		});
	});
	jQuery('.wpsaas-site-setup-btn .wpsaas-site-setup').click(function(){
		jQuery( '.msg_wrap' ).html('');
		var site_email = jQuery( 'input[name="site_email"]' ).val();
		var site_password = jQuery( 'input[name="site_password"]' ).val();
		var your_site = jQuery( 'input[name="your_site"]' ).val();
		var site_title = jQuery( 'input[name="site_title"]' ).val();
		var error = false;
		var error_Text = '';
		if( site_email == '' ) {
			error_Text += '<p>Please enter a valid email address.</p>';
			error = true;
		}
		if( site_password == '' ) {
			error_Text += '<p>Please enter a valid password.</p>';
			error = true;
		}
		if( your_site == '' ) {
			error_Text += '<p>Please enter a valid site name.</p>';
			error = true;
		}
		if( site_title == '' ) {
			error_Text += '<p>Please enter a valid site title.</p>';
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
			jQuery( '.msg_wrap' ).html( '<div class="error">'+ error_Text +'</div>' );
		}
	});
	jQuery( '.wpsaas-login-wrap .login-toggle' ).on( 'click', function () {
        jQuery( '.wpsaas-login-form' ).toggle();
        jQuery( '.wpsaas-login-form' ).toggleClass('wpsaas-login-show');
    });
    jQuery(".wpsaas-login-form #wp-submit").on('click',function(){
		jQuery("#login-error").html('');
		var username = jQuery.trim(jQuery('#user_login').val());
		var password = jQuery.trim(jQuery('#user_pass').val());
		if(jQuery('#rememberme').is(":checked") == true) {
			var rememberme = jQuery.trim(jQuery('#rememberme').val());
		} else {
			var rememberme = '';
		}
		
		//plan selection
		var name_select = jQuery( 'input[name="plan_name_select"]' ).val();
		var length_select = jQuery( 'input[name="plan_length_select"]' ).val();
		var price_select = jQuery( 'input[name="plan_price_select"]' ).val();
		var period_select = jQuery( 'input[name="plan_period_select"]' ).val();
		
		if(password.length != 0 && username.length != 0){
			jQuery.ajax({
				url: ajax_checkout.ajax_url,
				type: "POST",
				dataType: 'json',
				data:    ({
					action  : 'member_login_fun',
					username:username,
					password:password,
					rememberme:rememberme,
				}),
				beforeSend: function() {
				},
				success: function(data){
					jQuery("#login-error").html('<div class="error">'+data.message+'</div>');
					if(data.loggedin == true){
						if(name_select.length != 0 || length_select.length != 0 || price_select.length != 0 || period_select.length != 0){
							jQuery('.wpsaas-plan-checkout-content').hide();
							jQuery('.wpsaas-plan-checkout-content#sitesetup-step').show();
							jQuery('#plan_progressbar #sitesetup-step').addClass('active');
							jQuery( 'input[name="site_email"]' ).val(username);
							jQuery( 'input[name="site_password"]' ).val(password);
							jQuery( 'input[name="site_email"]' ).attr('readonly', true);
							jQuery( 'input[name="site_password"]' ).attr('readonly', true);
						} else {
							jQuery("#login-error").html('<div class="error">Please select plan to continue.</div>');
						}
						jQuery('.wpsaas-plan-tabs-wrap .wpsaas-sign-up').each(function(){
							jQuery(this).click(function(){
								jQuery('.wpsaas-plan-checkout-content').hide();
								jQuery('.wpsaas-plan-checkout-content#sitesetup-step').show();
								jQuery('#plan_progressbar #sitesetup-step').addClass('active');
								jQuery( 'input[name="site_email"]' ).val(username);
								jQuery( 'input[name="site_password"]' ).val(password);
								jQuery( 'input[name="site_email"]' ).attr('readonly', true);
								jQuery( 'input[name="site_password"]' ).attr('readonly', true);
							});
						});
					}else{
						
					}
				},
				complete: function() {
				},

			});
		}else{
			jQuery("#login-error").html('<div class="error">One or more fields have an error. Please check and try again.</div>');
			return false;
		}
		return false;
	});
	jQuery('.wpsaas-plan-checkout-main .submit').on("click",function(){
		var site_email = jQuery( 'input[name="site_email"]' ).val();
		var site_password = jQuery( 'input[name="site_password"]' ).val();
		var your_site = jQuery( 'input[name="your_site"]' ).val();
		var site_title = jQuery( 'input[name="site_title"]' ).val();
		var index_site = jQuery( 'input[name="index_site"]:checked' ).val();
		var name_select = jQuery( 'input[name="plan_name_select"]' ).val();
		var period_select = jQuery( 'input[name="plan_period_select"]' ).val();
		jQuery.ajax({
			url: ajax_checkout.ajax_url,
			type :'POST',
			dataType: 'json',
			data : {
				'action' : 'insert_site_user', // the php name function
				'site_email' : site_email,
				'site_password' : site_password,
				'your_site' : your_site,
				'site_title' : site_title,
				'index_site' : index_site,
				'name_select' : name_select,
				'period_select' : period_select,
			},
			success: function (data) {
				window.location.href = data.redirect;
			}
		});
		return false;
	});
	jQuery( '.wpsaas-coupon-wrap [name=apply-coupon-link]' ).unbind( 'click' );
    jQuery( '.wpsaas-coupon-wrap [name=apply-coupon-link]' ).click( function ( e ) {
        var input_box = jQuery( '.wpsaas-coupon-wrap .wpsaas-coupon-field input' );
        var icon = jQuery( '.wpsaas-coupon-wrap .coupon .coupon-status' );
        var pos = input_box.position();

        jQuery( '.wpsaas-coupon-wrap .wpsaas-coupon-field' ).removeClass( 'coupon-valid' );
        jQuery( '.wpsaas-coupon-wrap .wpsaas-coupon-field' ).removeClass( 'coupon-invalid' );

        var code = jQuery( input_box ).val();

        /* Reset */
        jQuery( '.original-amount' ).removeClass( 'scratch' );
        jQuery( '.coupon-amount' ).remove();
        jQuery( '.original-period' ).removeClass( 'hidden' );
        jQuery( '.coupon-period' ).remove();

        /* Check Coupon AJAX */
        jQuery.post(
            prosites_checkout.ajax_url, {
                action: 'member_coupon',
                'coupon_code': code
            }
        ).done( function ( data, status ) {

                var response = jQuery.parseJSON( jQuery( data ).find( 'response_data' ).text() );

                if ( response.valid ) {
                    jQuery( 'wpsaas-coupon-wrap .wpsaas-coupon-field' ).addClass( 'coupon-valid' );
                } else {
                    jQuery( 'wpsaas-coupon-wrap .wpsaas-coupon-field' ).addClass( 'coupon-invalid' );
                }

                // Handle empty returns
                var levels = response.levels;
                if ( typeof levels != 'undefined' ) {

                    jQuery.each( levels, function ( level_id, level ) {

                        if ( level.price_1_adjust ) {
                            var plan_original = jQuery( 'ul.psts-level-' + level_id + ' .price.price_1 plan-price.original-amount' );

                            var original = jQuery( 'ul.psts-level-' + level_id + ' .price.price_1 .original-amount' );

                            if ( original.length == 0 ) {
                                original = jQuery( 'tr.level-' + level_id + ' .price.price_1 .original-amount' );
                            }

                            jQuery( original ).after( level.price_1 );
                            jQuery( original ).addClass( 'scratch' );

                            // Period display needs adjusting
                            if ( level.price_1_period != '' ) {
                                var period_original = jQuery( 'ul.psts-level-' + level_id + ' .price.price_1 .period.original-period' );
                                if ( period_original.length == 0 ) {
                                    period_original = jQuery( 'tr.level-' + level_id + ' .price.price_1 .original-period' );
                                }
                                jQuery( period_original ).addClass( 'hidden' );
                                jQuery( period_original ).after( level.price_1_period );
                            }

                        }
                        if ( level.price_3_adjust ) {
                            var original = jQuery( 'ul.psts-level-' + level_id + ' .price.price_3 .original-amount' );
                            if ( original.length == 0 ) {
                                original = jQuery( 'tr.level-' + level_id + ' .price.price_3 .original-amount' );
                            }

                            var monthly_original = jQuery( 'ul.psts-level-' + level_id + ' .price_3 .monthly-price.original-amount' );
                            var savings_original = jQuery( 'ul.psts-level-' + level_id + ' .price_3 .savings-price.original-amount' );
                            if ( monthly_original.length == 0 ) {
                                monthly_original = jQuery( 'tr.level-' + level_id + ' .level-summary.price_3 .monthly-price.original-amount' );
                            }
                            if ( savings_original.length == 0 ) {
                                savings_original = jQuery( 'tr.level-' + level_id + ' .level-summary.price_3 .savings-price.original-amount' );
                            }

                            jQuery( original ).after( level.price_3 );
                            jQuery( monthly_original ).after( level.price_3_monthly );
                            jQuery( savings_original ).after( level.price_3_savings );
                            jQuery( original ).addClass( 'scratch' );
                            jQuery( monthly_original ).addClass( 'scratch' );
                            jQuery( savings_original ).addClass( 'scratch' );

                            // Period display needs adjusting
                            if ( level.price_3_period != '' ) {
                                var period_original = jQuery( 'ul.psts-level-' + level_id + ' .price.price_3 .period.original-period' );
                                if ( period_original.length == 0 ) {
                                    period_original = jQuery( 'tr.level-' + level_id + ' .price.price_3 .period.original-period' );
                                }
                                jQuery( period_original ).addClass( 'hidden' );
                                jQuery( period_original ).after( level.price_3_period );
                            }

                        }
                        if ( level.price_12_adjust ) {
                            var original = jQuery( 'ul.psts-level-' + level_id + ' .price.price_12 .original-amount' );
                            if ( original.length == 0 ) {
                                original = jQuery( 'tr.level-' + level_id + ' .price.price_12 .original-amount' );
                            }

                            var monthly_original = jQuery( 'ul.psts-level-' + level_id + ' .price_12 .monthly-price.original-amount' );
                            var savings_original = jQuery( 'ul.psts-level-' + level_id + ' .price_12 .savings-price.original-amount' );
                            if ( monthly_original.length == 0 ) {
                                monthly_original = jQuery( 'tr.level-' + level_id + ' .level-summary.price_12 .monthly-price.original-amount' );
                            }
                            if ( savings_original.length == 0 ) {
                                savings_original = jQuery( 'tr.level-' + level_id + ' .level-summary.price_12 .savings-price.original-amount' );
                            }

                            jQuery( original ).after( level.price_12 );
                            jQuery( monthly_original ).after( level.price_12_monthly );
                            jQuery( savings_original ).after( level.price_12_savings );
                            jQuery( original ).addClass( 'scratch' );
                            jQuery( monthly_original ).addClass( 'scratch' );
                            jQuery( savings_original ).addClass( 'scratch' );

                            // Period display needs adjusting
                            if ( level.price_12_period != '' ) {
                                var period_original = jQuery( 'ul.psts-level-' + level_id + ' .price.price_12 .period.original-period' );
                                if ( period_original.length == 0 ) {
                                    period_original = jQuery( 'tr.level-' + level_id + ' .price.price_12 .period.original-period' );
                                }
                                jQuery( period_original ).addClass( 'hidden' );
                                jQuery( period_original ).after( level.price_12_period );
                            }
                        }

                    } );
                }

            } );

    } );
    jQuery('#stripe-button').on('click', function(event) {

              event.preventDefault();

              var jQuerybutton = jQuery(this);

              var opts = jQuery.extend({}, jQuerybutton.data(), {
                token: function(result) {

                  // console.log(result); return;

                  jQuery.redirectPost(jQuerybutton.attr('href'), {
                    stripeEmail: result.email,
                    stripeToken: result.id,
                  });
                  
                }
              });

              StripeCheckout.open(opts);

            });
});

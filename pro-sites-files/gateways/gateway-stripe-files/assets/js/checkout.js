// Get card update button.
var updateCardButton = document.getElementById( 'psts-stripe-card-update' );
// Get existing card button.
var existingCardButton = document.getElementById( 'psts-existing-submit' );

// Process payment with existing card.
if ( existingCardButton ) {
// On button click, submit the form.
	existingCardButton.onclick = function () {
		document.getElementById( 'psts-stripe-checkout' ).submit();
	};
}

// We have update form and required vars.
if ( updateCardButton && typeof window.psts_stripe != 'undefined' ) {
	// Configure Stripe checkout.
	/*var handler = StripeCheckout.configure( {
		key: window.psts_stripe.publisher_key,
		image: window.psts_stripe.image,
		locale: window.psts_stripe.locale,

		// Update the card data in backend.
		token: function ( token, args ) {
			// Get the update form.
			var updateForm = document.getElementById( 'psts-stripe-update' );
			// Create new input.
			var tokenInput = document.createElement( 'INPUT' );
			// Set required data.
			tokenInput.setAttribute( 'type', 'hidden' );
			tokenInput.setAttribute( 'name', 'stripe_token' );
			tokenInput.setAttribute( 'value', token.id );
			updateForm.appendChild( tokenInput );
			// Submit the form now.
			updateForm.submit();
		}
	} );

	// Call update form on button click.
	updateCardButton.addEventListener( 'click', function ( e ) {
		// Open Checkout with further options:
		handler.open( {
			name: window.psts_stripe.name,
			description: window.psts_stripe.description,
			email: window.psts_stripe.email
		} );
		e.preventDefault();
	} );

	// Close Checkout on page navigation:
	window.addEventListener( 'popstate', function () {
		handler.close();
	} );*/
	
	
	var stripe_public_key = window.psts_stripe.publisher_key; 
	var stripe_secret_key = jQuery( '.plan_stripe_secret_key' ).val(); 
	var stripe = Stripe( stripe_public_key );
	var elements = stripe.elements();
	var style = {
		base: {
			fontFamily: '"Open Sans", Helvetica,Arial,Lucida,sans-serif',
			fontSmoothing: 'antialiased',
			fontSize: '16px',
			'::placeholder': {
				color: '#aab7c4'
			},
		},
		invalid: {
			color: '#ff0000',
			iconColor: '#ff0000'
		}
	};
	
	var cardNumber = elements.create('cardNumber', {
		style: style,
	});
	cardNumber.mount('#wpsaas-stripe-card-number-update');

	var cardExpiry = elements.create('cardExpiry', {
		style: style,
	});
	cardExpiry.mount('#wpsaas-stripe-card-expiry-update');

	var cardCvc = elements.create('cardCvc', {
		style: style,
	});
	cardCvc.mount('#wpsaas-stripe-card-cvc-update');
	
	var form = document.getElementById('psts-stripe-update');
	form.addEventListener('submit', function (event) {
		console.log("helllo");
		event.preventDefault();
		stripe.createToken(cardNumber).then(function (result) {
			console.log(result);
			if (result.error) {
				// Inform the customer that there was an error.
				jQuery( '#card-errors' ).show();
				jQuery( '#card-errors' ).text(result.error.message);
			} else {
				var token_id = result.token.id;
				// Create new input.
				var tokenInput = document.createElement( 'INPUT' );
				// Set required data.
				tokenInput.setAttribute( 'type', 'hidden' );
				tokenInput.setAttribute( 'name', 'stripe_token' );
				tokenInput.setAttribute( 'value', token_id );
				form.appendChild( tokenInput );
				jQuery( '#card-errors' ).hide();
				jQuery( '.wpsaas-stripe-button' ).prop( "disabled", true );
				jQuery( '.payment_processing' ).show();
				form.submit();
			}
		});
	});
}
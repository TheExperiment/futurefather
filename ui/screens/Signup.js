$(function() {
	var WIN = $(window);
	var DOC = $(document);
	var initialized = false;
	var id = 1;
  var didSubmit;
  var resp;
  var scrollTop = 0;

	function pageResize(e) {
		WIN_H = WIN.height();
		WIN_W = WIN.width();

		initialized = true;
	}
  WIN.bind('scroll', scrollHandler);
	WIN.bind('keydown', keyHandler);
  scrollHandler();
	function keyHandler(argument) {
		if (argument.keyCode == 13) {
			submitEmail();
		}
	}
  $('.btn-interested').on('click', function() {
    submitEmail();
  })
  $('#signup-email').on('focus',function(){
    $('.btn-interested').html('INTERESTED.')
    $('.signup-holder').addClass('focus');
  })
  $('.signup').on('click',function () {
    $('#signup-email').focus();
  })
	$('.founding').on('click', function() {
    $('.founding').unbind('click');
	})
  function founderSuccess(){
    // success
    $('.founding .message').html('YOU ARE FOUNDING FATHER #' + resp.responseJSON.success.founderUsersCount + '!');
    $('.founding .icon')
        .html(
          '<a href="https://twitter.com/home?status=The%20Father%26Son%20app%20is%20being%20built.%20I%20am%20Founding%20Father%20%23'
            + resp.responseJSON.success.founderUsersCount
            + '%20http://futurefather.co" target="_blank"> <svg class="founder-twitter" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30.278px" height="24.221px" viewBox="-2.64 -2.112 30.278 24.221" enable-background="new -2.64 -2.112 30.278 24.221" xml:space="preserve"><path fill="#FEF5B9" d="M27.638,0.756c-1.113,0.487-2.312,0.813-3.566,0.963c1.282-0.757,2.269-1.955,2.729-3.383 c-1.198,0.702-2.527,1.21-3.943,1.481c-1.133-1.188-2.747-1.93-4.532-1.93c-3.431,0-6.212,2.736-6.212,6.114 c0,0.479,0.056,0.946,0.161,1.394C7.11,5.14,2.534,2.707-0.53-0.993C-1.066-0.09-1.372,0.961-1.372,2.082 c0,2.122,1.098,3.992,2.766,5.09C0.373,7.14-0.585,6.865-1.421,6.407c-0.003,0.023-0.003,0.051-0.003,0.074 c0,2.962,2.144,5.436,4.983,5.995c-0.521,0.142-1.069,0.216-1.638,0.216c-0.399,0-0.789-0.036-1.169-0.108 c0.79,2.431,3.084,4.197,5.803,4.247c-2.125,1.641-4.805,2.614-7.715,2.614c-0.501,0-0.994-0.026-1.48-0.085 c2.75,1.734,6.016,2.748,9.521,2.748c11.426,0,17.676-9.315,17.676-17.396c0-0.267-0.009-0.528-0.021-0.79 C25.753,3.06,26.806,1.981,27.638,0.756z"/></svg></a>')
    $('.founding').removeClass('signup')
    $('.founding').addClass('done')
  }
  // success signup
  function signupSuccess(){
    $('.signup-holder .message').html('YOU ARE FUTURE FATHER #' + resp.responseJSON.success.totalUsersCount + '!');
    $('.signup-holder .btn-interested')
        .html(
          '<a href="https://twitter.com/home?status=The%20Father%26Son%20app%20is%20being%20built.%20I%20am%20Future%20Father%20%23'
            + resp.responseJSON.success.totalUsersCount
            + '%20http://futurefather.co" target="_blank"> <svg class="founder-twitter" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30.278px" height="24.221px" viewBox="-2.64 -2.112 30.278 24.221" enable-background="new -2.64 -2.112 30.278 24.221" xml:space="preserve"><path fill="#FEF5B9" d="M27.638,0.756c-1.113,0.487-2.312,0.813-3.566,0.963c1.282-0.757,2.269-1.955,2.729-3.383 c-1.198,0.702-2.527,1.21-3.943,1.481c-1.133-1.188-2.747-1.93-4.532-1.93c-3.431,0-6.212,2.736-6.212,6.114 c0,0.479,0.056,0.946,0.161,1.394C7.11,5.14,2.534,2.707-0.53-0.993C-1.066-0.09-1.372,0.961-1.372,2.082 c0,2.122,1.098,3.992,2.766,5.09C0.373,7.14-0.585,6.865-1.421,6.407c-0.003,0.023-0.003,0.051-0.003,0.074 c0,2.962,2.144,5.436,4.983,5.995c-0.521,0.142-1.069,0.216-1.638,0.216c-0.399,0-0.789-0.036-1.169-0.108 c0.79,2.431,3.084,4.197,5.803,4.247c-2.125,1.641-4.805,2.614-7.715,2.614c-0.501,0-0.994-0.026-1.48-0.085 c2.75,1.734,6.016,2.748,9.521,2.748c11.426,0,17.676-9.315,17.676-17.396c0-0.267-0.009-0.528-0.021-0.79 C25.753,3.06,26.806,1.981,27.638,0.756z"/></svg></a>')
    $('.signup-holder').addClass('done');
  }

	function submitEmail() {
    if (didSubmit) return;
    didSubmit = true;
    $('.btn-interested').unbind('click');
    $('.btn-interested').html('PROCESSING...')
		resp = $
			.ajax({
				type : "POST",
				url : "signup/add",
				data : {
					email : $("#signup-email").val()
				}
			})
			.fail(function() {
				$('.signup-holder input').val('').attr('placeholder','Something went awry. Refresh.')
			})
			.done(function() {
					signupSuccess();
      })
    }
	function scrollHandler() {
    scrollTop = WIN.scrollTop();
    $('.background').css({
      opacity: Math.min(1,.3+(scrollTop/3000))
    })
	}

	 var handler = StripeCheckout.configure({
    key: stripeKey,
    image: '/ui/assest/images/f.jpg',
    token: function(token) {

    	//console.log(token.id + '   ' + token.email);
    $('.become').html('PROCESSING...');
    $('.btn-interested').html('PROCESSING...');
		resp = $
				.ajax({
					type : "POST",
					url : "signup/cash",
					data : {
						token : token.id,
						email : token.email,
						amount : '10000'
					}
				})
        .fail(function() {
          // fail
          $('.number').css({
            display : 'none'
          })
          $('.founding').removeClass('signup')
          $('.founding').addClass('done')
          $('.founding .message').html('SOMETHING WENT AWRY. REFRESH.').css({
            color : '#ff7347'
          });
        })
        .done(function() {
            signupSuccess();
            founderSuccess();
            console.log(resp);
        })
    }
  })

  $('.founding').on('click', function(e) {
    // Open Checkout with further options
    handler.open({
      image: '/imgs/f.jpg',
      name: 'Founding Future Father',
      description: 'Lifetime Subscription and Adoration',
      amount: 10000
    });
    e.preventDefault();
  });

})
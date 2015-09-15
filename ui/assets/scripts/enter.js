$(function() {
	var WIN = $(window);
	var DOC = $(document);
	var resp;
	
	// register
	$('.regsubmit').click(function() {
		tryRegister();
	});
	$('.loginsubmit').click(function() {
		tryLogin();
	});
	$('.resetsubmit').click(function() {
		tryRequestReset();
	});
	
	$('.gotologin').click(function() {
		$('.resetpassword').removeClass('show').addClass('hide');
		$('.login').removeClass('hide').addClass('show');
		$('.register').removeClass('show').addClass('hide');
	});
	$('.gotoregister').click(function() {
		$('.register').removeClass('hide').addClass('show');
		$('.login').removeClass('show').addClass('hide');
	});
	$('.gotoresetpassword').click(function() {
		$('.resetpassword').removeClass('hide').addClass('show');
		$('.register').removeClass('show').addClass('hide');
		$('.login').removeClass('show').addClass('hide');
	});
	
	$('.logoutsubmit').click(function() {
		tryOut();
	});
	
	if (isAuthenticated) {
		userAuthenticated();
	}
	
	function userAuthenticated() {
		resp = $.ajax({
			type : "GET",
			cache: false,
			url : "/api/v1/me",
		}).done(function() {
			var data = resp.responseJSON.success[0];
			var s='';
			for (var key in data) s+= '<div>' + data[key] + '</div>';
			$('.userinfo').replaceWith( s );
		}).fail(function() {
			showResponses(resp.responseJSON.errors);
		});
	}
	
	function tryRequestReset() {
		resp = $.ajax({
			type : "POST",
			cache: false,
			url : "/auth/requestReset",
			data : {
				email : $("#resetemail").val()
			}
		}).done(function() {
			$('.resetpassword').removeClass('show').addClass('hide');
			$('.login').removeClass('hide').addClass('show');
			showResponses(resp.responseJSON.success);
		}).fail(function() {
			showResponses(resp.responseJSON.errors);
		});
	}

	function tryLogin() {
		resp = $.ajax({
			type : "POST",
			cache: false,
			url : "/auth/login",
			data : {
				email : $("#loginemail").val(),
				password : $("#loginpassword").val(),
			}
		}).done(function() {
			$('.login').removeClass('show').addClass('hide');
			$('.authenticated').removeClass('hide').addClass('show');
			showResponses(resp.responseJSON.success);
			userAuthenticated();
		}).fail(function() {
			showResponses(resp.responseJSON.errors);
		});
	}
	
	function tryOut() {
		resp = $.ajax({
			type : "GET",
			cache: false,
			url : "/auth/logout",
		}).done(function() {
			$('.login').removeClass('hide').addClass('show');
			$('.authenticated').removeClass('show').addClass('hide');
			showResponses(resp.responseJSON.success);
		}).fail(function() {
			showResponses(resp.responseJSON.errors);
		});
	}

	function tryRegister() {
		resp = $.ajax({
			type : "POST",
			cache: false,
			url : "/auth/register",
			data : {
				email : $("#regemail").val(),
				password : $("#regpassword").val(),
				password_confirmation : $("#regpassword_confirmation").val()
			}
		}).done(function() {
			$('.login').removeClass('hide').addClass('show');
			$('.register').removeClass('show').addClass('hide');
			showResponses(resp.responseJSON.success);
		}).fail(function() {
			showResponses(resp.responseJSON.errors);
		});
	}
	
	function showResponses(resp) {
		var s = '';
		for (var i=0; i<resp.length; i++) {
			s += resp[i] + ' ';
		}
		alert(s);
	}
	
})
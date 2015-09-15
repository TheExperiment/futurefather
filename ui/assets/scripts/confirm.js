$(function() {
	var WIN = $(window);
	var DOC = $(document);
	var resp;
	
	// register
	$('.confirmsubmit').click(function() {
		tryConfirmSubmit();
	});
	
	function tryConfirmSubmit() {
		resp = $.ajax({
			type : "POST",
			cache: false,
			url : "/auth/doReset",
			data : {
				token : $("#token").val(),
				password : $("#regpassword").val(),
				password_confirmation : $("#regpassword_confirmation").val()
			}
		}).done(function() {
			showResponses(resp.responseJSON.success);
			$('.confirmsubmit').removeClass('show').addClass('hide');
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
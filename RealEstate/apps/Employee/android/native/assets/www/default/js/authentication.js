
/* JavaScript content from js/authentication.js in folder common */

var challangeHandler = WL.Client.createChallengeHandler('LoginRealm');

challangeHandler.isCustomResponse = function(response)
{
	
	if (!response || !response.responseJSON || response.responseText === null) {
		return false;
	}
	if (typeof (response.responseJSON.authRequired) !== 'undefined') {
		return true;
	} else {
		return false;
	}
};

challangeHandler.handleChallenge = function(response)
{
	var authRequired = response.responseJSON.authRequired;
	if (authRequired == true) {
		$('#AuthBody').show();
		$("#AppBody").hide();
		$("#email").empty();
		$("#password").empty();

		if (response.responseJSON.errorMessage)
			WL.Logger.log("Error while logging");

	} else if (authRequired == false) {

		$('#AuthBody').hide();
		$("#AppBody").show();
		challangeHandler.submitSuccess();
	}
};


function submitLoginClick() {
	var email = $("#email").val();
	var password = $("#password").val();
	var invocationData = {
			adapter : "UserAdapter",
			procedure : "submitAuthentication",
			parameters : [ email.toString(), password ]
	};
	challangeHandler.submitAdapterAuthentication(invocationData, {});
}

function success(resp)
{
}

function failure(resp)
{	
}


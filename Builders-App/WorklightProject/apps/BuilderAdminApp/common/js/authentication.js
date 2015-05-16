var adminChallangeHandler = WL.Client.createChallengeHandler('AdminLoginRealm');

adminChallangeHandler.isCustomResponse = function(response)
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

adminChallangeHandler.handleChallenge = function(response)
{
//	alert(JSON.stringify(response.responseJSON));
	var authRequired = response.responseJSON.authRequired;
	if (authRequired == true) {
		$('#AuthBody').show();
		$("#AppBody").hide();
		$("#email").empty();
		$("#password").empty();

		if (response.responseJSON.errorMessage)
			WL.Logger.log("Error while logging1");

	} else if (authRequired == false) {

		$('#AuthBody').hide();
		$("#AppBody").show();
		adminChallangeHandler.submitSuccess();
	}
};


function submitLoginClick() {
	var email = $("#email").val();
	var password = $("#password").val();
	var invocationData = {
			adapter : "AdminUserAdapter",
			procedure : "submitAuthentication",
			parameters : [ email.toString(), password ]
	};
	adminChallangeHandler.submitAdapterAuthentication(invocationData, {});
}

$('#logout').bind('click', function(){
	WL.Client.logout('AdminLoginRealm', {
		onSuccess:WL.Client.reloadApp
		});
	/*var mess = WL.JSONStore.closeAll();
	if(mess){
		alert("jsonStore closed");
	}
	*/
	getSecretData();
});

function success(resp)
{
}

function failure(resp)
{	
}


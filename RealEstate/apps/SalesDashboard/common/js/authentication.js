
var challangeHandler = WL.Client.createChallengeHandler('LoginRealm');

challangeHandler.isCustomResponse = function(response)
{
	//alert('in custom response');
	if (!response || !response.responseJSON || response.responseText === null) {
		//alert('1');
		return false;
	}
	if (typeof (response.responseJSON.authRequired) !== 'undefined') {
		//alert('2');
		return true;
	} else {
		
		//alert('3');
		return false;
	}
};

challangeHandler.handleChallenge = function(response)
{
	var authRequired = response.responseJSON.authRequired;
	if (authRequired == true) {
		//$.mobile.changePage('#loginpage');
		$("#signin").show();
		$("#home").hide();
		$("#projects").hide();
		$("#errormessage").html("");
		$("#email").val("");
		$("#password").val("");

		if (response.responseJSON.errorMessage) {
			WL.Logger.log("Error while logging");
			$("#errormessage").html("Invalid Login Credentials");
		}
			

	} else if (authRequired == false) {
		//$.mobile.changePage('#homepage');
		challangeHandler.submitSuccess();
	}
};


function submitLoginClick() {
	
	var email = $("#email").val();
	var password = $("#password").val();
	var invocationData = {
			adapter : "SQL",
			procedure : "submitAuthentication",
			parameters : [ email.toString(), password ]
	};
	challangeHandler.submitAdapterAuthentication(invocationData, {});
}


function logout() {
	//$.mobile.changePage("#loginpage");
	$("#home").hide();
	$("#signin").show();
	WL.Client.logout("LoginRealm",{onSuccess:WL.Client.reloadApp});
	//WL.Client.logout("LoginRealm",{onSuccess:WL.Client.reloadApp});
}

function success(resp)
{
}

function failure(resp)
{	
}


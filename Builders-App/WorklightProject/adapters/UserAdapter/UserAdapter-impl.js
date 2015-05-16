var verifyUserStatement = WL.Server.createSQLStatement("select * from EMPLOYEE where EMAIL=? and PASSWORD=?;");

function verifyUser(email , password) {
	
	return WL.Server.invokeSQLStatement({
		preparedStatement : verifyUserStatement,
		parameters : [email,password]
	});
}


// undergoes authentication process ... if user enters correct email/password then submitAuthentication() returns authRequired = false and errorMessage null
// or it returns submitAuthentication() returns authRequired = true and errorMessage = "invalid credentials".

function onAuthRequired(headers,errorMessage)
{
	WL.Logger.debug("on auth Required function");
	errorMessage = errorMessage ? errorMessage : null;
	WL.Logger.debug(errorMessage);
	return {
		authRequired : true,
		errorMessage : errorMessage
	};
}

var email1;
var name1;
function submitAuthentication(email, password) {
	
	WL.Logger.debug("Authentication Started...");
	
	var userDetail = verifyUser(email, password);

	 email1 = userDetail.resultSet[0].EMAIL;
	 name1 = userDetail.resultSet[0].NAME;

	if (userDetail.resultSet.length > 0) {

		WL.Logger.info('Authenticated...');

		var userIdentity = {
			userId : email1.toString(),
			displayName : name1
		};

		WL.Server.setActiveUser("LoginRealm", userIdentity);

		WL.Logger.info('Logged in...');

		return {
			authRequired : false,
		};
	}
	return onAuthRequired(null, "* Invalid login credentials");
}

function onLogout() {
	WL.Server.setActiveUser("LoginRealm", null);
	WL.Logger.info('Logged out...');
}


// get the secret data

function getSecretData() {
	return {
		userId : email1,
		displayName : name1
	};
}
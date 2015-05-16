var verifyUserStatement = WL.Server.createSQLStatement("select * from Admin where EMAIL=? and PASSWORD=?;");

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


	WL.Logger.log("on auth Required function___________");
    WL.Logger.info("Waring messageeeeeeeeeeeeeeeeeeeeeeeeeeeee");
	errorMessage = errorMessage ? errorMessage : null;
	WL.Logger.debug(errorMessage);
	return {
		authRequired : true,
		errorMessage : errorMessage
	};
}

var name1;
var id1;

function submitAuthentication(email, password) {
	
	WL.Logger.debug("Authentication Started...");
	
	var userDetail = verifyUser(email, password);

	if (userDetail.resultSet.length > 0) {
		
		
		
		 name1 = userDetail.resultSet[0].NAME;
		 id1 = userDetail.resultSet[0].ID;
		 
		WL.Logger.info('Authenticated...');

		var userIdentity = {
			userId : id1.toString(),
			displayName : name1
		};
		WL.Logger.info(JSON.stringify(userIdentity));
		WL.Server.setActiveUser("AdminLoginRealm", userIdentity);

		WL.Logger.info('Logged in...');

		return {
			authRequired : false,
		};
	}
	return onAuthRequired(null, "* Invalid login credentials");
}

function onLogout() {
	WL.Server.setActiveUser("AdminLoginRealm", null);
	WL.Logger.info('Logged out...');
}


// get the secret data

function getSecretData() {
	return {
		userId : id1.toString(),
		displayName : name1
	};
}

var updateUserStatement = WL.Server.createSQLStatement("UPDATE Admin SET STATUS=? WHERE ID=?");

function loggedOut(status,id)
{
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateUserStatement,
		parameters : [status,id]
	});
}


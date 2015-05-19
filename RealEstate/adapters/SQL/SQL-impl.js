/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

var addStatement = WL.Server.createSQLStatement("insert into Sale_Manager (email,password,name) values (?, ?, ?)");

function addInSaleManager(email,password,name) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : addStatement,
		parameters : [email,password,name]
	});
}


var addStatement1 = WL.Server.createSQLStatement("insert into Refer_Customer (employee_email,customer_email,project_id,time) values (?, ?, ?,?)");

function addInReferCustomer(employee_email,customer_email,project_id) {
	
	var currentdate = new Date();
	return WL.Server.invokeSQLStatement({
		preparedStatement : addStatement1,
		parameters : [employee_email,customer_email,project_id,currentdate]
	});
}

var addStatement2 = WL.Server.createSQLStatement("insert into Projects (city,project,project_image) values (?, ?, ?)");

function addInProjects(city,project,project_image) {
	
	return WL.Server.invokeSQLStatement({
		preparedStatement : addStatement2,
		parameters : [city,project,project_image]
	});
}
var verifyUserStatement = WL.Server.createSQLStatement("select * from Sale_Manager where EMAIL=? and PASSWORD=?;");

function verifyUser(email , password) {
	
	return WL.Server.invokeSQLStatement({
		preparedStatement : verifyUserStatement,
		parameters : [email,password]
	});
}

var referCustomerData = WL.Server.createSQLStatement("select * from Refer_Customer");

function getReferCustomer() {
	
	return WL.Server.invokeSQLStatement({
		preparedStatement : referCustomerData ,
		parameters : []
	});
}

var getProjectData = WL.Server.createSQLStatement("SELECT * FROM Projects where ID = ?");

function getProjectDetails(ID) {
	
	return WL.Server.invokeSQLStatement({
		preparedStatement : getProjectData ,
		parameters : [ID]
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
    /*
	 email1 = userDetail.resultSet[0].EMAIL;
	 name1 = userDetail.resultSet[0].NAME;
    */
	if (userDetail.resultSet.length > 0) {
		email1 = userDetail.resultSet[0].EMAIL;
		 name1 = userDetail.resultSet[0].NAME;

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

//get the secret data

function getSecretData() {
	return {
		userId : email1,
		displayName : name1
	};
}
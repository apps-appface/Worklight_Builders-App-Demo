


/*******************************************************************************
 * Functions that correspond to JSONStore client operations
 * 
 */

var selectStatement = WL.Server.createSQLStatement("select * from Projects Where CITY=?");

function getProjectsAdapters(city) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : selectStatement,
		parameters : [city]
	});
}

var addCustomerStatement = WL.Server.createSQLStatement("insert into Refer_Customer (EMPLOYEE_EMAIL, CUSTOMER_EMAIL, PROJECT_ID, TIME) values (?,?,?,?)");

function addReferCustomerDetails(employeeEmail,customerEmail,projectID,time)
{
	return WL.Server.invokeSQLStatement({
		preparedStatement : addCustomerStatement,
		parameters : [employeeEmail,customerEmail,projectID,time]
	});
}




var addProjectsStatement = WL.Server.createSQLStatement("insert into Projects (CITY, PROJECT, PROJECT_IMAGE) values (?,?,?)");

function addNewProjectsAdapter(city,project,project_image) {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : addProjectsStatement,
		parameters : [city,project,project_image]
	});
}


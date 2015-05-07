
/* JavaScript content from js/main.js in folder common */

var city = null;
var project = null;
var project_id = null;
var projectID_array = [];

function wlCommonInit(){

	getSecretData();

}
function getSecretData() {
	var invocationData = {
			adapter : 'UserAdapter',
			procedure : 'getSecretData',
			parameters : []
	};
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : getUserDetailSuccess,
		onFailure : fail
	});
}
var user_detail;
var user_Id;

function getUserDetailSuccess(result) {
	user_detail = result.invocationResult;
	$("#contentAppBodyDiv").append( " " + user_detail.displayName);
	//getProjects('Bangalore');
}

function fail(result)
{
	alert("Please connect to IBM Worklight Server");	
}

function leaveApplicationClick()
{
	alert("leaveApplicationClick");	
}

function paySlipsClick()
{
	alert("paySlipsClick");	
}

function referCustomerClick()
{
//	alert("referCustomerClick");	
	$.mobile.navigate("#projectsPage");
}

//select city changes projects

$(function() {

	$("#selectCity").change(function(event) {
		city = $(this).val();
		projectID_array.length = 0;
		project_id = null;
		getProjects(city);
	});
});


function getProjects(city){
	var invocationData = {
			adapter : 'ProjectsAdapter',
			procedure : 'getProjectsAdapters',
			parameters : [city]
	};
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : updateProjects,
		onFailure : onFailure
	});
}

function updateProjects(result)
{
	var res = result.invocationResult;
	var selectList = null;
	projectID_array = [];
	for (var x = 0; x < res.resultSet.length; x++) {
		projectID_array[x] = res.resultSet[x].ID;
		selectList += "<tr style='border: 1px solid black; background-color:white; border-radius:10px;' id='"+res.resultSet[x].ID+"'><td><img height='35px' width='35px' src='data:image\/(png|jpg);base64," + res.resultSet[x].PROJECT_IMAGE + "' alt='Project Image'/></td><td style='font-family:Optima-Regular;'>"+res.resultSet[x].PROJECT+"</td></tr>";
	}

	$('#selectProject').html(selectList);
}

$("#selectProject").on('click','tr',function(e) { 
	for(var i = 0; i < projectID_array.length ; i++)
	{
		if(projectID_array[i] == $(this).attr('id'))
		{
			project_id = $(this).attr('id');
			$("#"+projectID_array[i]).css('backgroundColor', 'gray');
		}
		else
		{
			$("#"+projectID_array[i]).css('backgroundColor', 'white');
		}
	}
}); 

function onFailure(result)
{
	alert(JSON.stringify(result));	
}

function sendEmailClick()
{
	if(city == null || validateEmail($("#referEmail").val()) === false || project_id == null)
	{
		alert("Please select project/enter valid email ID");
	}
	else
	{
		saveReferPersonDetailsToDB();
	}
}

//------------Save to refercustomer
function saveReferPersonDetailsToDB()
{
	var employee_email = $("#email").val();
	var refer_email = $("#referEmail").val();
	var time = new Date();
	if(employee_email == null || refer_email == null || city == null)
	{
		alert("please enter refer email");
	}
	else
	{
		var invocationData = {
				adapter : 'ProjectsAdapter',
				procedure : 'addReferCustomerDetails',
				parameters : [employee_email,refer_email,project_id,time]
		};
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : successOfAddingData_toReferCustomer,
			onFailure : failureOfAddingData_toReferCustomer
		});
	}

}

function successOfAddingData_toReferCustomer(res)
{
	alert("successfully stored");
	var invocationData = {
			adapter : 'PushAdapter',
			procedure : 'submitNotification',
			parameters : ['4','Some one reffered to ' + $("#referEmail").val()]
	};
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : successOfSendingPush,
		onFailure : failureOfSendingPush
	});
	location.href = "mailto:"+ $("#referEmail").val() +"?subject=Referring the Project&body="+ city + project;
}

function successOfSendingPush()
{
alert("push success");	
}
function failureOfSendingPush()
{
alert("failure sending push");	
}


function failureOfAddingData_toReferCustomer(res)
{

}

$("#backLink").click(function(event) {
    event.preventDefault();
    history.back(1);
});


function validateEmail(sEmail) {
	var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
	if (filter.test(sEmail)) {
	return true;
	}
	else {
	return false;
	}
}

/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}
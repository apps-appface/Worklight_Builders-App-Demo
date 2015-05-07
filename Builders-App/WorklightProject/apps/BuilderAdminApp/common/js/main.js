 collectionName = 'Admin';
 collections = {};

function wlCommonInit(){
	getSecretData();
	collections[collectionName] = {};
	collections[collectionName].searchFields = {adminId: 'string', date: 'string'};
	WL.JSONStore.init(collections, {onSuccess : jsonStoresuccess , onFailure : jsonStorefailure});
	//alert(WL.Client.Push.isPushSupported() + '');
}
function getSecretData() {
	var invocationData = {
		adapter : 'AdminUserAdapter',
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
	setLastLoginTime(user_detail.userId);
	doSubscribe();
	subscribeSMSButtonClicked();
	var invocationData = {
			adapter : 'AdminUserAdapter',
			procedure : 'loggedOut',
			parameters : ['Active',user_detail.userId]
		};
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : loginSuccess,
			onFailure : loginfailure
		});
}



function loginSuccess()
{
	//alert("status set to active");
}
function loginfailure()
{
	//alert("failed to set status to active");
}



function fail(result)
{
alert("Please connect to IBM Worklight Server");	
}

function loggedOut()
{
	WL.Client.logout('AdminLoginRealm', {onSuccess:WL.Client.reloadApp});
	var invocationData = {
			adapter : 'AdminUserAdapter',
			procedure : 'loggedOut',
			parameters : ['InActive','4']
		};
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : logoutSuccess,
			onFailure : logoutfailure
		});
}
function logoutSuccess()
{
	WL.Client.logout('AdminLoginRealm', {onSuccess:WL.Client.reloadApp});
}

function logoutfailure()
{
	alert("Logged out failure !!!!");
}



function subscribeSMSButtonClicked() {
	if (typeof(WL.Client.Push) == 'undefined'){
		//alert("SMS notifications are not supported on current platform");
		return;
	}
		
	var phoneNumber = '9738510069';
//	var isNumberValid = validatePhoneNumber(phoneNumber); 
//	
//	if (!isNumberValid){
//		alert("Phone number invalid");
//		return;
//	}

	WL.Client.Push.subscribeSMS("myPushSMS", "SMSAdapter", "SMSEventSource", phoneNumber, {
		onSuccess: onSubscribeSMSSuccess,
		onFailure: onSubscribeSMSFailure
	});
}

function onSubscribeSMSSuccess(response) {
	//alert("Succesfully Subscribed to SMS");
}

function onSubscribeSMSFailure(response) {
	//alert("Failed to Subscribe to SMS");
}



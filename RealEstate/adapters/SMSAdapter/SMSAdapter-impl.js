WL.Server.createEventSource({
	name: 'SMSEventSource',
	onDeviceSubscribe: 'onDeviceSubscribeCallback',
	onDeviceUnsubscribe: 'onDeviceUnsubscribeCallback',
	securityTest:'SMSRealm-mobile-securityTest'
});

function onDeviceSubscribeCallback(userSubscription, deviceSubscription){
	WL.Logger.debug(">> onDeviceSubscribeCallback");
	WL.Logger.debug(userSubscription);
	WL.Logger.debug(deviceSubscription);
}

function onDeviceUnsubscribeCallback(userSubscription, deviceSubscription){
	WL.Logger.debug(">> onDeviceUnsubscribeCallback");
	WL.Logger.debug(userSubscription);
	WL.Logger.debug(deviceSubscription);
}


function sendSMS(userId, smsText){
	var userSubscription = WL.Server.getUserNotificationSubscription('SMSAdapter.SMSEventSource', userId);
	
	if (userSubscription==null){
		return { result: "No subscription found for user :: " + userId };
	}
	
	var badgeDigit = 1;
	
	var notification = WL.Server.createDefaultNotification(smsText, badgeDigit, {});
	
	WL.Logger.debug("sendSMS >> userId :: " + userId + ", text :: " + smsText);
	
	WL.Server.notifyAllDevices(userSubscription, notification);
	
	return { 
		result: "Notification sent to user :: " + userId 
	};
}
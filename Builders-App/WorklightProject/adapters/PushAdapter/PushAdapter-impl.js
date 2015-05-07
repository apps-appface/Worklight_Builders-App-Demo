WL.Server.createEventSource({
	name: 'PushEventSource',
	onDeviceSubscribe: 'deviceSubscribeFunc',
	onDeviceUnsubscribe: 'deviceUnsubscribeFunc',
	securityTest:'PushApplication-strong-mobile-securityTest'
});

function deviceSubscribeFunc(userSubscription, deviceSubscription){
	WL.Logger.debug(">> deviceSubscribeFunc");
	WL.Logger.debug(userSubscription);
	WL.Logger.debug(deviceSubscription);
}

function deviceUnsubscribeFunc(userSubscription, deviceSubscription){
	WL.Logger.debug(">> deviceUnsubscribeFunc");
	WL.Logger.debug(userSubscription);
	WL.Logger.debug(deviceSubscription);
}

function submitNotification(userId, notificationText){
	var userSubscription = WL.Server.getUserNotificationSubscription('PushAdapter.PushEventSource', userId);
	
	if (userSubscription==null){
		return { result: "No subscription found for user :: " + userId };
	}

	var badgeDigit = 1;
	
	var notification = WL.Server.createDefaultNotification(notificationText, badgeDigit, {custom:"data"});
	
	WL.Logger.debug("submitNotification >> userId :: " + userId + ", text :: " + notificationText);
	
	WL.Server.notifyAllDevices(userSubscription, notification);
	
	return { 
		result: "Notification sent to user :: " + userId 
	};
}
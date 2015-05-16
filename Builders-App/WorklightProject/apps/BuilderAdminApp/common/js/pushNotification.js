
//---------------------------- Set up push notifications -------------------------------
if (WL.Client.Push){
	
	WL.Client.Push.onReadyToSubscribe = function(){
		//alert("onReadyToSubscribe");

		WL.Client.Push.registerEventSourceCallback(
				"myPush", 
				"PushAdapter", 
				"PushEventSource", 
				pushNotificationReceived);
	};
	
}

// --------------------------------- Subscribe ------------------------------------
function doSubscribe(){
//alert("subscribe started");
	WL.Client.Push.subscribe("myPush", {
		onSuccess: doSubscribeSuccess,
		onFailure: doSubscribeFailure
	});
}

function doSubscribeSuccess(){
	//alert("doSubscribeSuccess");
}

function doSubscribeFailure(){
	//alert("doSubscribeFailure");
}

//------------------------------- Unsubscribe ---------------------------------------
function doUnsubscribe(){
	WL.Client.Push.unsubscribe("myPush", {
		onSuccess: doUnsubscribeSuccess,
		onFailure: doUnsubscribeFailure
	});
}

function doUnsubscribeSuccess(){
	//alert("doUnsubscribeSuccess");
}

function doUnsubscribeFailure(){
	//alert("doUnsubscribeFailure");
}

//------------------------------- Handle received notification ---------------------------------------
function pushNotificationReceived(props, payload){
	alert("pushNotificationReceived invoked");
	alert("props :: " + JSON.stringify(props));
	alert("payload :: " + JSON.stringify(payload));
}
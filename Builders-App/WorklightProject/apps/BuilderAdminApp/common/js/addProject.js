var city = null;
var imageBase64 = null;

function tableCellClick(element)
{
	doSubscribe();
	var invocationData = {			
			adapter : 'PushAdapter',
			procedure : 'submitNotification',
			parameters : ['4',"My First push notification hurrayyyyy"]
	};
	
	WL.Client.invokeProcedure(invocationData,{onSuccess : onPushSuccess,onFailure : onPushFailure });
	
	city = $(element).attr("id");
	$.mobile.navigate("#addPrjoectsPage");
}

function onPushSuccess() {
	//alert("push Success");
}

function onPushFailure() { 
	//alert("push Failure");
}


function chooseImageButtonClick()
{
	navigator.camera.getPicture(onSuccess, onFail, { 
		quality: 50,
		sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
		//sourceType:Camera.PictureSourceType.CAMERA, 
		destinationType: Camera.DestinationType.FILE_URI
	});
}



function onFail(message) {
	alert('Failed because: ' + message);
}	

function addProjectSubmitbuttonClick()
{

	var invocationData = {			
			adapter : 'ProjectsAdapter',
			procedure : 'addNewProjectsAdapter',
			parameters : [city,$("#projectNameId").val(),imageBase64]
	};
	
	WL.Client.invokeProcedure(invocationData,{onSuccess : onSuccessAddingNewProject,onFailure : onFailureAddingNewProject });

}


function onSuccessAddingNewProject(result)
{
	alert("success");
}

function onFailureAddingNewProject(result)
{
	alert("failure");
}

function onSuccess(imageData) {
	var smallImage = document.getElementById('ImgPlaceholder'); 
	smallImage.style.display = 'block';
	smallImage.width = 330;
	smallImage.height = 300;
	smallImage.src = imageData;
	smallImage.onload = function(){
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		ctx.drawImage(this, 0, 0 , 330,300);
		var dataURL = canvas.toDataURL("image/png",1.0);
		imageBase64 = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	};	
}

function goBack()
{
	 event.preventDefault();
	    history.back(1);	
}

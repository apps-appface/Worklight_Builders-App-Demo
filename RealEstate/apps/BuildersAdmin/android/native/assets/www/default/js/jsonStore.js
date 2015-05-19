
/* JavaScript content from js/jsonStore.js in folder common */


function setLastLoginTime(id)
{   
	
	var query = {adminId:id};
	var options = {
			exact: false,
			limit: 1 
			};
	WL.JSONStore.get(collectionName).find(query, options)
	.then(function (arrayResults) {
		if(arrayResults.length == 0)
			{
			add(id);
			}
		else
			{
			$("#contentAppBodyDiv").append("<br>Last Login :" + arrayResults[0].json.date);
			replace(arrayResults[0]._id,arrayResults[0].json.adminId);
			}
	})
	.fail(function (errorObject) {
		alert(JSON.stringify(errorObject));
	});
}

function jsonStoresuccess(message)
{
	//alert(message + "jsonstore initialized success");	
}

function jsonStorefailure(message)
{
	//alert(message + "jsonstore initialized failure");	
}



function replace(id,adminID)
{
	var date1 = new Date();
    var dateString = date1.toLocaleString();
    
	var document = {_id: id, json: 
						{
						adminId:adminID,
						date: dateString
						}
	};
		var options = {};
		WL.JSONStore.get(collectionName)
		.replace(document, options)
		.then(function () {
		    
		})
		.fail(function (errorObject) {
		    
		});
}

function add(id)
{
	var date1 = new Date();
    var dateString = date1.toLocaleString();
    $("#contentAppBodyDiv").append("<br>Last Login :" + dateString);
	var data = {adminId:id , date: dateString};

	var options = {};
	WL.JSONStore.get(collectionName)
	.add(data, options)
	.then(function () {
	  alert("success storage");
	})
	.fail(function (errorObject) {
	  
	});
}


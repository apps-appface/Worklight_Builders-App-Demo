/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 *  WL.Server.invokeCastIron(parameters) accepts the following json object as an argument:
 *  
 *  {
 *  	// Mandatory 
 *  	method : 'get' or 'post', 
 *  	path: value,
 *  	appName: value,
 *  
 *  	// Optional 
 *      requestType: 'http',
 *  	returnedContentType: any known mime-type or one of "json", "css", "csv", "javascript", "plain", "xml", "html"  
 *  	returnedContentEncoding : 'encoding', 
 *  	parameters: {name1: value1, ... }, 
 *  	headers: {name1: value1, ... }, 
 *  	cookies: {name1: value1, ... }, 
 *  	body: { 
 *  		contentType: 'text/xml; charset=utf-8' or similar value, 
 *  		content: stringValue 
 *  	}, 
 *  	transformation: { 
 *  		type: 'default', or 'xslFile', 
 *  		xslFile: fileName 
 *  	} 
 *  } 
 */

function startOrchestration(orchestrationName){
	
	var input = {
			method  : 'get',
			appName : 'myApp',
			requestType: 'http',
			path : orchestrationName,			
			returnedContentType : 'xml'
			
	};
	return WL.Server.invokeCastIron(input);
}

function getCastIrons() {
	
	
	var input = {
			method  : 'get',
			appName : 'myApp',
			requestType: 'http',
			path : 'userInputRequired',			
			returnedContentType : 'xml'
			
	};
	return WL.Server.invokeCastIron(input);
	
}

function addCastIron(param1) {
	
	
	var input = {
			method  : 'get',
			appName : 'myApp',
			requestType: 'http',
			path : 'userInputRequired',			
			returnedContentType : 'xml'
			
	};
	return WL.Server.invokeCastIron(input);
}


function updateCastIron(param1) {
	
	
	var input = {
			method  : 'get',
			appName : 'myApp',
			requestType: 'http',
			path : 'userInputRequired',			
			returnedContentType : 'xml'
			
	};
	return WL.Server.invokeCastIron(input);
}


function deleteCastIron(param1) {
	
	var input = {
			method  : 'get',
			appName : 'myApp',
			requestType: 'http',
			path : 'userInputRequired',			
			returnedContentType : 'xml'
			
	};
	return WL.Server.invokeCastIron(input);

}
var city = null;
var project = null;

function wlCommonInit(){
	//$("home").hide();
	getSecretData();
	

}

function getSecretData() {
	var invocationData = {
		adapter : 'SQL',
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
	getReferCustomer();
	
}



function fail(result) {
    alert("Please connect to IBM Worklight Server");	
}

function getReferCustomer() {
	
	var invocationData = {
			adapter : 'SQL',
			procedure : 'getReferCustomer',
			parameters : []
		};
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : getReferCustomerSuccess,
			onFailure : fail
		});
}

var cumtomer_detail;

function getReferCustomerSuccess(result) {
	    customer_detail = result.invocationResult;
		$("#signin").hide();
	    $("#projects").hide();
	    $("#tableresult").html("<tr> <th  >S.No</th> <th >Employee Email</th> <th>Time</th> </tr>");
		for(var i= 0;i<customer_detail.resultSet.length;i++){
		    //$("#tableresult").append("<tr id=rows> <td> <a href=Projects.html> </a> "+ + customer_detail.resultSet[i].ID + "</a></td><td>"+ customer_detail.resultSet[i].EMPLOYEE_EMAIL + "</td><td>"+ customer_detail.resultSet[i].TIME + "</td></tr>");
			$("#tableresult").append("<tr class='rows' id="+customer_detail.resultSet[i].PROJECT_ID +"> <td> <a href=Projects.html> </a> "+ + customer_detail.resultSet[i].ID + "</a></td><td>"+ customer_detail.resultSet[i].EMPLOYEE_EMAIL + "</td><td>"+ customer_detail.resultSet[i].TIME + "</td></tr>");
		}
		$("tr").not(':first').hover(
				  function () {
				    $(this).css("background","#a5e1e6");
				  }, 
				  function () {
				    $(this).css("background","");
				  }
				);
		  $("tr.rows").click(function(){
			    var id = $(this).attr("id");
		    	$.mobile.changePage("#projects_page");
		    	getProjectDetails(id);
		    });
         $("#home").show();
}

function getProjectDetails(ID){
	var invocationData = {
			adapter : 'SQL',
			procedure : 'getProjectDetails',
			parameters : [ID]
		};
		WL.Client.invokeProcedure(invocationData, {
			onSuccess : getProjectSuccess,
			onFailure : fail
		});
}
var details;

function getProjectSuccess(result){
	project_detail = result.invocationResult;
	$("#project_image").html("");
	var imgSrc = project_detail.resultSet[0].PROJECT_IMAGE;
	details = imgSrc;
	var $img = $("<img style=height:250px;width:250px />");
    $img.attr("src", "data:image/jpg;base64," + imgSrc);
    $("#project_image").append($img);
    $("#project_details").html("");
    var p1 = $('<p class="project" />').text("Project Name:"+ project_detail.resultSet[0].PROJECT);
	$("#project_details").append(p1);
	var p2 = $('<p class="project" />').text("Project City:"+ project_detail.resultSet[0].CITY);
	$("#project_details").append(p2);
	//var doc = new jsPDF();
	//var imgData = 'data:image/jpeg;base64,'+imgSrc;
    /*var specialElementHandlers = {
		    '#footer': function (element, renderer) {
		        return true;
		    }
		};*/
    //
	getPdf(imgSrc);
    
		
}
//
function getPdf(imgSrc) {
$('#cmd').click(function () {
	
	var doc = new jsPDF();
	var specialElementHandlers = {
		    '#footer': function (element, renderer) {
		        return true;
		    }
		};
    doc.fromHTML($('#projects1').html(), 10, 10, {
        'width': 500
         ,'elementHandlers': specialElementHandlers
    });
    //var imgData = 'data:image/jpeg;base64,'+imgSrc;
    var imgData = 'data:image/jpeg;base64,'+details;
    //alert(imgData);
    doc.addImage(imgData, 'JPEG', 15, 40, 100, 100);
	//doc.setFontSize(40);	    
    doc.save('sample-file.pdf');
});
}


	


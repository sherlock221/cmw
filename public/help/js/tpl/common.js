var goBack = function(){
	window.history.go(-1);
}

var SERVER = {
	url : "http://172.16.130.205:8083"
};

$.postJSON = function(url,data,callback) {
	return jQuery.ajax({
		'type': 'POST',
		'url': url,
		'contentType': 'application/json',
		'data': JSON.stringify(data),
		'dataType': 'json',
		'success':callback
	})
};

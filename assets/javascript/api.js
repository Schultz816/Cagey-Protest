var api = "http://tracking.musixmatch.com/t1.0/AMa6hJCIEzn1v8RuOP";
var apiKey = "c264a57f4728edc0fbaa639c12dc949b";
var query = 

function lyrics()  {
	var url = api + apiKey + query;
	loadJSON(url, gotData);
}

function gotData(data)  {
	
}
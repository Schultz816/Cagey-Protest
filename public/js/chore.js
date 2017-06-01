var chore = ["Mow Lawn", "Wash Dishes", "Clean Room", "Laundry", "Vaccum", "Walk the Dog", "Clean Bathroom", "Water Plants"];
function firstMethod(){
	for (var i = 0; i < chore.length; i++) {
		/*var choreBtn = $("<button>");
		choreBtn.addClass("btn btn-primary btn-lg btn-block");
		choreBtn.attr("data-chore", chore[i]);
		choreBtn.text(chore[i]);
		$("#buttons").append(choreBtn);*/
		//alert(chore[i]);
		var $input = $('<input type="button" class="btn btn-primary btn-lg btn-block"  onclick="call(this)" value="'+chore[i]+' +100" />');
		$input.appendTo($("#column1"));
	}
	
}

function call(name){
	//alert("added");
	var $input = $('<input type="button" class="btn btn-primary btn-lg btn-block"  value="'+name.value+'" />');
    $input.appendTo($("#column2"));
}

function createInput(){
		var buttonName = document.getElementById("inlineFormInput").value;
		var pointValue = document.getElementById("inlineFormInput1").value;
		//alert("inside createInput"+pointValue+" name :"+buttonName);
		chore.push(buttonName);
		buttonName = buttonName+"&emsp;+";
		var $input = $('<input type="button" class="btn btn-primary btn-lg btn-block" onclick="call(this)"  value="'+buttonName+pointValue+'" />');
        $input.appendTo($("#column1"));
		
}
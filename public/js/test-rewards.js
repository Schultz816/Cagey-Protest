$(document).ready(function () {

// Getting references to the name input and reward container, as well as the table body
	var $rewardInput = $("#reward-name");
	var $rewardList = $("tbody");
	var $rewardContainer = $("#reward-container");

// Adding event listeners to the form to create a new object, and the button to delete a reward
	$(document).on("submit", "#reward-form", handleRewardFormSubmit);


// A function to handle what happens when the form is submitted to create a new Reward
	function handleRewardFormSubmit(event) {
		alert("RewardSubmit working!");
	}


// Function for creating a new list row for rewards
	function createRewardRow(rewardData) {
		var newTr = $("<tr>");
		newTr.data("reward", rewardData);
		newTr.append("<td>" + rewardData.name + "</td>");
		// newTr.append("<td>" + rewardData.description + "</td>");
		newTr.append("<td>" + rewardData.pointsWorth + "</td>");
		newTr.append("<td><a class='redeem-points'>Redeem</a></td>");
		newTr.append("<td><a style ='cursor:pointer;color:red' class='delete-reward'>Delete Reward</a></td>");
		return newTr;
	}

}) // end document.ready
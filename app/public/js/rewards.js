$(document).ready(function () {
  // Getting references to the name input and reward container, as well as the table body
	var $rewardInput = $("#reward-name");
	var $rewardList = $("tbody");
	var $rewardContainer = $("#reward-container");

	// Adding event listeners to the form to create a new object, and the button to delete a reward
	$(document).on("submit", "#reward-form", handleRewardFormSubmit);
	$(document).on("click", ".delete-reward", handleDeleteButtonPress);

	// Getting the initial list of Rewards
	getRewards();

	// A function to handle what happens when the form is submitted to create a new Reward
	function handleRewardFormSubmit(event) {
		alert("RewardSubmit working!");
		event.preventDefault();
		// Don't do anything if the reward fields haven't been filled out
		if (!$rewardInput.val().trim().trim()) {
			return;
			alert("d'oh! You didn't complete the fields. Try again");
		}
			// Calling the upsertReward function and passing in the value of the $rewardInput
			upsertReward({
				name: $rewardInput.val().trim()
			});
	}

	// A function for creating a reward. Calls getRewards upon completion
	function upsertReward(rewardData) {
		$.post("/api/rewards", rewardData).then(getRewards);
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

	// Function for retrieving rewards and getting them to be rendered to the page
	function getRewards() {
		$.get("/api/rewards", function(data) {
			var rowsToAdd = [];
			for (var i = 0; i < data.length; i++) {
				rowsToAdd.push(createRewardRow(data[i]));
			}
			renderRewardList(rowsToAdd);
			$rewardInput.val("");
		});
	}

// A function for rendering the list of rewards to the page
function renderRewardList(rows) {
	$rewardList.children().not(":last").remove();
	$rewardContainer.children(".alert").remove();
	if (rows.length) {
		console.log(rows);
		$rewardList.prepend(rows);
	}
	else {
		renderEmpty();
	}
}

// Function for handling what to render when there are no rewards
function renderEmpty() {
	var alertDiv = $("<div>");
	alertDiv.addClass("alert alert-danger");
	alertDiv.html("You must create a Reward to redeem points");
	$rewardContainer.append(alertDiv);
}

// Function for handling what happens when the delete button is pressed
function handleDeleteButtonPress() {
	var listRewardData = $(this).parent("td").parent("tr").data("reward");
	var id = listRewardData.id;
	$.ajax({
		method: "DELETE",
		url: "/api/rewards/" + id
	})
	.done(getRewards)
}

}); // end document.ready
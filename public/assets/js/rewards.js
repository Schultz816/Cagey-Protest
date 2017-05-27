$(document).ready(function () {
  // Getting references to the name input and author container, as well as the table body
	var $rewardInput = $("#reward-name");
	var $rewardList = $("tbody");
	var $rewardContainer = ("#reward-container");

	// Adding event listeners to the form to create a new object, and the button to delete a reward
	$(document).on("submit", "#reward-form", handleRewardFormSubmit);
	// $(document).on("click", ".delete-reward", handleDeleteButtonPress);

	// Getting the initial list of Rewards
	// getRewards();

	// A function to handle what happens when the form is submitted to create a new Reward
	function handleRewardFormSubmit(event) {
		alert("working too!");
		event.preventDefault();
		// Don't do anything if the reward fields haven't been filled out
		if (!$rewardInput.val().trim().trim()) {
			return;
			alert("dude, you didn't complete the fields. Try again");
		} else {
			// Calling the upsertReward function and passing in the value of the $rewardInput
			upsertReward({
				name: $rewardInput.val().trim()
			});
		};

		// A function for creating a reward. Calls getRewards upon completion
		function upsertReward(rewardData) {

		};



	};

$(".btn").on("click", function(){
	alert("maybe working?");
});








}); // end document.ready
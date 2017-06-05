

$(document).ready(function () {

	// Getting references to the name input and reward container, as well as the table body
	var $rewardInput = $("#reward-name");
	var $rewardList = $("#tbody-top");
	var rewardContainer = $(".reward-container");
  let $pointsInput = $("#points");
	//var $pointsWorth = $("#pointsworth");
	var $totalPoints = $("#total-points");

	// Adding event listeners to the form to create a new object, and the button to delete a reward
	$(document).on("submit", "#reward-form", handleRewardFormSubmit);
	$(document).on("click", ".delete-reward", handleDeleteButtonPress);
	$(document).on("click", ".redeem-reward", handleRedeemButtonPress);

  const parentId = 1;

  function getChildId(cb) {

    // eventually will need function call here to set pId
    let pId = parentId;
    //console.log("pId: " + pId);
    //let pId = null;

    if (typeof pId !== "object") {
      $.get(`/api/child/${pId}`)
        .then(function (user) {
          //user = user[0];
          console.log(
            "childId: " + user.id +
            " name: " + user.firstname);
          cb(user.id);
        });
    }
    // $.get(`/api/child/${parentId}`, function(user) {
    //   console.log(
    //     "In chore.js - childId: " + JSON.stringify(user) +
    //     " name: " + user[0].firstname);
    //
    //   // cb(childId);
    // });
  }


	// Getting the initial list of Rewards & Points
	getChildId(getRewards);
	getChildId(showTotalPoints);


	// A function to handle what happens when the form is submitted to create a new Reward
	function handleRewardFormSubmit(event) {
		event.preventDefault();

		// Don't do anything if the reward fields haven't been filled out
		if (!$rewardInput.val().trim().trim() || !$pointsInput.val().trim().trim()) {
			return;
		}

		getChildId(upsertReward);
		 //console.log("rewardinput " + JSON.stringify($pointsWorth));
			// Calling the upsertReward function and passing in the value of the $rewardInput
			// upsertReward({
			// 	name: $rewardInput.val().trim(),
			// 	// pointsworth: $pointsWorth.val().trim()
			// });
	}


	// A function for creating a reward. Calls getRewards upon completion
	function upsertReward(childId) {

    let rewardData = {
      name: $rewardInput.val().trim(),
      redeemAmount: $pointsInput.val().trim()
    }

		$.post("/api/rewards/" + childId, rewardData)
			.then(getChildId(getRewards));
	}


	// Function for creating a new list row for rewards
	function createRewardRow(rewardData) {
		var newTr = $("<tr>");
		newTr.data("reward", rewardData);
		newTr.append("<td>" + rewardData.name + "</td>");
		// newTr.append("<td>" + rewardData.description + "</td>");
		newTr.append("<td>" + rewardData.redeemAmount + "</td>");
		// newTr.append("<td><a class='redeem-points'>Redeem</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:blue' class='redeem-reward'>Redeem</a></td>");
		newTr.append("<td><a style ='cursor:pointer;color:red' class='delete-reward'>Delete</a></td>");
		return newTr;
	}


	// Function for retrieving rewards and getting them to be rendered to the page
	function getRewards(userId) {
		console.log("in getRew top");

    $.get("/api/rewards/" + userId, function (user) {

    	console.log("in getRewards, user: "
				+ JSON.stringify(user,null,1));

      if (user !== null) {
        var rowsToAdd = [];

        for (var i = 0; i < user.length; i++) {
          rowsToAdd.push(createRewardRow(user[i]));
        }
        renderRewardList(rowsToAdd);
      } else {
        $rewardList.children().remove();
        renderEmpty();
      }
      $rewardInput.val("");
      $pointsInput.val("");
    });
  }


// A function for rendering the list of rewards to the page
function renderRewardList(rows) {
	$rewardList.children().not(":last").remove();
	rewardContainer.children(".alert").remove();
  $rewardList.children().remove();

	if (rows.length) {
		console.log(rows);
		$rewardList.prepend(rows);
	}
	// else {
   //  $rewardList.children().remove();
	// 	renderEmpty();
	// }
}


// Function for handling what to render when there are no rewards
function renderEmpty() {
	var alertDiv = $("<div>");
	alertDiv.addClass("alert alert-danger");
	alertDiv.html("You must create a Reward to redeem points");
	rewardContainer.append(alertDiv);
}


// Function for handling what happens when the delete button is pressed
function handleDeleteButtonPress() {
	var listRewardData = $(this).parent("td").parent("tr").data("reward");
	var id = listRewardData.id;

	$.ajax({
		method: "DELETE",
		url: "/api/rewards/" + id
	})
	.done(
		getChildId(getRewards)
	);
}


function showTotalPoints(childId){
  $.get(`/api/user/${childId}`)
    .then(function (user) {
			console.log("user in REWARD sPts: "
			+ JSON.stringify(user,null,1));
			$totalPoints.html(`YOU HAVE ${user.pointsEarned} POINTS!`);
    });
}

  // Function for handling what happens when the complete button is pressed
  function handleRedeemButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("reward");
    var id = listItemData.id;

    $.ajax({
      method: "PUT",
      url: "/api/rewards/" + id
    })
      .done(
        // console.log("back in chore.js del.done()")
        getChildId(showTotalPoints)
				//getChildId(getRewards)
      );

    $.ajax({
      method: "DELETE",
      url: "/api/rewards/" + id
    })
      .done(
        getChildId(getRewards)
      );
  }

}); // end document.ready
$(document).ready(function() {
// The code in add.js handles what happens when the user clicks the "Add a book" button.

var $usernameInput = $("#username");
var $emailInput = $("#email");
var $passwordInput = $("#password")

    // When user clicks add-btn
    $("#sign-up").on("click", function signUpSubmit(event) {

        event.preventDefault();

        // Wont submit the post if we are missing a username or a email
        if (!$usernameInput.val().trim() || !$emailInput.val().trim() || !$passwordInput.val().trim()){
            return;
        }


        // Make a newBook object
        var newUser = {
            username: $usernameInput.val().trim(),
            email: $emailInput.val().trim(),
            password: $passwordInput.val().trim()
        };



        console.log(newUser)

        if (localStorage.getItem("username")) {
            console.log("it's here")
        } else (
            console.log("not here yet")
        );

        localStorage.setItem("username", newUser.username);
        // Send an AJAX POST-request with jQuery
        $.post("/api/users", newUser)
        // On success, run the following code
            .done(function (data) {
                // Log the data we found
                console.log(data);
                window.location.href = "/api/testHome"
            });

        // Empty each input box by replacing the value with an empty string
        $("#username").val("");
        $("#email").val("");


    });

});
$(document).ready(function() {

  // Getting references to the name inout and author container, as well as the table body
  var nameInput = $("#chore-name");
  let pointsInput = $("#points");
  // var authorList = $("tbody");
  var authorList = $("#tbody-top");
  var authorContainer = $(".author-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#chore-form", handleAuthorFormSubmit);
  $(document).on("click", ".delete-chore", handleDeleteButtonPress);
  $(document).on("click", ".complete-chore", handleCompleteButtonPress);


  /**
   * Temp hard coded user id until I can get from client storage.
   *
   */
  // this is a parent's ID to look in chore table for all the chores that belong to
  // the child
  const parentId = 1; // Pam's User ID
  // let CUID; // Susie's ID
  //console.log(" * * **********in chore.js * * **********");

  // Have to uses Pam's ID to find Susie's ID
  // so have to users.findall where parentID = 1
  // since this is async will probably want to do this right away and store it as part of
  // Pam's cookie info - ie, store her id and her childs

  // this is a function getChildId that will have a callback for whatever function will need
  //  a child's ID will use api/route
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


  getChildId(getChores);
  // Getting the initial list of Authors
  //getChores(); //call by getChildId


  // A function to handle what happens when the form is submitted to create a new Author
  function handleAuthorFormSubmit(event) {
    event.preventDefault();

    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim() || !nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    getChildId(upsertAuthor)

    // upsertAuthor({
    //   name: nameInput.val().trim(),
    //   pointsWorth: pointsInput.val().trim()
    // });
  }


  // A function for creating an author. Calls getChores upon completion
  //function upsertAuthor(authorData, childId) {
  function upsertAuthor(childId) {

    let authorData = {
      name: nameInput.val().trim(),
      pointsWorth: pointsInput.val().trim()
    }

    $.post("/api/chores/" + childId, authorData)
      .then(getChildId(getChores));
  }

  // Function for creating a new list row for authors
  function createAuthorRow(authorData) {
    var newTr = $("<tr>");
    newTr.data("author", authorData);
    newTr.append("<td>" + authorData.name + "</td>");
    newTr.append("<td>" + authorData.pointsWorth + "</td>");
    newTr.append("<td>" + convertYN(authorData.completed) + "</td>");
    // newTr.append("<td><a href='/cms?author_id=" + authorData.id + "'>Create a Post</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:blue' class='complete-chore'>Complete Chore</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-chore'>Delete Chore</a></td>");
    return newTr;
  }

  function convertYN(completed){
    if (completed) {
      return "Yes";
    }
    return "No";
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getChores(childId) {
    console.log("in getCh: CID: " + childId);

    $.get(`/api/Chores/${childId}`, function (chores) {
      if(chores !== null) {
        console.log(
          "in getCh get /, chores= " +
          JSON.stringify(chores, null, 1));

        var rowsToAdd = [];

        for (var i = 0; i < chores.length; i++) {
          rowsToAdd.push(createAuthorRow(chores[i]));
        }

        renderAuthorList(rowsToAdd);
      } else {
        authorList.children().remove();
        renderEmpty();
      }
      nameInput.val("");
      pointsInput.val("");
    });
  }

  // A function for rendering the list of authors to the page
  function renderAuthorList(rows) {
    authorList.children().not(":last").remove();
    authorContainer.children(".alert").remove();
    authorList.children().remove();

    if (rows.length) {
      //console.log(JSON.stringify(rows, null, 1));
      authorList.prepend(rows);
    }
    else {
      //renderEmpty();
    }
  }

  // Function for handling what to render when there are no authors
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.html("You have no chores.");
    authorContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("author");
    var id = listItemData.id;

    $.ajax({
      method: "DELETE",
      url: "/api/chores/" + id
    })
      .done(
        // console.log("back in chore.js del.done()")
        getChildId(getChores)
      );
  }

  // Function for handling what happens when the complete button is pressed
  function handleCompleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("author");
    var id = listItemData.id;

    $.ajax({
      method: "PUT",
      url: "/api/chores/" + id
    })
      .done(
        // console.log("back in chore.js del.done()")
        getChildId(getChores)
      );
  }

});

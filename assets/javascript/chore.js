var topics = ["Wash Dishes", "Clean Room", "Laundry", "Vaccum", "Walk the Dog", "Clean Bathroom", "Water Plants",];
// creates buttons from above var
installChoreButtons();


$('#addChore').on('click', function() {
    var choreEntered = $('#choreInput').val().trim();
    topics.push(choreEntered);
    $('#choreInput').val('');
    installChoreButtons();

    return false;
});


function installChoreButtons() {
     $('#choreButtons').empty();

     for (var i = 0; i < topics.length; i++) {
         var button = $('<button>').addClass('btn btn-primary btn-lg btn-block');
         button.attr('data-chore', topics[i]).html(topics[i]);
         $('#choreButtons').append(button);
    }
}
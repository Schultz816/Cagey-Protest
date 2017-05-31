var topics = ["Wash Dishes", "Clean Room", "Laundry", "Vaccum", "Walk the Dog", "Clean Bathroom", "Water Plants",];
// creates buttons from above var
installAnimalButtons();


$('#addAnimal').on('click', function() {
    var animalEntered = $('#animalInput').val().trim();
    topics.push(animalEntered);
    $('#animalInput').val('');
    installAnimalButtons();

    return false;
});


function installAnimalButtons() {
     $('#animalButtons').empty();

     for (var i = 0; i < topics.length; i++) {
         var button = $('<button>').addClass('btn btn-primary btn-lg btn-block');
         button.attr('data-animal', topics[i]).html(topics[i]);
         $('#animalButtons').append(button);
    }
}
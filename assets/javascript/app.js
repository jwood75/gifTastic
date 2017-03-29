//==================GLOBAL VARIABLE==================================================================================================
var buttonArray = ["Judy Garland", "Clark Gable", "James Dean", "Marlon Brando", "Debbie Reynolds", "Julie Andrews", "Gene Kelly", "Eartha Kitt"];
//===================================================================================================================================

//=========================CREATING FUNCTIONS==================================================
	//function to generate default buttons and user created buttons
  function create(){

		$("#generatedButtons").empty();

    $("#userInput").val(" ");

		for (var i = 0; i < buttonArray.length; i++) {

			var newButton = $("<button>");

			newButton.addClass("gifButton")

			newButton.attr("data-name", buttonArray[i]);

			newButton.text(buttonArray[i]);

			$("#generatedButtons").append(newButton);

		} //end for loop

	} //end create function

  //function to generate and prepend still gifs
  function displayGif(){

    $("#generatedGifs").empty(); //will empty out previous gifs when new button is clicked

    var gifName = $(this).attr("data-name");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifName + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({

      url: queryURL,
      method: "GET"

    }).done(function(response){

      var gifURL = response.data;

      for (var i = 0; i < gifURL.length; i++) {
      //=======================================================================
        // var gifDiv = $("<div class='imgWrap'>");

        // var rating = gifURL[i].rating;

        // var gifText = $("<p class='imgRating'>").text("Rated: " + rating);
      //=======================================================================
        var	gifImage = $("<img>");

        gifImage.attr("src", gifURL[i].images.fixed_height_still.url);

        gifImage.attr("alt", "Gif Image");

        gifImage.attr("data-still", gifURL[i].images.fixed_height_still.url);

        gifImage.attr("data-animate", gifURL[i].images.fixed_height.url);

        gifImage.attr("data-state", "still");

        gifImage.addClass("gifStyle");
      //================================
        // gifDiv.prepend(gifText);

        // gifDiv.prepend(gifImage)
      //================================
        $("#generatedGifs").prepend(gifImage);

      } // end for loop=======

    }); //end .done function========

  } //end displayGif function=========

  //function to switch still gif to animated gif
  function displayMovingGif() {

      var state = $(this).attr("data-state");

      if (state === "still"){

        $(this).attr("src", $(this).attr("data-animate"));

        $(this).attr("data-state", "animate");

      }
      else{

        $(this).attr("src", $(this).attr("data-still"));

        $(this).attr("data-state", "still");

      } //end if else statment======

  } // end displayMovingGif================

    //on click function to create user created buttons
    $("#add-button").on("click", function(event) {

       event.preventDefault();

       var userButton = $("#userInput").val().trim();

       buttonArray.push(userButton);

       create();

    }); //end on click function
//===========================================================================================

//========================CALLING FUNCTIONS==================================================
    //will call displayGif function when a .gifButton is clicked
    $(document).on("click", ".gifButton", displayGif);

    //will call displayMovingGif function with .gifStyle is clicked
    $(document).on("click", ".gifStyle", displayMovingGif);
    
    //calls create function when page loads  
    create();

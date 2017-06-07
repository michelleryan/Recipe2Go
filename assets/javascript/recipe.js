//call recipe using http://www.recipepuppy.com/api
// For example:
// http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3 

// Optional Parameters:
// i : comma delimited ingredients
// q : normal search query
// p : page
// format=xml : if you want xml instead of json 


$(document).ready(function(){

var queryurl = "http://www.recipepuppy.com/api/?";
var ingredient = "";
var recipeType = "";
var alpha = new RegExp(/^[A-Za-z,\s]+$/);  //pattern to ensure only valid words are entered

var recipeResults = {};
var numResults = 6;
var walmartResults = {};



// This will set the click events for each of the results
setClickItems(numResults);
setInitial();

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBePZ0fp3Y2wYdCDj3qEvXU6MNG12-asOo",
    authDomain: "recipe2go-c3963.firebaseapp.com",
    databaseURL: "https://recipe2go-c3963.firebaseio.com",
    projectId: "recipe2go-c3963",
    storageBucket: "recipe2go-c3963.appspot.com",
    messagingSenderId: "701815658245"
  };
  firebase.initializeApp(config);
 
 //********************* Get search data stored in Recipe2Go Firebase************************************// 
  //store database structure into variables
  var database = firebase.database().ref("Searches/");
  var searchIngr = database.child("ingredients");
  var searchType = database.child("recipeType");

  //store the last 3 ingredient searches and recipe types
  var lastIngr = searchIngr.limitToLast(3);
  var lastType = searchType.limitToLast(3);

  //get the data stored in the database for ingredients using our variable which limits the # of results returned
  lastIngr.on("child_added", function(data){
  	console.log(data.val().ingredient);
	}, function(error) {
  		console.log("Error: " + error.code);
  });

//get the data stored in the database for recipe types using our variable which limits the # of results returned
  lastType.on("child_added", function(data){
  	console.log(data.val().recipeType);
  }, function(error) {
  		console.log("Error: " + error.code);

  });


//*****************************************************************************************************// 
  
//get ingredients list from user input box 
$("button").click(function(){
	
	$("#results").show();
	HidePageItems();


	ingredient = $("#ingredient-input").val().trim();
	recipeType = $("#type-input").val().trim();
	console.log("ingredients: " + ingredient);
	console.log("recipe type: " + recipeType);

	//check that ingredient-input or type-input have some value before you build the queryRecipe url
	if (ingredient.length>0 || recipeType.length>0) {

		if(ingredient.length>0 & recipeType.length>0) {
			//both search windows have input

			//validation of input, should be only characters and ingredients must be seperated by a ','
			var goodType = alpha.test(recipeType);
			var goodIngr = alpha.test(ingredient);
			console.log("type: " + goodType + ", Ingredient: " + goodIngr);

			if (goodType & goodIngr) {
				//add ingredients and recipe type to database
				// database.push({
				// 	ingredient: ingredient,
				// 	recipeType: recipeType

				// });
				searchIngr.push({
					ingredient:ingredient
				});
				searchType.push({
					recipeType:recipeType

				});


			var queryRecipe = queryurl + "i=" + ingredient + "&q=" + recipeType +"&p=3";
			console.log(queryRecipe);
			recipeCall(queryRecipe);

			

			
			}
			else{
				console.log("invalid input");
			}

		}
		if (ingredient.length>0 & recipeType.length==0) {

			//only ingredient search has input
			var goodIngr = alpha.test(ingredient);

			if (goodIngr) {
				//add ingredient to database
				searchIngr.push({
					ingredient:ingredient
				});

			var queryRecipe = queryurl + "i=" + ingredient +"&p=3";
			recipeCall(queryRecipe);
			}
			else{
				console.log("invalid input");
			}
			
		}
		if (recipeType.length>0 & ingredient.length==0) {
			
			//only recipe type search has input
			var goodType = alpha.test(recipeType);

			if (goodType) {

				//add recipe type to database
				searchType.push({
					recipeType:recipeType
				});
			var queryRecipe = queryurl + "q=" + recipeType + "&p=3";
			recipeCall(queryRecipe);
			}
			else{
					console.log("invalid input");
			}
			
		}


		
	}
	else{

		alert("You must enter some ingredients or a recipe type you want to search for!");
	}

	//Determine if the user entered ingredients and a recipe type or just one of the search options
	//build the queryRecipe url accordingly

	function recipeCall (queryRecipe) {
		//make ajax call to search for recipes with ingredients stored in ingredient variable
			$.ajax({
			url: queryRecipe,
			method: "GET",
			dataType: 'jsonp',
			success: function(response) {

				recipeResults = response.results;

				for (var i = 0; i < numResults; i++) {

				// Create the thumbnail html
				var html = '<div class="col-sm-6 col-md-4"><div class="thumbnail" id="thumb' + i +'"><img id="image"' + i + ' src=' +
				response.results[i]["thumbnail"] + '>';

				var caption = $("<div>");
				caption.attr("class", "caption");
				caption.attr("id", "caption" + i)

				// Add the thumbnail label 
				$("#firstRow").append(html);
				$("#thumb" + i).append(caption);
				
				// Add the title to the caption html
				$("#caption" + i).html("<h3>" + response.results[i]["title"] + "</h3>");

				}



				}


			});

		}
	
});

//********************* Click event for first result ******************************************//

function setClickItems(number) {
	
	// Create a click even for each result
	for (var i = 0; i < number; i++) {
		
		$(".row").delegate("#thumb" + i, "click", function() {
			CreateChecklist(i);	
			HidePageItems();

		})   // end of click events
	} // end of for loop
} // end of function


//******************** METHODS ****************************************************//

function CreateChecklist(j) {
	
	// Create a list
	var formHTML = '<form id="list" action="/action_page.php" method="get">	</form>';

  	$("#ingredientList").append(formHTML);
	
	var ingredients = recipeResults[j].ingredients.split(',');

	for (var i = 0; i < ingredients.length; i++) {

		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = "ingredient";
		checkbox.value = "test";


			
		checkbox.id = "ingredient" + j + i;

		var label = document.createElement('label')
		label.htmlFor = "ingredient"  + j + i;
		label.appendChild(document.createTextNode(ingredients[i]));

		ingredients[i] = ingredients[i].replace(/\s/g, '_');

		var request = $.ajax({
			url: "http://api.walmartlabs.com/v1/search?apiKey=jbwqfe65aws3axhy5qqxbx2r&query=" + ingredients[i]
	,
			method: "GET",
			dataType: 'jsonp',
			success: function(data) {

				walmartResults = data;

				if(data.totalResults != 0) {

					var a = document.createElement('a');
					var linkText = document.createTextNode(data.query);
					a.appendChild(linkText);
					a.title = "ingredient";
					a.target = "_blank";
					a.href = data.items[0].addToCartUrl;
					document.body.appendChild(a);

				}

				else {
					// do something about there not being any data left
				}

			}
			});	 // end of ajax function

		$("#list").append(checkbox);
		$("#list").append(label);
		$("#list").append("<br>");


	}
}

function HidePageItems() {
	$("#howto").hide();
	$(".jumbotron").hide();
}

function setInitial() {
	$("#results").hide();
}

function ingredientAdd(ingredient) {
	console.log(ingredient);
	database.ref().push({
		ingredient: ingredient

	});

}



 });
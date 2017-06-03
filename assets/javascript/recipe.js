//call recipe using http://www.recipepuppy.com/api
// For example:
// http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3 

// Optional Parameters:
// i : comma delimited ingredients
// q : normal search query
// p : page
// format=xml : if you want xml instead of json 

console.log("testing");
$(document).ready(function(){

var queryurl = "http://www.recipepuppy.com/api/?";
var ingredient = "";
var recipeType = "";


//var queryRecipe = queryurl + "i=" + ingredient + "&q=" + qItem + "&p=3";

//"http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3";

//get ingredients list from user input box 
$("button").click(function(){
	ingredient = $("#ingredient-input").val().trim();
	recipeType = $("#type-input").val().trim();
	console.log("ingredients: " + ingredient);
	console.log("recipe type: " + recipeType);
	


	//check that ingredient-input or type-input have some value before you build the queryRecipe url
	if (ingredient.length>0 || recipeType.length>0) {

		//validation of input, should be only characters and ingredients must be seperated by a ','

		if(ingredient.length>0 & recipeType.length>0) {
			//both search windows have input
			var queryRecipe = queryurl + "i=" + ingredient + "&q=" + recipeType +"&p=3";
			console.log(queryRecipe);
			recipeCall(queryRecipe);
			

		}
		if (ingredient.length>0 & recipeType.length==0) {

			//only ingredient search has input
			var queryRecipe = queryurl + "i=" + ingredient +"&p=3";
			recipeCall(queryRecipe);
			
		}
		if (recipeType.length>0 & ingredient.length==0) {
			
			//only recipe type search has input
			var queryRecipe = queryurl + "q=" + recipeType + "&p=3";
			recipeCall(queryRecipe);
			
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
				console.log(response);
				
				}

			});

		
		
		
	}

	
});



// $("button").click(function(){
// 	//$("#recipedata").load("http://www.bigoven.com/recipe/eggplant-omelet-with-coriander-and-caraway/143831 .ingredientbox");
// 	// $.get(bigOvenURL, function(data){
// 	// 	console.log(data);
// 	$("#recipedata").load(bigOvenURL + " .ingredientbox");
// 	$("#recipedata").load(recipeURL + "")
// 	// });

// 	$.ajax({
// 		url: recipeURL,
// 		method: "GET",
// 		//dataType: "jsonp",
// 		// jsonpCallback: "callback",
// 		success: function(pageData) {
// 			console.log(pageData);
// 		}
// 	});

// });

// //get html data from a specific url
// 	var recipeURL = "http://allrecipes.com/recipe/68898/potato-and-cheese-frittata";

// //scraping of bigoven recipe page
// var bigOvenURL = "http://www.bigoven.com/recipe/eggplant-omelet-with-coriander-and-caraway/143831";
 });
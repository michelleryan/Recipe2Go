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
var qItem = "";


//var queryRecipe = queryurl + "i=" + ingredient + "&q=" + qItem + "&p=3";

//"http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3";

//get ingredients list from user input box 
$("button").click(function(){
	ingredient = $("#ingredient-input").val();
	console.log(ingredient);

	//build query url using recipepuppy api
	var queryRecipe = queryurl + "i=" + ingredient + "&p=3";

	//make ajax call to search for recipes with ingredients stored in ingredient variable
	$.ajax({
	url: queryRecipe,
	method: "GET",
	dataType: 'jsonp',
	success: function(response) {
		console.log(response);

	}

	});

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
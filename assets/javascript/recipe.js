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

		

		if(ingredient.length>0 & recipeType.length>0) {
			//both search windows have input

			//validation of input, should be only characters and ingredients must be seperated by a ','
			var goodType = alpha.test(recipeType);
			var goodIngr = alpha.test(ingredient);
			console.log("type: " + goodType + ", Ingredient: " + goodIngr);

			if (goodType & goodIngr) {

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


				for (var i = 0; i < 6; i++) {

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
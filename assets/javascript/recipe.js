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
  var database = firebase.database();

//initalize our database elements
// 	var name = "";
// 	var ingredients = "";
// 	var prices = "";
// 	var total = "";

// //set the db
// 	database.ref().set({
// 		name: name,
// 		ingredients: ingredients,
// 		prices: prices,
// 		total: total

// 	});

//get ingredients list from user input box 
$("button").click(function(){
	
	$("#results").show();
	HidePageItems();


	ingredient = $("#ingredient-input").val().trim();
	recipeType = $("#type-input").val().trim();

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
			CreateHeader(i);
			BuildTable();
			CallWalmart(i);
			HidePageItems();
		})   // end of click events
	} // end of for loop
} // end of function


//******************** METHODS ****************************************************//



function HidePageItems() {
	$("#howto").hide();
	$(".jumbotron").hide();
	$("#firstRow").empty();
}

function setInitial() {
	$("#results").hide();
}

function CreateHeader(index) {
	$("#ingredientList").append("<a href=" + recipeResults[index].href +"><h3>" + recipeResults[index].title + "</h3></a>");
	$("a").attr("target", "_blank");
}

function CallWalmart(index) {

	var ingredients = recipeResults[index].ingredients.split(',');

	for (var index = 0; index < ingredients.length; index++) {

		// Make an ajax call for each ingredient and add them to the table
		$.ajax({
			url: "http://api.walmartlabs.com/v1/search?apiKey=jbwqfe65aws3axhy5qqxbx2r&query=" + ingredients[index]
	,
			method: "GET",
			dataType: 'jsonp',
			success: function(data) {

				walmartResults = data;

				if(data.totalResults != 0) {
					AddTableRow(data.items[0]);
				}

				else {
					// do something about there not being any data left
					console.log("There is no data from walmart.");
				}
			}
			});	 // end of ajax function

	}
	
}

function AddTableRow (data) {

	console.log(data);

	var ingredient = data.name;
	var price = data.salePrice;
	var cartURL = data.addToCartUrl;
	var available = data.availableOnline;

	// if the price is not available, state that is not available
	if(!price) {
		price = "Price info is not available.";
	}



	var row = $("<tr>");
	
	// Write the ingredient name to the table
	var data = $("<td>");
	data.html(ingredient);
	row.append(data);

	// Write the price to the table
	var data = $("<td>");
	data.html(price);
	row.append(data);

	// Create a link for add to Cart
	if(available) {

		var data = $("<td>");
		var form = document.createElement("FORM");

		console.log(cartURL);

		form.setAttribute("action", "" + cartURL + "");
		form.setAttribute("target", "_blank");
		var i = document.createElement("input"); 
		i.setAttribute('type',"submit");
		i.setAttribute('value',"Add to Cart");
	
		form.appendChild(i);
		data.append(form);

	}

	else {
		var data = $("<td>");
		data.html("Item not available");
	}
	
	// var dataHTML = $("<td><form action='" + cartURL + " + ><input type='submit'" +
	// "value='Go to Google' /></form></td>");
	row.append(data);

	$("#tableData").append(row);

}

// This builds the table structure for the ingredient results
function BuildTable() {
 
 	var head = "<thead><tr><th>Ingredient</th><th>Price</th><th>Add to Walmart Grocery Cart?</th>";
 	var table = $("<table class='table'>");
 	var body = $("<tbody id= 'tableData'>");
 	
 	table.append(head);
 	table.append(body);
	
 	$("#ingredientList").append(table);

}

// This 
function ReturnToResultsPage() {


}


 });
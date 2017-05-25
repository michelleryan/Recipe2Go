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

// var queryurl = "http://www.recipepuppy.com/api/?";
// var ingredient = "onions, garlic";
// var qItem = "omelet";
// var page = 3;

var queryRecipe = "http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3";

$.ajax({
	url: queryRecipe,
	method: "GET",
	dataType: 'jsonp',
	success: function(response) {
		console.log(response);
	}

	});

})


"use strict";

$('#monday').click( function() { Monday(); return false; });
$('#tuesday').click( function() { Tuesday(); return false; });
$('#wednesday').click( function() { Wednesday(); return false; });
$('#thursday').click( function() { Thursday(); return false; });
$('#friday').click( function() { Friday(); return false; });

$(document).on('click', "button[id^='selectRestaurant']", function() {
    SelectRestaurant(this.id);     
});

function Monday() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			$(document.getElementById("myOrders")).find('tbody').html(this.responseText);
		}
	}
	xhttp.open("GET", "mondayInfo", true);
	xhttp.send();
}

function Tuesday() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			$(document.getElementById("myOrders")).find('tbody').html(this.responseText);
		}
	}
	xhttp.open("GET", "tuesdayInfo", true);
	xhttp.send();
}

function Wednesday() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			$(document.getElementById("myOrders")).find('tbody').html(this.responseText);
		}
	}
	xhttp.open("GET", "wednesdayInfo", true);
	xhttp.send();
}

function Thursday() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			$(document.getElementById("myOrders")).find('tbody').html(this.responseText);
		}
	}
	xhttp.open("GET", "thursdayInfo", true);
	xhttp.send();
}

function Friday() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			$(document.getElementById("myOrders")).find('tbody').html(this.responseText);
		}
	}
	xhttp.open("GET", "fridayInfo", true);
	xhttp.send();
}

function SelectRestaurant(id) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			alert(this.responseText);
		}
	}
	xhttp.open("POST", "selectRestaurant", true);
	xhttp.send();
}

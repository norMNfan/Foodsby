// modules for creating a server
const http = require('http'); 
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

// localhost:9005
const hostname = '127.0.0.1';
const port = 9005;

// Create server
const httpServer = http.createServer(function (req, res) {
  switch(req.method) {

    // handle GET requests
    case 'GET':
      console.log("received a GET for: " + req.url);
      // request for the home page
      if(req.url === '/' || req.url === '/orders.html') {
        getOrdersPage(req, res);
      
      // request for monday restaurants
      } else if(req.url === '/mondayInfo') {
        getMondayInfo(req, res);
        
      // request for tuesday restaurants
      } else if(req.url === '/tuesdayInfo') {
        getTuesdayInfo(req, res);

	  // request for wednesday restaurants
      } else if(req.url === '/wednesdayInfo') {
        getWednesdayInfo(req, res);
      
      // request for thursday restaurants
      } else if(req.url === '/thursdayInfo') {
        getThursdayInfo(req, res);
      
      // request for friday restaurants
      } else if(req.url === '/fridayInfo') {
        getFridayInfo(req, res);
      
        // request for css files
      } else if (req.url.match(/.css$/)) {
        var pathName = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(pathName, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);
      
        // request for javascript files
      } else if (req.url.match(/.js$/)) {
        var pathName = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(pathName, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/javascript"});
        fileStream.pipe(res);
      } else {
      
        // request for an unknown page
        get404(req, res);
      }
      break;

    // Handle post requests
    case 'POST':
      console.log("received a POST for: " + req.url);
      if(req.url === '/selectRestaurant') {
        var reqBody = '';
        
        req.on('data', function(data) {
          reqBody += data;
        });
        
        req.on('end', function() {
          selectRestaurant(req, res, reqBody);
        });
      }
      break;

    // Other requests
    default:
      get405(req, res);
      break;
  } 
});

httpServer.listen(port, hostname, () => {
  console.log('Server started on port', port);
})

function getOrdersPage(req, res) {
  console.log("returning orders.html");
  fs.readFile('client/orders.html', function(err, html) {
    if(err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}

function getOrderHTML(json) {
	table = "";
      
	// Create HTML table
	for(var i = 0; i < json.length; i++){
		table += "<tr>";
		table += "<td>";
		table += "<div id = 'option'>";

		// Add picture (left panel)
		table += "<div id = 'picture'>";
		table += "<img src=" + json[i]["logoUrl"] + ">";
		table += "<br>";
		table += "<p id = 'restaurantName'>" + json[i]["restaurantName"] + "</p>";
		table += "</div>";

		// Add info (right panel)
		table += "<div id = 'info'>";
		
		// If sold out put soldOut info
		if(json[i]["soldOut"]){
			table += "<div id = 'soldOut'>";
			table += "Sold Out!";
			table += "<br><br>";
			table += "This restaurant has hit maximum capacity which is established to ensure quality";
			table += "</div>";
		}
		
		// Not sold out, orderTime, deliveryTime, restaurantButton
		else {
			table += "<div id = 'orderDeliveryBox'>";
			table += "Order By: ";
			table += "<div class = 'timeBox'>";
			table += "<time>" + json[i]["cutoff"] + "</time>";
			table += "</div>";
			table += "<br>";
			table += "<br>";
			table += "Delivery Time: ";
			table += "<div class = 'timeBox'>";
			table += "<time>" + json[i]["dropoff"] + "</time>";
			table += "</div>";
			table += "</div>";
			
			// create unique id for each restaurant button
			var id = 'selectRestaurant' + "_" + json[i]["storeId"] + "_" + json[i]["deliveryId"];
			
			// order has been placed or its past the cutoff, button will be disabled
			if(json[i]["isOrderPlaced"] || json[i]["isPastCutoff"]){
				//table += "<form action = '/selectRestaurant' method = 'POST'>"
				table += "<div id = 'restaurantButton'>";
				table += "<button id = '" + id + "' type='submit' class='btn btn-danger btn-lg btn-block' disabled='disabled'>Select Restaurant</button>"
				table += "</div>";
				//table += "</form>";
			}
			
			// order has NOT been placed, button will be enabled
			else{
				//table += "<form action = '/selectRestaurant' method = 'POST'>"
				table += "<div id = 'restaurantButton'>";
				table += "<button id = '" + id + "' type='submit' class='btn btn-danger btn-lg btn-block'>Select Restaurant</button>"
				table += "</div>";
				//table += "</form>";
			}
			
			// If sellingOut put sellingOut info
			if(json[i]["sellingOut"]){
				table += "<div id = 'sellingOut'>";
				table += "Hurry! meals are selling out.";
				table += "</div>";
			}
		}
		table += "</div>";

		table += "</div>";
		table += "</td>";
		table += "</tr>"
	}
	
	return table;
}

function getMondayInfo(req, res) {
  fs.readFile('deliveries-sample.json', function(err, content) {
      if(err) {
        throw err;  
      } 
      parseJson = JSON.parse(content);
      json = parseJson["dropoffs"][0]["deliveries"];
      console.log(json);
      table = getOrderHTML(json);
      
      var response = {res: table};
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.write(table);
      res.end();
  });
}

function getTuesdayInfo(req, res) {
  fs.readFile('deliveries-sample.json', function(err, content) {
      if(err) {
        throw err;  
      } 
      parseJson = JSON.parse(content);
      json = parseJson["dropoffs"][1]["deliveries"];
      console.log(json);
      table = getOrderHTML(json);
      
      var response = {res: table};
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.write(table);
      res.end();
  });
}

function getWednesdayInfo(req, res) {
  fs.readFile('deliveries-sample.json', function(err, content) {
      if(err) {
        throw err;  
      } 
      parseJson = JSON.parse(content);
      json = parseJson["dropoffs"][2]["deliveries"];
      console.log(json);
      table = getOrderHTML(json);
      
      var response = {res: table};
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.write(table);
      res.end();
  });
}

function getThursdayInfo(req, res) {
  fs.readFile('deliveries-sample.json', function(err, content) {
      if(err) {
        throw err;  
      } 
      parseJson = JSON.parse(content);
      json = parseJson["dropoffs"][3]["deliveries"];
      console.log(json);
      table = getOrderHTML(json);
      
      var response = {res: table};
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.write(table);
      res.end();
  });
}

function getFridayInfo(req, res) {
  fs.readFile('deliveries-sample.json', function(err, content) {
      if(err) {
        throw err;  
      } 
      parseJson = JSON.parse(content);
      json = parseJson["dropoffs"][4]["deliveries"];
      console.log(json);
      table = getOrderHTML(json);
      
      var response = {res: table};
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.write(table);
      res.end();
  });
}

function selectRestaurant(req, res, reqBody) {
  JSONstring = querystring.parse(reqBody);
  console.log(JSONstring);
  res.statusCode = 200;
  res.setHeader('Content-type', 'text/html');
  res.write("order received");
  res.end();
}

function get404(req, res) {
  fs.readFile('client/404.html', function(err, html) {
    if(err) {
      throw err;
    }
    res.statusCode = 404;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}

function get405(req, res) {
  fs.readFile('client/405.html', function(err, html) {
    if(err) {
      throw err;
    }
    res.statusCode = 405;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}

var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Goat0300",
  database: "bamazonDB"
});

function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
	return 'Please enter a number above.';
	}
}
function promptUserPurchase() {
	inquirer.prompt([
{
	type: 'input',
	name: 'item_id',
	message: 'Enter the Item ID which you would like to buy.',
	validate: validateInput,
	filter: Number
		},
	{
		type: 'input',
		name: 'quantity',
		message: 'How many would you like?',
		validate: validateInput,
		filter: Number
	}
	]).then(function(input) {

		var item = input.item_id;
		var quantity = input.quantity;


		var storeitems = 'SELECT * FROM products WHERE ?';

		connection.query(storeitems, {item_id: item}, function(err, data) {
			if (err) throw err;

	
			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID.');
				displayInventory();

			} else {
				var productData = data[0];

				if (quantity <= productData.stock_quantity) {
					console.log('Congratulations, the product is in stock! ORDERED!');

					// Construct the updating query string
					var updatestoreitems = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
				
	connection.query(updatestoreitems, function(err, data) {
		if (err) throw err;

						console.log('Your order was placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for your business!');
						console.log("\n---------------------------------------------------------------------\n");

						// End the database connection
						connection.end();
					})
				} else {
					console.log('Insufficent quantity! Change your order!');
					console.log('Please modify your order.');
					console.log("\n---------------------------------------------------------------------\n");

					displayInventory();
				}
			}
		})
	})
}

function displayInventory() {

	storeitems = 'SELECT * FROM products';

	connection.query(storeitems, function(err, data) {
		if (err) throw err;

		console.log('Existing Inventory: ');
		console.log('...................\n');

		var itemsforsale = '';
		for (var i = 0; i < data.length; i++) {
			itemsforsale = '';
			itemsforsale += 'Item ID: ' + data[i].item_id + '  |  ';
			itemsforsale += 'Product Name: ' + data[i].product_name + '  |  ';
			itemsforsale += 'Department: ' + data[i].department_name + '  |  ';
			itemsforsale += 'Price: $' + data[i].price + '\n';

			console.log(itemsforsale);
		}

	  	console.log("---------------------------------------------------------------------\n");

	
	  	promptUserPurchase();
	})
}


function runBamazonDB() {
	
	displayInventory();
}

// Run the application logic
runBamazonDB();

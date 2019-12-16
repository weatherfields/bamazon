// project dependencies 
const inquirer = require('inquirer');
const mysql = require('mysql');
const table = require('console.table'); // used to display results in a table (to Terminal)
const chalk = require('chalk'); // colorizes the table in terminal 

// below I'll connect to the mysql database (created in Workbench)

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Vunbcz1@",
    database: "bamazon_db",
    port: 3306

})

// below I'll call the mysql database and then call the function needed to render the products to the terminal window.

connection.connect(function (err) {
    if (err) throw err;

    renderProducts();
})

let renderProducts = () => {

    var queryString = "SELECT * FROM products"; // selects all of the columns/rows in the database.
    connection.query(queryString, function (error, results) { // makes the connection query to mysql database.
        if (error) throw error;
        console.log(chalk.black.cyan.bold("------------------------------------------------------------------------------------------------------------------------------------------------\n                                     Welcome To BAMAZON! Please check the list below for available items.                 \n------------------------------------------------------------------------------------------------------------------------------------------------"))
        console.table(results); // Adds console.table method for convenience
        askQuestions()
    })
}

function askQuestions() {
    inquirer.prompt([{ // .prompt will literally prompt the user with the following questions. Then item_id is converted into a new variable itemID and itemAmt is the number the customer inputs from terminal.
            message: "Please type in the item_id that you'd like to buy.",
            type: "input",
            name: "itemID"
        },
        {
            message: "how many would you like to buy?",
            type: "input",
            name: "itemAmt"
        }
    ]).then(function (custProduct) { // custProduct means the product they want to buy that they typed into terminal 
        let itemID = custProduct.itemID; // the number item_id got from custProduct 
        let itemAmt = custProduct.itemAmt; // the amount they want to buy 
        // var allProd = getAllProd();
        pullProduct(itemID, itemAmt) // call the funciton below
    });
}
// select all of the products in the database via connection.query and run the for loop on them, looking for the product that the customer wants and the number that they want to buy.
function pullProduct(itemID, itemAmt) {
    connection.query('SELECT * FROM products', function (error, res) {
        if (error) throw error;
        let chosenProduct;

        for (var i = 0; i < res.length; i++) {
            if (res[i].item_id == itemID) { // if the item_id and itemID match, then the customer is let known that their product was found by console logging 
                chosenProduct = res[i]
            }
        }
        console.log(chosenProduct, "Here is your item. Thanks for shopping at Bamazon!")
        // then their purchase is logged into the stock_quantitiy and the amount left is changed in the database by calling orderComplete.
        if (chosenProduct.stock_quantity >= itemAmt) {
            orderComplete(chosenProduct, itemID, itemAmt)
            connection.end()

        } else {
            // if there was too high a number typed in, then the customer sees the message below.
            console.log("Sorry, we had to cancel your order due to a stocking error.")
            connection.end()
        }
    })
};

function orderComplete(productObject, itemID, itemAmt) {
    var newStockAmt = productObject.stock_quantity - itemAmt; // take sold items away from total stock
    var dataQuery = "UPDATE products SET stock_quantity = ? WHERE ?";
    // below updates database with the new stock amount 
    connection.query(dataQuery, [newStockAmt, {
        item_id: itemID // limits deprecating values to the specific item (WHERE ?)
    }], function (err) {
        if (err) throw err;
    })
};
// I couldn't figure out how to show total cost of purchase.
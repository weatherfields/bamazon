const inquirer = require('inquirer');
const mysql = require('mysql');
const table = require('console.table'); // used to display results in a table (to Terminal)
const chalk = require('chalk');

//let data = [];

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Vunbcz1@",
    database: "bamazon_db",
    port: 3306

})

// let start = () => {
connection.connect(); // Originally thought I had to put this into a function.
// }
renderProducts();

function renderProducts() {
    var queryString = "SELECT * FROM products";

    connection.query(queryString, function (error, results) { //, fields
        if (error) throw error;

        console.table(results);
    });
    // connection.end();
}

// start();
// renderProducts();
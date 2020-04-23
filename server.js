var mysql = require("mysql");
//connection goes here
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "hbif9227",
    database: "employee_db"
});
//Begin initial display and confirm connection
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + ". Here is the employee info we have on file: ");
    connectionEstablished();
});
function connectionEstablished() {
    //Displays all data from employee table
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
    });
    //Displays all data from role table
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.log("Here is our list of roles:")
        console.table(res);
    });
    //Displays all data from department table
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.log("Here is our list of departments:")
        console.table(res);
    });
}

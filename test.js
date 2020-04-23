var mysql = require("mysql");
var inquirer = require("inquirer");

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
    console.log("connected as id " + connection.threadId + ". Welcome to my employee management system.");
    start();
});

function start() {
    inquirer
      .prompt({
        name: "addvieworupdate",
        type: "list",
        message: "What action would you like to do?",
        choices: ["view Info", "Add Info", "Update employee role", "Exit program"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.addvieworupdate === "view Info") {
          viewEmployees();
        }
        else if(answer.addvieworupdate === "Add Info") {
          addInfo();
        } 
        else if(answer.addvieworupdate === "Update employee role") {
          updateRole();
        } 
        else if(answer.addvieworupdate === "Exit program") {
            console.log("Connection ended. Thank you for using my employee management system.")
            connection.end();
        }
      });
  }

  //Functions for viewing, adding, and updating go here
  //View
  function viewEmployees () {
    inquirer
      .prompt({
        name: "viewlist",
        type: "list",
        message: "Which info would you like to see?",
        choices: ["Employee Info", "Role Info", "Department Info", "All Info", "Return to Main Menu", "Exit program"]
      })
      .then(function(answer){
        if (answer.viewlist === "Employee Info") {
            console.log("Employee list:\n");
            connection.query("SELECT * FROM employee", function(err, res) {
                if (err) throw err;
                console.table(res);
                start();
              });
          }
          else if(answer.viewlist === "Role Info") {
            console.log("Role list:\n");
            connection.query("SELECT * FROM role", function(err, res) {
                if (err) throw err;
                console.table(res);
                start();
              });
          } 
          else if(answer.viewlist === "Department Info") {
            console.log("Department list:\n");
            connection.query("SELECT * FROM department", function(err, res) {
                if (err) throw err;
                console.table(res);
                start();
              });
          } 
          else if(answer.viewlist === "All Info") {
            console.log("List of all info:\n");
            connection.query("SELECT * FROM employee", function (err, res) {
                if (err) throw err;
                console.table(res);
            });
            connection.query("SELECT * FROM role", function (err, res) {
                if (err) throw err;
                console.table(res);
            });
            connection.query("SELECT * FROM department", function(err, res) {
                if (err) throw err;
                console.table(res);
                start();
              });

          } 
          else if(answer.viewlist === "Return to Main Menu") {
            start();
        }
          else if(answer.viewlist === "Exit program") {
            console.log("Connection ended. Thank you for using my employee management system.")
            connection.end();
        }
      });

  }

  //Function to Add Info

  function addInfo() {
    inquirer
      .prompt({
        name: "addlist",
        type: "list",
        message: "What info would you like to add?",
        choices: ["Employee Info", "Role Info", "Department Info","Return to Main Menu", "Exit program"]
      })
      .then(function(answer){
        if (answer.addlist === "Employee Info") {
            getEmployeeInfo();
          }
        else if (answer.addlist === "Role Info") {
            getRoleInfo();
          }
          else if (answer.addlist === "Department Info") {
            getDepartmentInfo();
          }  
          else if(answer.addlist === "Return to Main Menu") {
            start();
        }
        else if(answer.addlist === "Exit program") {
            console.log("Connection ended. Thank you for using my employee management system.")
            connection.end();
        }
      });
  }

function getEmployeeInfo() {
    inquirer
        .prompt([{
            name: "first_name",
            type: "input",
            message: "Enter your employee's first name."
        },
        {
            name: "last_name",
            type: "input",
            message: "Enter your employee's last name."
        },
        {
            name: "role_id",
            type: "input",
            message: "Enter your employee's role ID."
        },
        {
            name: "manager_id",
            type: "input",
            message: "Enter your employee' manager ID."
        },
        ])
        .then(function(answer){
             connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id
                },
            );
            console.log("Your new employee has been added.\n");
            start();
        })
        
}

function getRoleInfo() {
    inquirer
        .prompt([{
            name: "title",
            type: "input",
            message: "Enter the role's title."
        },
        {
            name: "salary",
            type: "input",
            message: "Enter your role's salary"
        },
        {
            name: "manager_id",
            type: "input",
            message: "Enter your role's manager ID."
        },
        ])
        .then(function(answer){
             connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    manager_id: answer.manager_id
                },
            );
            console.log("Your new role has been added.\n");
            start();
        })
        
}

function getDepartmentInfo() {
    inquirer
        .prompt([{
            name: "name",
            type: "input",
            message: "Enter the department's name."
        },
        ])
        .then(function(answer){
             connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.name,
                },
            );
            console.log("Your new department has been added.\n");
            start();
        })
        
}


//Function to Update Info
function updateRole() {
    inquirer
        .prompt([{
            name: "first_name",
            type: "input",
            message: "Enter your employee's first name."
        },
        {
            name: "last_name",
            type: "input",
            message: "Enter your employee's last name."
        },
        {
            name: "role_id",
            type: "input",
            message: "Enter your employee's role ID."
        },
        ])
        .then(function(answer){
             connection.query(
                "UPDATE employee SET ? WHERE ? AND ?",
                [
                {
                    role_id: answer.role_id 
                },
                {
                    first_name: answer.first_name
                },
                {
                    last_name: answer.last_name
                }
            ],
            function(err, res) {
                if (err) throw ("There was an error");
                console.log(res.affectedRows + " Employee updated\n");
                // Call deleteProduct AFTER the UPDATE completes
                start();
              }
            );
            
            //console.log("Your employee's role ID has been updated.\n");
            
        })
        
}
//Function to Update Info
const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");
const path = require("path");
const render = require("./lib/htmlRenderer");
const init = () => createEmployee();
const employees = [];
function createEmployee (){
    inquirer.prompt([{
        message:"Please enter employee name",
        name:"name",
        type: "input",
    },
    {
        message:"Please select employee role",
        name:"role",
        type: "list",
        choices: ["Manager", "Intern", "Engineer"]
    },{
        message:"Please enter employee email",
        name:"email",
        type: "input",
        validate: input => {
            if (input.includes("@") && input[input.length - 4] === ".") {
              return true;
            } else  {
              console.log('\n Must be a valid email!');
              return false;
    }}}
]).then(answer=>{
    let cond;
    switch(answer.role){
        case "Manager":
            cond= ['What is your phone number?', Manager]
            break;
        case "Engineer":
            cond = ['Please enter your GitHub username', Engineer]
            break;
        case "Intern":
            cond = ['What school are you in?', Intern]
            break;
    }
    inquirer.prompt([{
        message: cond[0],
        name: 'uniq',
        type: 'input',
        // validate: input => {if (cond[1] === Manager && input(cond[0])===isNaN) {console.log("Must be a number!")};
        // return false;}
    },{
        message: "Would you like to add another employee?",
        name: "more",
        type: "confirm"
    }
    ]).then(res=>{
        if (res.more){
            createEmployee();
        };
        const newEmp = new cond[1](answer.name, employees.length+1, answer.email, res.uniq);
       employees.push(newEmp);
        console.log(employees);
        createHTML();
    })
})
}
function createHTML() {
    const outputPath = path.resolve(__dirname, "output", "team.html");
    fs.writeFile(outputPath, render(employees), function (err) {
        if (err) {
            throw err;
        }
    });
}
init();
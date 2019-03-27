const inquirer = require('inquirer');

inquirer.prompt([{
    type: 'confirm',
    name: 'test',
    message: 'Are you handsome?',
    default: true
}, {
    type: 'input',
    name: 'phone',
    message: 'What is your phone number?',
    default: true
}]).then((data) => {
    console.log('结果为：');
    console.log(data);
});
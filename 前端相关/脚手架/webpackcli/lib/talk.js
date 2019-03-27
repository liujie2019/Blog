const inquirer = require('inquirer');
const cloneCode = require('./code');
const reposMap = require('./reposMap');

const select = () => {
    return inquirer.prompt([{
        type: 'list',
        message: 'Please select the template you need:',
        name: 'template',
        choices: Object.keys(reposMap)
    }]).then((answers) => {
        console.log(answers.template)
        cloneCode(answers.template)
    })
}

module.exports = {
    select
}
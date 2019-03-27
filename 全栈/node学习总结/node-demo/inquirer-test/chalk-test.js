const chalk = require('chalk');

console.log(chalk.blue('hello chalk'));
console.log(chalk.red('hello chalk'));
console.log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}
`);
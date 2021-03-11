const questionPrompt = require('./lib/QuestionPrompt')
const fs = require('fs');
const instructions = require('./lib/instructionsData');
const path = require('path');
const mysql = require('mysql2');
const password = require('./password')


class App {
    constructor() {
        this.data = []
    }

    firstRun() {
        try {
            if (fs.existsSync('./instructions.txt')) {
                new App().initializeApp();

            } else {
                fs.writeFileSync(path.join(__dirname, './instructions.txt'), instructions);
                console.log(instructions);
                new App().initializeApp();
            }
        } catch (err) {
            console.error(err);
        }
    }

    initializeApp() {
        console.log(`
+--------------------------------------------------------------+
|                 WELCOME TO EMPLOYEE TRACKER                  |
+--------------------------------------------------------------+\n`)
        questionPrompt()
    }

    initializeDatabase() {

        const { spawn } = require('child_process');
        const child = spawn('mysql -u root -p', { shell: true, detached: true });

        child.stdout.on('data', (data) => {
            console.log(`child stdout:\n${data}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`child stderr:\n${data}`);
        });
        child.on('exit', function (code, signal) {
            
        });

        const child1 = spawn(`code instructions.txt`, { shell: true, detached: true });

        child1.stdout.on('data', (data) => {
            console.log(`child1 stdout:\n${data}`);
        });

        child1.stderr.on('data', (data) => {
            console.error(`child1 stderr:\n${data}`);
        });
        child1.on('exit', function (code, signal) {
            console.log('\n Success! Schema Accepted\n');
            questionPrompt();
        
        });


    }

    viewInstructions() {
        console.log(`\n${instructions}`)
    }


}
module.exports = App;

// multipleStatements: true
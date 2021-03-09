const questionPrompt = require('./lib/QuestionPrompt')
const fs = require('fs');
const instructions = require('./lib/instructionsData');
const path = require('path')


class App {
    constructor() {
        this.data = []
    }
    
    firstRun() {
        try {
            if (fs.existsSync('./lib/instructions.txt')) {
                console.log("The file exists.");
                new App().initializeApp();

            } else {
                fs.writeFileSync(path.join(__dirname, './lib/instructions.txt'), instructions);
                console.log(instructions);
            }
        } catch (err) {
            console.error(err);
        }
    }
    initializeApp() {
        console.log(`WELCOME TO EMPLOYEE TRACKER\n`)
        questionPrompt()

    }


}


module.exports = App;
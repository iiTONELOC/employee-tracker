//const UI = require('../ulits/UI');
const displayPrompt = require('./db/QuestionPrompt')



class App {
    constructor() {
        this.data = []
    }
    initializeApp() {
        console.log(`WELCOME TO EMPLOYEE TRACKER`)
        this.questionPrompt();

    }
    questionPrompt() {
        // new UI().displaySingBreak();
        displayPrompt();
    }

}


module.exports = App;
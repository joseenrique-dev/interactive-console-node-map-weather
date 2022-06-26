const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'Select option',
        choices: [
            { name: `${'1.'.green} Search city`, value: 1 },
            { name: `${'2.'.green} History`, value: 2 },
            { name: `${'0.'.green} Exit`, value: 0 }
        ]
    }
]


const inquirerMenu = async () => {
    
    console.clear();
    console.log('============================');
    console.log('    Select option'.green);
    console.log('============================\n');
    const { option } = await inquirer.prompt(questions);
    return option;
}

const pause = async () => {
    const stopQuestion = [
        {
            type: 'input',
            name: 'stop',
            message: `\nPress ${'Enter'.green } to continue\n`
        }
    ];
    console.log('\n');  // Add a blank line
    await inquirer.prompt(stopQuestion);
}

const readInput = async (message) => {
    const inputQuestion = [
        {
            type:'input',
            name:'desc',
            message,
            validate: ( value ) =>{
                if( value.length === 0 ){
                    return 'Task description is required';
                }
                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(inputQuestion);
    return desc ;
}


/**
 * List task to remove from list
 * @param {*} tasks 
 * @returns 
 */
const listPlaces = async ( places = [] ) => {
    const choices = places.map( (place, index) => {
        const idx = `${index+ 1}. `.green;
        return {
            value: place.id,
            name: `${idx} ${place.name}`
        }
    });
    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancel'
    })
    const questionsRemove = [
        {
            type: 'list',
            name: 'id',
            message: 'Select place:',
            choices: choices
        }
    ]
    const { id } = await inquirer.prompt(questionsRemove);
    return id
}

/**
 * Confirmation question to remove task
 * @param {*} message 
 * @returns 
 */
const confirm = async ( message ) =>{
    const questions = [
        {
            type: 'confirm',
            name: 'ok',
            message: message
        }
    ]
    const { ok } = await inquirer.prompt(questions);
    return ok;    
}

const showCheckList = async ( tasks = [] ) => {
    const choices = tasks.map( (task, index) => {
        const idx = `${index+ 1}. `.green;
        return {
            value: task.id,
            name: `${idx} ${task.description}`,
            checked: task.completed !== null ? true : false
        }
    });
    
    const questionsCompleteCheck = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select task to complete',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(questionsCompleteCheck);
    return ids
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listPlaces,
    confirm,
    showCheckList
}
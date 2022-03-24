#!/usr/bin/env node

import chalk from 'chalk'
import chalkAnimation from 'chalk-animation'
import InitGradient from 'gradient-string'
import inquirer from 'inquirer'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'




let playerName

const sleep = (ms = 2000) => new Promise((r)=> setTimeout(r, ms))

async function Welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who wants to be a millionaire ? \n'
    )


    await sleep()


    rainbowTitle.stop()


    console.log(`
        ${chalk.bgBlue('HOW TO PLAY')}
        I am a process in your computer.
        If you get any question wrong I will be ${chalk.bgRed('killed')}
        So get all the questions right...

    `)

}





async function askName(){
    const answer = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'Whats your name?',
        default(){
            return 'Player';
        }
    })

    playerName = answer.player_name
}


async function question1(){
    const answer = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Javascript was created in 10 days then released on? \n',
        choices: [
            'May 23rd 1995',
            'Nov 24th 1995',
            'Dec 4th 1995',
            'May 17th 1995'
        ]
    })

    return handleAnswer(answer.question_1 === 'Dec 4th 1995')
}

async function question3(){
    const answer = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'Guess which programming lang is my favourite? \n',
        choices: [
            'PHP',
            'Dart',
            'Javascript',
            'Python'
        ]
    })

    return handleAnswer(answer.question_3 === 'Javascript')
}



async function question2(){
    const answer = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'Which programming language is statically typed? \n',
        choices: [
            'Javascript',
            'PHP',
            'Dart',
            'Python'
        ]
    })

    return handleAnswer(answer.question_2 === 'Dart')
}







async function handleAnswer(isCorrect){
    const spinner = createSpinner('Checking answer...').start()

    await sleep()

    if (isCorrect){
        spinner.success({text: `Nice work ${playerName}.`})
    }else{
        spinner.error({text: `Game over, you lose ${playerName}!`})
        process.exit(1)
    }


}


function winner(){
    console.clear();
    const msg = `Congrats, ${playerName} !\n  You won  \n$1 , 0 0 0 , 0 0 0 , 0 0 0`

    figlet(msg, (err, data) => {
        console.log(InitGradient.pastel.multiline(data))
    })
}






await Welcome()
await askName()
await question1()
await question2()
await question3()
await winner()




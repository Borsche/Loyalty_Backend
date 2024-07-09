import express, { Express } from 'express';

import chatbot from './clients/chatbot';

import createCommand from './command/usecases/createCommand/createCommand';
import getCommands from './command/usecases/getCommands/getCommands';
import updateCommand from './command/usecases/updateCommand/updateCommand';
import deleteCommand from './command/usecases/deleteCommand/deleteCommand';

import getUserInfo from './user/usecases/getUserInfo/getUserInfo';
import validateToken from './user/usecases/validate/validateToken';

import addPoints from './points/usecases/addPoints/addPoints';

import createDailyIfNotExists from './reward/daily/createDailyIfNotExists/createDailyIfNotExists';
import { dayTime } from './reward/daily/helpers/helpers';
import getDaily from './reward/daily/getDaily/getDaily';

import say from 'say';
import claimDaily from './reward/daily/claimDaily/claimDaily';

const app: Express = express();
app.use(express.json())
let port = process.env.PORT;

if(!port) {
    port = "3000";    
}

// db.$connect();
// say.speak("Dies ist ein Test")
console.log(say.getInstalledVoices(err => {if (err)console.log(err)}))

chatbot.create();

// add points interval
setInterval(() => {
    addPoints.addPointsMany(Array.from(chatbot.joinedUsernames), process.env.POINTSAMOUNT ? parseInt(process.env.POINTSAMOUNT) : 50);
}, process.env.POINTSINTERVAL ? parseInt(process.env.POINTSINTERVAL) : 5000 * 60);

startDailyCreateInterval();

// command API
app.get('/api/command/commands', getCommands)
app.post('/api/command/create', createCommand)
app.put('/api/command/update', updateCommand)
app.post('/api/command/delete', deleteCommand)

app.get('/api/user/', getUserInfo)
app.get('/api/user/validate', validateToken)

app.get('/api/reward/getDaily', getDaily)
app.post('/api/reward/claimDaily', claimDaily)

app.listen(port, () => {
    console.log("App started")
})



/**
 * Creates the last 7 dailys if they dont exists,
 * then starts a timeout to create the next daily at midnight,
 * and then starts an interval to create the dailys every day
 */
function startDailyCreateInterval() {
    createDailyIfNotExists();
    const midnight = new Date();
    midnight.setHours(24);
    midnight.setMinutes(0);
    midnight.setSeconds(0);
    midnight.setMilliseconds(0);
    const timeTilMidnight = midnight.getTime() - new Date().getTime();
    console.log('Starting Timeout til midnight:', timeTilMidnight);
    setTimeout(() => {
        createDailyIfNotExists();
        setInterval(() => {
            createDailyIfNotExists();
        }, dayTime)
    }, timeTilMidnight)
}
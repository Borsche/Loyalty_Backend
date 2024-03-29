import express, { Express } from 'express';

import createCommand from './command/usecases/createCommand/createCommand';
import getCommands from './command/usecases/getCommands/getCommands';
import updateCommand from './command/usecases/updateCommand/updateCommand';

import getUserInfo from './user/usecases/getUserInfo/getUserInfo';
import validateToken from './user/usecases/validate/validateToken';

import say from 'say';

const app: Express = express();
app.use(express.json())
let port = process.env.PORT;

if(!port) {
    port = "3000";    
}

// db.$connect();
// say.speak("Dies ist ein Test")
console.log(say.getInstalledVoices(err => {if (err)console.log(err)}))


// command API
app.get('/api/command/commands', getCommands)
app.post('/api/command/create', createCommand)
app.put('/api/command/update', updateCommand)

app.get('/api/user/', getUserInfo)
app.get('/api/user/validate', validateToken)

app.listen(port, () => {
    console.log("App started")
})
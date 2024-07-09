"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatbot_1 = __importDefault(require("./clients/chatbot"));
const createCommand_1 = __importDefault(require("./command/usecases/createCommand/createCommand"));
const getCommands_1 = __importDefault(require("./command/usecases/getCommands/getCommands"));
const updateCommand_1 = __importDefault(require("./command/usecases/updateCommand/updateCommand"));
const deleteCommand_1 = __importDefault(require("./command/usecases/deleteCommand/deleteCommand"));
const getUserInfo_1 = __importDefault(require("./user/usecases/getUserInfo/getUserInfo"));
const validateToken_1 = __importDefault(require("./user/usecases/validate/validateToken"));
const addPoints_1 = __importDefault(require("./points/usecases/addPoints/addPoints"));
const createDailyIfNotExists_1 = __importDefault(require("./reward/daily/createDailyIfNotExists/createDailyIfNotExists"));
const helpers_1 = require("./reward/daily/helpers/helpers");
const getDaily_1 = __importDefault(require("./reward/daily/getDaily/getDaily"));
const say_1 = __importDefault(require("say"));
const claimDaily_1 = __importDefault(require("./reward/daily/claimDaily/claimDaily"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
let port = process.env.PORT;
if (!port) {
    port = "3000";
}
// db.$connect();
// say.speak("Dies ist ein Test")
console.log(say_1.default.getInstalledVoices(err => { if (err)
    console.log(err); }));
chatbot_1.default.create();
// add points interval
setInterval(() => {
    addPoints_1.default.addPointsMany(Array.from(chatbot_1.default.joinedUsernames), process.env.POINTSAMOUNT ? parseInt(process.env.POINTSAMOUNT) : 50);
}, process.env.POINTSINTERVAL ? parseInt(process.env.POINTSINTERVAL) : 5000 * 60);
startDailyCreateInterval();
// command API
app.get('/api/command/commands', getCommands_1.default);
app.post('/api/command/create', createCommand_1.default);
app.put('/api/command/update', updateCommand_1.default);
app.post('/api/command/delete', deleteCommand_1.default);
app.get('/api/user/', getUserInfo_1.default);
app.get('/api/user/validate', validateToken_1.default);
app.get('/api/reward/getDaily', getDaily_1.default);
app.post('/api/reward/claimDaily', claimDaily_1.default);
app.listen(port, () => {
    console.log("App started");
});
/**
 * Creates the last 7 dailys if they dont exists,
 * then starts a timeout to create the next daily at midnight,
 * and then starts an interval to create the dailys every day
 */
function startDailyCreateInterval() {
    (0, createDailyIfNotExists_1.default)();
    const midnight = new Date();
    midnight.setHours(24);
    midnight.setMinutes(0);
    midnight.setSeconds(0);
    midnight.setMilliseconds(0);
    const timeTilMidnight = midnight.getTime() - new Date().getTime();
    console.log('Starting Timeout til midnight:', timeTilMidnight);
    setTimeout(() => {
        (0, createDailyIfNotExists_1.default)();
        setInterval(() => {
            (0, createDailyIfNotExists_1.default)();
        }, helpers_1.dayTime);
    }, timeTilMidnight);
}

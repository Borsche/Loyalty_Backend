"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createCommand_1 = __importDefault(require("./command/usecases/createCommand/createCommand"));
const getCommands_1 = __importDefault(require("./command/usecases/getCommands/getCommands"));
const updateCommand_1 = __importDefault(require("./command/usecases/updateCommand/updateCommand"));
const deleteCommand_1 = __importDefault(require("./command/usecases/deleteCommand/deleteCommand"));
const getUserInfo_1 = __importDefault(require("./user/usecases/getUserInfo/getUserInfo"));
const validateToken_1 = __importDefault(require("./user/usecases/validate/validateToken"));
const say_1 = __importDefault(require("say"));
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
// command API
app.get('/api/command/commands', getCommands_1.default);
app.post('/api/command/create', createCommand_1.default);
app.put('/api/command/update', updateCommand_1.default);
app.post('/api/command/delete', deleteCommand_1.default);
app.get('/api/user/', getUserInfo_1.default);
app.get('/api/user/validate', validateToken_1.default);
app.listen(port, () => {
    console.log("App started");
});

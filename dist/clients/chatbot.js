"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tmi_js_1 = __importDefault(require("tmi.js"));
function create() {
    const client = new tmi_js_1.default.Client({
        channels: [process.env.CHANNEL],
    });
    client.connect();
    client.on('join', (channel, username, self) => {
        if (self || username.startsWith('justinfan')) // disable for bot and anonymous users
            return;
        // set user active
        console.log(channel, username, self);
    });
    client.on('part', (channel, username, self) => {
        if (self || username.startsWith('justinfan'))
            return;
        // set user inactive
        console.log(channel, username, self);
    });
    return client;
}
exports.default = {
    create
};

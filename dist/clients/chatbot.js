"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tmi_js_1 = __importDefault(require("tmi.js"));
const joinedUsernames = new Set();
function create() {
    const client = new tmi_js_1.default.Client({
        channels: [process.env.CHANNEL],
    });
    client.connect();
    client.on('join', (channel, username, self) => __awaiter(this, void 0, void 0, function* () {
        if (self || username.startsWith('justinfan')) // disable for bot and anonymous users
            return;
        // set user active
        // console.log(channel, username, self);
        if (!joinedUsernames.has(username)) {
            joinedUsernames.add(username);
        }
    }));
    client.on('part', (channel, username, self) => {
        if (self || username.startsWith('justinfan'))
            return;
        // set user inactive
        if (joinedUsernames.has(username)) {
            joinedUsernames.delete(username);
        }
    });
    return client;
}
exports.default = {
    create,
    joinedUsernames
};

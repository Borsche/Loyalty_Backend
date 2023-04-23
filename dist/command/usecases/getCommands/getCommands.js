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
const db_1 = __importDefault(require("../../../clients/db"));
const validator_1 = __importDefault(require("../../../clients/validator"));
function getCommands(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.token;
        let commands;
        if (yield validator_1.default.isOwner(token)) {
            commands = yield db_1.default.commands.findMany();
        }
        else if (yield validator_1.default.isMod(token)) {
            commands = yield db_1.default.commands.findMany({
                where: {
                    access_scope: 'ALL',
                    OR: {
                        access_scope: 'MOD'
                    }
                }
            });
        }
        else {
            commands = yield db_1.default.commands.findMany({
                where: {
                    access_scope: 'ALL',
                }
            });
        }
        const commandsSortedByGame = {};
        // modify the list so everything is grouped by game
        commands.forEach(command => {
            const game = command.game;
            if (!commandsSortedByGame[game]) {
                commandsSortedByGame[game] = [command];
            }
            else {
                commandsSortedByGame[game].push(command);
            }
        });
        res.send(commandsSortedByGame);
    });
}
exports.default = getCommands;

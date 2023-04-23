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
function updateCommand(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.token;
        const isOwner = yield validator_1.default.isOwner(token);
        if (!isOwner) {
            res.status(401).end("You can't do that.");
        }
        const command = req.body;
        try {
            yield db_1.default.commands.update({
                where: {
                    id: command.id,
                },
                data: command,
            });
        }
        catch (e) {
            console.log(e);
            res.status(400).end();
        }
        res.send();
    });
}
exports.default = updateCommand;

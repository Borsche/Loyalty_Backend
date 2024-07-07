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
function handleAddPoints(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.token;
        if ((yield validator_1.default.getTokenOwner(token)) == '')
            return;
        res.send('ok');
    });
}
function addPoints(username, points) {
    const usernames = [username];
    addPointsMany(usernames, points);
}
function addPointsMany(usernames, points) {
    const usernamesToAdd = usernames.map(username => ({ username }));
    db_1.default.$transaction([
        db_1.default.user.createMany({
            skipDuplicates: true,
            data: usernamesToAdd
        }),
        db_1.default.user.updateMany({
            where: {
                username: {
                    in: usernames
                }
            },
            data: {
                points: {
                    increment: points
                }
            }
        })
    ]);
}
exports.default = {
    handleAddPoints,
    addPoints,
    addPointsMany,
};

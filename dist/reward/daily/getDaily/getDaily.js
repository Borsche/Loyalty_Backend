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
const helpers_1 = require("../helpers/helpers");
function getDaily(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.token;
        const username = yield validator_1.default.getTokenOwner(token);
        if (username == '') {
            res.status(401).end("You can't do that.");
            return;
        }
        const dates = (0, helpers_1.getWeekDatesNormalize)();
        const response = yield db_1.default.daily.findMany({
            where: {
                date: {
                    in: dates
                },
            },
            include: {
                users: {
                    where: {
                        username: username.toLowerCase()
                    }
                }
            }
        });
        res.send(response);
    });
}
exports.default = getDaily;

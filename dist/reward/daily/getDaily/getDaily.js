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
function getDaily(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.token;
        if ((yield validator_1.default.getTokenOwner(token)) == '') {
            res.status(401).end("You can't do that.");
            return;
        }
        let minimumDate = new Date();
        minimumDate.setDate(minimumDate.getDate() - 3);
        let maximumDate = new Date();
        maximumDate.setDate(maximumDate.getDate() + 3);
        const response = yield db_1.default.daily.findMany({
            where: {
                date: {
                    lte: new Date(maximumDate),
                    gte: new Date(minimumDate)
                }
            },
            orderBy: {
                date: 'desc',
            }
        });
        res.send(response);
    });
}
exports.default = getDaily;

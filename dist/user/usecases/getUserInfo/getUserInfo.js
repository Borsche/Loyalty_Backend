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
const axios_1 = __importDefault(require("axios"));
const db_1 = __importDefault(require("../../../clients/db"));
const client_1 = require("@prisma/client");
function getUserInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.token;
        const headers = {
            Authorization: "Bearer " + token,
            ContentType: "application/json",
        };
        const response = (yield axios_1.default.get("https://id.twitch.tv/oauth2/userinfo", { headers }));
        const data = yield response.data;
        const userInfo = {
            username: data.preferred_username,
            picture: data.picture,
            points: 0,
            role: client_1.Role.USER
        };
        const user = yield db_1.default.user.findUnique({
            where: {
                username: userInfo.username.toLocaleLowerCase(),
            },
            select: {
                points: true,
                role: true,
            }
        });
        res.send(Object.assign(Object.assign({}, userInfo), user));
    });
}
exports.default = getUserInfo;

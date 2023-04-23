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
const twitchAPIUrl = "https://api.twitch.tv/helix/users";
const botClientId = process.env.CLIENT_ID;
const channelOwner = process.env.CHANNEL;
function getTokenOwner(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = {
            "Authorization": "Bearer " + token,
            "Client-Id": botClientId,
        };
        let username = '';
        try {
            const { data } = yield axios_1.default.get(twitchAPIUrl, { headers });
            username = data.data[0].display_name;
        }
        catch (e) {
            console.log("An error occured while retrieving the token owner");
        }
        finally {
            return username;
        }
    });
}
function isOwner(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenOwner = yield getTokenOwner(token);
        return ((channelOwner === null || channelOwner === void 0 ? void 0 : channelOwner.toLowerCase()) === tokenOwner.toLowerCase());
    });
}
function isMod(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return false;
    });
}
exports.default = {
    getTokenOwner,
    isOwner,
    isMod,
};

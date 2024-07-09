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
const client_1 = require("@prisma/client");
const helpers_1 = require("../helpers/helpers");
const db_1 = __importDefault(require("../../../clients/db"));
function createDailyIfNotExists() {
    return __awaiter(this, void 0, void 0, function* () {
        const dates = (0, helpers_1.getWeekDatesNormalize)();
        const transaction = [];
        dates.forEach(date => {
            const reward = getRandomReward();
            const amount = getAmountByReward(reward);
            transaction.push(db_1.default.daily.upsert({
                where: {
                    date
                },
                update: {},
                create: {
                    date,
                    reward,
                    amount,
                }
            }));
        });
    });
}
function getRandomReward() {
    const percentages = {
        5: client_1.Reward.SPIN,
        15: client_1.Reward.SCRATCH,
        100: client_1.Reward.POINTS,
    };
    const percentage = Math.random() * 100;
    for (const [key, value] of Object.entries(percentages)) {
        if (percentage < parseInt(key))
            return value;
    }
    return percentages[100];
}
function getAmountByReward(reward) {
    const amountsMap = new Map([
        [client_1.Reward.SPIN, [1]],
        [client_1.Reward.SCRATCH, [1, 2, 3]],
        [client_1.Reward.POINTS, [50, 100, 150]],
    ]);
    const rewardAmounts = amountsMap.get(reward);
    if (!rewardAmounts)
        return 1;
    const index = Math.floor(Math.random() * rewardAmounts.length);
    return rewardAmounts[index];
}
exports.default = createDailyIfNotExists;

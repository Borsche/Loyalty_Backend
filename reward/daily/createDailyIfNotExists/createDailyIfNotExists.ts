import { Reward } from '@prisma/client';
import { getWeekDatesNormalize } from '../helpers/helpers';
import db from '../../../clients/db';


async function createDailyIfNotExists() {

    const dates = getWeekDatesNormalize();

    const transaction: any[] = []
    dates.forEach(date => {
        const reward = getRandomReward();
        const amount = getAmountByReward(reward);

        transaction.push(db.daily.upsert({
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
    })
}


function getRandomReward() {
    const percentages = {
        5: Reward.SPIN,
        15: Reward.SCRATCH,
        100: Reward.POINTS,
    }

    const percentage = Math.random() * 100;

    for(const [key, value] of Object.entries(percentages)) {
        if(percentage < parseInt(key)) return value 
    }

    return percentages[100];
}

function getAmountByReward(reward: Reward) {
    const amountsMap = new Map([
        [Reward.SPIN, [1]],
        [Reward.SCRATCH, [1,2,3]],
        [Reward.POINTS, [50,100,150]],
    ])

    const rewardAmounts = amountsMap.get(reward);

    if(!rewardAmounts) return 1;

    const index = Math.floor(Math.random() * rewardAmounts.length);
    return rewardAmounts[index];
}

export default createDailyIfNotExists;
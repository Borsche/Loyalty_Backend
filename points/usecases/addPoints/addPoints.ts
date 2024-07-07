import { Request, Response } from 'express';
import db from '../../../clients/db';
import validator from '../../../clients/validator';

async function handleAddPoints(req: Request, res: Response)  {
    const token = req.headers.token as string

    if(await validator.getTokenOwner(token) == '') return;

    res.send('ok');
}

function addPoints(username: string, points: number) {
    const usernames = [username];
    addPointsMany(usernames, points);
}

function addPointsMany(usernames: string[], points: number) {
    const usernamesToAdd = usernames.map(username => ({ username }));

    db.$transaction([
        db.user.createMany({
            skipDuplicates: true,
            data: usernamesToAdd
        }),

        db.user.updateMany({
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

export default { 
    handleAddPoints,
    addPoints,
    addPointsMany,
}
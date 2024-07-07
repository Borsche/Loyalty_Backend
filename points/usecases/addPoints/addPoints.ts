import { Request, Response } from 'express';
import db from '../../../clients/db';
import validator from '../../../clients/validator';

async function handleAddPoints(req: Request, res: Response)  {
    const token = req.headers.token as string

    if(await validator.getTokenOwner(token) == '') return;

    res.send('ok');
}

function addPoints(username: string, points: number) {
    db.watchers.update({
        where: { name: username },
        data: {
            points: {
                increment: points
            }
        }
    })
}

function addPointsMany(username: string[], points: number) {

}

export default { 
    handleAddPoints,
    addPoints
}
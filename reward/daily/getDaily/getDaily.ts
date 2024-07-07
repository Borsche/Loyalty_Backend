import { Request, Response, NextFunction, RequestHandler } from 'express';
import db from '../../../clients/db';
import validator from '../../../clients/validator';

async function getDaily(req: Request, res: Response) {
    const token = req.headers.token as string

    if(await validator.getTokenOwner(token) == '') { 
        res.status(401).end("You can't do that.");
        return;
    }

    let minimumDate = new Date(); 
    minimumDate.setDate(minimumDate.getDate() - 3);

    let maximumDate = new Date();
    maximumDate.setDate(maximumDate.getDate() + 3);

    const response = await db.daily.findMany({
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

    res.send(response)
}

export default getDaily
import { Request, Response, NextFunction, RequestHandler } from 'express';
import db from '../../../clients/db';
import validator from '../../../clients/validator';
import { getWeekDatesNormalize } from '../helpers/helpers';

async function getDaily(req: Request, res: Response) {
    const token = req.headers.token as string

    const username = await validator.getTokenOwner(token);
    if(username == '') { 
        res.status(401).end("You can't do that.");
        return;
    }

    const dates = getWeekDatesNormalize();

    const response = await db.daily.findMany({
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
    })

    res.send(response)
}

export default getDaily
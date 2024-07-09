import { Request, Response, NextFunction, RequestHandler } from 'express';
import db from '../../../clients/db';
import validator from '../../../clients/validator';
import { getDMYDate } from '../helpers/helpers';

async function claimDaily(req: Request, res: Response) {
    const token = req.headers.token as string

    const username = await validator.getTokenOwner(token);
    if(username == '') { 
        res.status(401).end("You can't do that.");
        return;
    }

    const todayNormalize = getDMYDate(new Date());

    // https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/many-to-many-relations#implicit-many-to-many-relations
    const response = await db.user.update({
        where: {
            username: username.toLowerCase()
        },
        data: {
            dailys: {
                connect: {
                    date: todayNormalize
                }
            }
        }
    })

    res.send(response)
}

export default claimDaily
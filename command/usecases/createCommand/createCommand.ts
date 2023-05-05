import { Request, Response, NextFunction, RequestHandler } from 'express';
import db from '../../../clients/db';
import validator from '../../../clients/validator';

async function createCommand(req: Request, res: Response) {
    const token = req.headers.token as string

    const isOwner = await validator.isOwner(token)
    if(!isOwner) {
        res.status(401).end("You can't do that.")
    }

    const command = req.body

    const response = await db.commands.create({
        data: command
    })

    res.send(response)
}

export default createCommand
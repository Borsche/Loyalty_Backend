import { Request, Response } from 'express';
import db from '../../../clients/db';
import validator from '../../../clients/validator';

async function updateCommand(req: Request, res: Response) {
    const token = req.headers.token as string

    const isOwner = await validator.isOwner(token)
    if(!isOwner) {
        res.status(401).end("You can't do that.")
    }

    const command = req.body

    try {
        await db.command.update({
            where: {
                id: command.id,
            },
            data: command,
        })
    } catch(e) {
        console.log(e)
        res.status(400).end()
    }

    res.send()
}

export default updateCommand
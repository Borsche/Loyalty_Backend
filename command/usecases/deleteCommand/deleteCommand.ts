import { Request, Response } from 'express';
import db from '../../../clients/db';
import validator from '../../../clients/validator';

async function deleteCommand(req: Request, res: Response) {
    const token = req.headers.token as string

    const isOwner = await validator.isOwner(token)
    if(!isOwner) {
        res.status(401).end("You can't do that.")
    }

    const { id } = req.body

    try {
        await db.commands.delete({
            where: {
                id: id,
            }
        })
    } catch(e) {
        console.log(e)
    }

    res.send()
}

export default deleteCommand
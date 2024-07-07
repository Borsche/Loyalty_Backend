import { Request, Response } from 'express';
import db from '../../../clients/db';
import validator from '../../../clients/validator';

async function getCommands(req: Request, res: Response)  {
    const token = req.headers.token as string

    let commands;

    if(await validator.isOwner(token)) {
        commands = await db.command.findMany()         
    } else if(await validator.isMod(token)) {
        commands = await db.command.findMany({
            where: {
                accessScope: {
                    in: ['ALL', 'MOD']
                }
            }
        })
    } else {
        commands = await db.command.findMany({
            where: {
                accessScope: 'ALL',
            }
        })
    }

    const commandsSortedByGame: { [key: string]: any} = {}

    // modify the list so everything is grouped by game
    commands.forEach(command => {
        const game = command.game as string
        if(!commandsSortedByGame[game]) {
            commandsSortedByGame[game] = [command]
        } else {
            commandsSortedByGame[game].push(command)
        }
    })

    res.send(commandsSortedByGame)
}

export default getCommands
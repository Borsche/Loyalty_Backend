import { Request, Response } from 'express';
import axios from 'axios';

async function validateToken(req: Request, res: Response) {
    const token = req.headers.token as string

    const headers = {
        Authorization: "Bearer " + token,
        ContentType: "application/json",
    };

    try {
        const response = await axios.get("https://id.twitch.tv/oauth2/validate", {headers})
        res.send('ok');
    } catch {
        res.sendStatus(400)
    }
}

export default validateToken
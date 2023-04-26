import { Request, Response } from 'express';
import UserInfo from './UserInfo';
import axios from 'axios';

async function getUserInfo(req: Request, res: Response) {
    const token = req.headers.token as string

    const headers = {
        Authorization: "Bearer " + token,
        ContentType: "application/json",
    };

    const response = (await axios.get("https://id.twitch.tv/oauth2/userinfo", {headers}))
    const userInfo: UserInfo = {
        username: response.data.preferred_username,
        picture: response.data.picture,
        points: 0,
        role: 'OWNER'
    }

    res.send(userInfo)
}

export default getUserInfo
import axios from "axios";
import { AxiosError } from "axios";

const twitchAPIUrl = "https://api.twitch.tv/helix/users"
const botClientId = process.env.CLIENT_ID
const channelOwner = process.env.CHANNEL

async function getTokenOwner(token: string): Promise<string> {
    const headers = {
        "Authorization": "Bearer " + token,
        "Client-Id": botClientId,
    }

    let username: string = ''

    try {
        const { data } = await axios.get(twitchAPIUrl, { headers })
        username = data.data[0].display_name;
    } catch (e) {
        console.log("An error occured while retrieving the token owner")
    } finally {
        return username
    }
}

async function isOwner(token: string) {
    const tokenOwner = await getTokenOwner(token)
    return (channelOwner?.toLowerCase() === tokenOwner.toLowerCase())
}

async function isMod(token: string) {
    return false
}

export default {
    getTokenOwner,
    isOwner,
    isMod,
}
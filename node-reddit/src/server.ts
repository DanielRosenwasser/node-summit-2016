import * as express from "express";

import { httpRequest, readFile } from "./promisified-io";
import * as reddit from "./reddit";

const staticDir = __dirname + "/../../react-reddit";

async function getRedditFeed(subreddit: string) {
    let resultJsonStr = await getRedditJson(subreddit, /*offline*/ false)
    let result = JSON.parse(resultJsonStr) as reddit.ApiResponse;

    // Only return submissions that link to jpgs and pngs.
    result.data.children = result.data.children.filter(sub => sub.data.url.match(/(jpg|png)$/));
    return result;
}

function getRedditJson(subreddit: string, offline: boolean) {
    if (offline) {
        return readFile(`${staticDir}/data/${subreddit}.json`);
    }
    return httpRequest(`http://reddit.com/r/${subreddit}.json`);
}

const app = express();

app.get("/r/:subreddit.json", async (req, res) => {
    try {
        let body = await getRedditFeed(req.params.subreddit);
        res.setHeader("Content-Type", "application/json");
        res.send(body);
    }
    catch (err) {
        console.error(err);
    }
});

app.use("/", express.static(staticDir));

const server = app.listen(8000, () => {
    console.log("Server listening on port 8000");
});


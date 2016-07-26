import * as express from "express";

import { httpRequest } from "./promisified-io";
import * as reddit from "./reddit";

async function getRedditFeed(subreddit: string) {
    let resultStr = await httpRequest(`http://reddit.com/r/${subreddit}.json`);
    let result = JSON.parse(resultStr) as reddit.ApiResponse;

    // Only return submissions that link to jpgs and pngs.
    result.data.children = result.data.children.filter(sub => sub.data.url.match(/(jpg|png)$/));
    return result;
}

const app = express();

app.get("/r/:subreddit.json", async (req, res) => {
    try {
        let body = await getRedditFeed(req.params.subreddit)
        res.setHeader("Content-Type", "application/json");
        res.send(body);
    }
    catch (err) {
        console.error(err);
    }
});

app.use("/", express.static(__dirname + "/../../react-reddit"));

const server = app.listen(8000, () => {
    console.log("Server listening on port 8000");
});


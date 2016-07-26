import * as $ from "jquery";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { ApiResponse } from "./reddit";
import { SubmissionComponent } from "./RedditSubmission"

function displaySubreddit(baseUrl: string, subreddit: string) {
    let settings = {
        url: `${baseUrl}/r/${subreddit}.json`
    };

    $.ajax(settings).done(response => {
        let submissions = (response as ApiResponse).data.children;
        let components = submissions.map((value, index) =>
            <SubmissionComponent key={index} elementPosition={index} {...value.data} />
        );

        ReactDOM.render(<div>{components}</div>, document.getElementById("content"));
    });
}

displaySubreddit(".", "puppies");

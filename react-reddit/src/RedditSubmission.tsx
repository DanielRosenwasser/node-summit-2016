import * as React from "react";
import { Submission } from "./reddit"

export interface SubmissionProps extends Submission {
    elementPosition: number;
}

let submissionStyle = { fontFamily: "sans-serif" };
let titleStyle = { fontSize: "1.2rem"};
let imageStyle = {
    maxWidth: "600px",
    maxHeight: "600px",
};

export const SubmissionComponent = (submission: SubmissionProps) =>
    <div style={submissionStyle}>
        {submission.elementPosition ? <br /> : ""}
        <span style={titleStyle}>
            <span>{submission.elementPosition + 1}. </span>
            <a href={submission.url}>{submission.title}</a>
        </span>
        <span> ({submission.domain})</span>
        <div>
            Submitted at {new Date(submission.created_utc).toLocaleTimeString()}.
        </div>
    </div>;
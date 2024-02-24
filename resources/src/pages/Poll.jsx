import React from "react";
import PollCard from "../components/Polling";
export default function Poll() {
    const exPoll = {
        title: "Favorite Color Poll",
        description: "Choose your favorite color from the options below.",
        deadline: "2024-03-01",
        choices: ["Red", "Blue", "Green"],
    };
    return (
        <>
            <div className="flex justify-center gap-2">
<PollCard/>
            </div>
        </>
    );
}

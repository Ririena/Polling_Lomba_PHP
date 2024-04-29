import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PollVoteFinal = () => {
    const [pollStats, setPollStats] = useState(null);
    const { pollId } = useParams();

    useEffect(() => {
        const fetchPollStats = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8004/api/poll/statistik/${pollId}`
                );
                setPollStats(response.data);
            } catch (error) {
                console.error(
                    "There was a problem fetching poll stats:",
                    error
                );
            }
        };

        fetchPollStats();
    }, [pollId]);

    return (
        <div>
            <h1>Poll Vote Final</h1>
            {pollStats ? (
                <div>
                    <h2>Poll ID: {pollId}</h2>
                    <h3>Poll Stats:</h3>
                    <ul>
                        {Object.entries(pollStats.poll_stats).map(
                            ([division, choices]) => (
                                <li key={division}>
                                    {division}:
                                    <ul>
                                        {Object.entries(choices).map(
                                            ([choice, count]) => (
                                                <li key={choice}>
                                                    {choice}: {count}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </li>
                            )
                        )}
                    </ul>
                    <h3>Final Stats:</h3>
                    <ul>
                        {Object.entries(pollStats.final_stats).map(
                            ([choice, percentage]) => (
                                <li key={choice}>
                                    {choice}: {percentage}
                                </li>
                            )
                        )}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PollVoteFinal;

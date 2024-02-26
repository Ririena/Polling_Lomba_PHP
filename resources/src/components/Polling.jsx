import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserStore } from "../Context/UserContext";
const Polling = () => {
    const [polls, setPolls] = useState([]);
    const [selectedChoices, setSelectedChoices] = useState({});
    const [user, SetUser] = useContext(UserStore);

    console.log(user.user);
    const [isAdmin, setIsAdmin] = useState(user.user.role === "admin");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8004/api/poll"
                );
                setPolls(response.data);
            } catch (error) {
                console.error("There was a problem fetching the polls:", error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (pollId) => {
        try {
            await axios.delete(`http://localhost:8004/api/poll/${pollId}`);
            setPolls(polls.filter((poll) => poll.id !== pollId));
        } catch (error) {
            console.error("There was a problem deleting the poll:", error);
        }
    };

    const handleChoiceChange = (pollId, choiceId) => {
        setSelectedChoices({ ...selectedChoices, [pollId]: choiceId });
    };

    const handleSubmit = async (pollId) => {
        try {
            const response = await axios.post(
                `http://localhost:8004/api/poll/${pollId}/vote/${selectedChoices[pollId]}`
            );
            console.log(response.data.message);
        } catch (error) {
            console.error("There was a problem submitting the choice:", error);
        }
    };

    return (
        <div>
            <h1>Poll List</h1>
            {polls.map((poll) => (
                <div
                    key={poll.id}
                    className="border border-gray-300 rounded-lg p-4 mb-4"
                >
                    <h2 className="text-xl font-bold mb-2">{poll.title}</h2>
                    <p className="text-sm text-gray-600 mb-2">
                        {poll.description}
                    </p>
                    <div className="mb-2">
                        <span className="inline-block bg-blue-500 text-white text-xs py-1 px-2 rounded-md mb-2">
                            Deadline: {poll.deadline}
                        </span>
                    </div>
                    <div className="mb-2">
                        <p className="text-md font-bold mb-1">Choices:</p>
                        {poll.choices &&
                            poll.choices.map((choice) => (
                                <div
                                    key={choice.id}
                                    className="flex items-center mb-1"
                                >
                                    <input
                                        type="radio"
                                        name={`choice_${poll.id}`}
                                        id={`choice_${choice.id}`}
                                        value={choice.id}
                                        onChange={() =>
                                            handleChoiceChange(
                                                poll.id,
                                                choice.id
                                            )
                                        }
                                    />
                                    <label
                                        htmlFor={`choice_${choice.id}`}
                                        className="text-sm ml-2"
                                    >
                                        {choice.choice}
                                    </label>
                                </div>
                            ))}
                    </div>
                    <button
                        onClick={() => handleSubmit(poll.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
                    >
                        Submit Choice
                    </button>
                    {isAdmin && (
                        <button
                            onClick={() => handleDelete(poll.id)}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                        >
                            Delete Poll
                        </button>
                    )}
                    <p className="text-sm text-gray-600">
                        Created at: {poll.created_at}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Polling;

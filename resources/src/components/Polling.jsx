import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Polling = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8004/api/poll');
        setPolls(response.data);
      } catch (error) {
        console.error('There was a problem fetching the polls:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Poll List</h1>
      {polls.map((poll) => (
        <div key={poll.id} className="border border-gray-300 rounded-lg p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">{poll.title}</h2>
          <p className="text-sm text-gray-600 mb-2">{poll.description}</p>
          <div className="mb-2">
            <span className="inline-block bg-blue-500 text-white text-xs py-1 px-2 rounded-md mb-2">
              Deadline: {poll.deadline}
            </span>
          </div>
          <div className="mb-2">
            <p className="text-md font-bold mb-1">Choices:</p>
            {poll.choices && poll.choices.map((choice, index) => (
              <div key={index} className="flex items-center mb-1">
                <span className="text-sm mr-2">{index + 1}.</span>
                <span className="text-sm">{choice.choice}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600">Created at: {poll.created_at}</p>
        </div>
      ))}
    </div>
  );
};

export default Polling;

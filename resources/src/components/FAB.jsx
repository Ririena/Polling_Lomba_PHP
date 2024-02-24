import React, { useState } from 'react';
import { Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Flex, Text } from "@chakra-ui/react";

const Fab = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date().toISOString());
  const [choices, setChoices] = useState(['']);

  const addChoice = () => {
    setChoices([...choices, '']);
  };

  const removeChoice = (index) => {
    if (choices.length === 1) return;
    const newChoices = [...choices];
    newChoices.splice(index, 1);
    setChoices(newChoices);
  };

  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const handleCreatePoll = () => {

    console.log('Polling Data:', { title, description, deadline, choices });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Polling</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Title"
            mb="2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Description"
            mb="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="datetime-local"
            mb="2"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <Text mb="2">Choices:</Text>
          {choices.map((choice, index) => (
            <Flex key={index} mb="2">
              <Input
                value={choice}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
              />
              <Button colorScheme="red" size="sm" ml="2" onClick={() => removeChoice(index)}>Delete</Button>
            </Flex>
          ))}
          <Button colorScheme="blue" size="sm" onClick={addChoice}>Add Choice</Button>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="green" onClick={handleCreatePoll}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Fab

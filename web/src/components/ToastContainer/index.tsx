import React from 'react';
import { Container } from './styles';
import { ToastMessages } from '../../hooks/ToastContext';
import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessages[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map(message => (
        <Toast key={message.id} message={message}></Toast>
      ))}
    </Container>
  );
};

export default ToastContainer;

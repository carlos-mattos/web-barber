import React, { createContext, useCallback, useContext, useState } from 'react';
import ToastContainer from '../components/ToastContainer';
import { uuid } from 'uuidv4';

interface ToastContextData {
  addToast: (message: Omit<ToastMessages, 'id'>) => void;
  removeToast: (id: string) => void;
}

export interface ToastMessages {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessages[]>([]);

  const addToast = useCallback(
    ({ description, title, type }: Omit<ToastMessages, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        description,
        title,
        type,
      };

      setMessages([...messages, toast]);
    },
    [messages]
  );

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer messages={messages} />
      {children}
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

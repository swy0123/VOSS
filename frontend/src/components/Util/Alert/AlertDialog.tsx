import { useState } from 'react';
import AlertContext from '/src/context/alert/AlertContext';
import Alert from './Alert';

type AlertState = {
  message: string;
  onClose: () => void;
};

const AlertDialog = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AlertState>();

  const alert = (message?: any): Promise<undefined> => {
    return new Promise((resolve) => {
      setState({
        message: message !== undefined ? `${message}` : '',
        onClose: () => {
          setState(undefined);
          resolve(undefined);
        },
      });
    });
  };

  return (
    <AlertContext.Provider value={{ alert }}>
      {children}
      {state && <Alert message={state.message} onClose={state.onClose} />}
    </AlertContext.Provider>
  );
};

export default AlertDialog;

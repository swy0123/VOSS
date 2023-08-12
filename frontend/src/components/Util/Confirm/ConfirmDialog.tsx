import { useState } from 'react';
import Confirm from './Confirm';
import ConfirmContext from '/src/context/confirm/ConfirmContext';

type ConfirmState = {
  message: string;
  onClickOK: () => void;
  onClickCancel: () => void;
};

const ConfirmDialog = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<ConfirmState>();

  const confirm = (message?: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        message: message ?? '',
        onClickOK: () => {
          setState(undefined);
          resolve(true);
        },
        onClickCancel: () => {
          setState(undefined);
          resolve(false);
        },
      });
    });
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {state && (
        <Confirm
          message={state.message}
          onClickOK={state.onClickOK}
          onClickCancel={state.onClickCancel}
        />
      )}
    </ConfirmContext.Provider>
  );
};

export default ConfirmDialog;

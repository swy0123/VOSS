import { useState } from 'react';
import PromptContext from '/src/context/prompt/PromptContext';
import Prompt from './Prompt';

type PromptState = {
  message: string;
  _default: string;
  onClickOK: (result: string) => void;
  onClickCancel: () => void;
};

const PromptDialog = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<PromptState>();

  const prompt = (
    message?: string,
    _default?: string
  ): Promise<string | null> => {
    return new Promise((resolve) => {
      setState({
        message: message ?? '',
        _default: _default ?? '',
        onClickOK: (result: string) => {
          setState(undefined);
          resolve(result);
        },
        onClickCancel: () => {
          setState(undefined);
          resolve(null);
        },
      });
    });
  };

  return (
    <PromptContext.Provider value={{ prompt }}>
      {children}
      {state && (
        <Prompt
          message={state.message}
          _default={state._default}
          onClickOK={state.onClickOK}
          onClickCancel={state.onClickCancel}
        />
      )}
    </PromptContext.Provider>
  );
};

export default PromptDialog;

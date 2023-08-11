import { createContext } from 'react';

type Type = {
  confirm: (message?: string) => Promise<boolean>;
};

const ConfirmContext = createContext<Type>({
  confirm: () => new Promise((_, reject) => reject()),
});

export default ConfirmContext;

import { useEffect } from 'react';
import { DialogContainer } from '../Util.style';

interface Props {
  message: string;
  onClickOK: () => void;
  onClickCancel: () => void;
}

const Confirm = ({ message, onClickOK, onClickCancel }: Props) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClickCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClickCancel]);

  return (
    <DialogContainer>
      <div className="overlay" onClickCapture={(e) => e.stopPropagation()} />
      <div className="dialog">
        <h2 className="title">VOSS</h2>
        <div className="text">{message}</div>
        <div className="buttons">
          <button onClick={onClickCancel}>cancel</button>
          <button onClick={onClickOK} autoFocus>
            ok
          </button>
        </div>
      </div>
    </DialogContainer>
  );
};

export default Confirm;

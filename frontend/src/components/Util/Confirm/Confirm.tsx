import { useEffect } from 'react';

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
    <div className="dialog-container">
      <div className="overlay" onClickCapture={(e) => e.stopPropagation()} />
      <div className="dialog">
        <h2 className="title">Confirm</h2>
        <div className="text">{message}</div>
        <div className="buttons">
          <button onClick={onClickCancel}>cancel</button>
          <button onClick={onClickOK} autoFocus>
            ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;

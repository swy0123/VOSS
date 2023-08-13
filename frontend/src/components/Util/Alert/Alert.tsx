import { useEffect } from 'react';
import { DialogContainer } from '../Util.style';

interface Props {
  message: string;
  onClose: () => void;
}

const Alert = ({ message, onClose }: Props) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <DialogContainer>
      <div className="overlay" onClickCapture={(e) => e.stopPropagation()} />
      <div className="dialog">
        <h2 className="title">VOSS</h2>
        <div className="text">{message}</div>
        <div className="buttons">
          <button onClick={onClose} autoFocus>
            ok
          </button>
        </div>
      </div>
    </DialogContainer>
  );
};

export default Alert;

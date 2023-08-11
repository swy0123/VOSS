import { useEffect } from 'react';

interface Props {
  message: string;
  _default: string;
  onClickOK: (result: string) => void;
  onClickCancel: () => void;
}

const Prompt = ({ message, _default, onClickOK, onClickCancel }: Props) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClickCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClickCancel]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      input: { value: string };
    };
    onClickOK(target.input.value);
  };

  return (
    <div className="dialog-container">
      <div className="overlay" onClickCapture={(e) => e.stopPropagation()} />
      <form className="dialog" onSubmit={handleSubmit}>
        <h2 className="title">Prompt</h2>
        <div className="text">{message}</div>
        <input
          id="input"
          className="input"
          type="text"
          defaultValue={_default}
          autoFocus
        />
        <div className="buttons">
          <button onClick={onClickCancel} type="reset">
            cancel
          </button>
          <button type="submit">ok</button>
        </div>
      </form>
    </div>
  );
};

export default Prompt;

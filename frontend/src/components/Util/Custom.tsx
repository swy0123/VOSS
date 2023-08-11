import { useContext } from "react";
import AlertContext from "/src/context/alert/AlertContext";
import ConfirmContext from "/src/context/confirm/ConfirmContext";
import PromptContext from "/src/context/prompt/PromptContext";

const Custom = () => {
  const { alert: alertComp } = useContext(AlertContext);

  const onAlertClick = async () => {
    const result = await alertComp("hello world");
      console.log("custom", result);
  };

  const { confirm: confirmComp } = useContext(ConfirmContext);

  const onConfirmClick = async () => {
    const result = await confirmComp("are you sure?");
      console.log("custom", result);
  };

  const { prompt: promptComp } = useContext(PromptContext);

  const onPromptClick = async () => {
    const result = await promptComp("what is your name?");
      console.log("custom", result);
  };

  return (
    <main className="home">
      <h1>Home</h1>
      <p>Click the buttons below to see the dialogs</p>
      <div className="buttons">
        <button onClick={() => onAlertClick()}>alert (component)</button>
        <button onClick={() => onConfirmClick()}>confirm (component)</button>
        <button onClick={() => onPromptClick()}>prompt (component)</button>
      </div>
    </main>
  );
};

export default Custom;

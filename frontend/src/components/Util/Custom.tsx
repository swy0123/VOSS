import { useContext } from "react";
import AlertContext from "/src/context/alert/AlertContext";
import ConfirmContext from "/src/context/confirm/ConfirmContext";
import PromptContext from "/src/context/prompt/PromptContext";

const Custom = () => {
  const { alert: alertComp } = useContext(AlertContext);
  const onAlertClick = async (text:string) => {
    const result = await alertComp(text);
    console.log("custom", result);
  };

  const { confirm: confirmComp } = useContext(ConfirmContext);
  const onConfirmClick = async (text:string)  => {
    const result = await confirmComp(text);
      console.log("custom", result);
  };

  const { prompt: promptComp } = useContext(PromptContext);
  const onPromptClick = async (text:string) => {
    const result = await promptComp(text);
      console.log("custom", result);
  };

  return (
    <main className="home">
      <h1>Home</h1>
      <p>Click the buttons below to see the dialogs</p>
      <div className="buttons">
        <button onClick={() => onAlertClick("text")}>alert (component)</button>
        <button onClick={() => onConfirmClick("text")}>confirm (component)</button>
        <button onClick={() => onPromptClick("text")}>prompt (component)</button>
      </div>
    </main>
  );
};

export default Custom;

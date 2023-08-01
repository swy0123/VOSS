import SoundToText from "./SoundToText"
import { ResultBox, Text } from "./AccentResult.style"

function AccentResult () {
  const {
    text,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport,
  } = SoundToText()
  return (
    <ResultBox>
      {hasRecognitionSupport ? (
        <>
          <div>
            <button 
              onClick={startListening}>Start Listening</button>    
          </div>
          <div>
            <button 
              onClick={stopListening}>stop Listening</button>    
          </div>
          {/* {isListening ? <Text>{text}</Text> : <Text>발을 교정을 시작해보세요</Text>} */}
          <Text>{text}</Text>
        </>
      ) : (
        <h1> Your browser has no speech recognition support</h1>
      )}
    </ResultBox>
  )
}
export default AccentResult
import { useEffect, useState } from "react"
import { accentClickableState, accentSttState } from '/src/recoil/HW_Atom';
import { useRecoilState } from "recoil";

let recognition: any = null
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition()
  recognition.continuous = true
  recognition.lang = "ko-KR"
}

const SoundToText = () => {
  const [accentText, setAccentText] = useRecoilState(accentSttState)
  const [accentClickable, setaccentClickable] = useRecoilState<boolean>(accentClickableState);
  const [isListening, setIsListening] = useState(false)

  const startListening = () => {
    setAccentText("");
    setIsListening(true)
    recognition.start() 
  }

  const stopListening = () => {
    if(!recognition) return 
    setaccentClickable(false)
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      setAccentText(event.results[0][0].transcript)
      setIsListening(false)
      recognition.stop()
      setaccentClickable(true)
    }
  }

  return {
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !! recognition
  }
}

export default SoundToText

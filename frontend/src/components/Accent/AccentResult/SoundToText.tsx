import { useEffect, useState } from "react"

let recognition: any = null
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition()
  recognition.continuous = true
  recognition.lang = "ko-KR"
}

const SoundToText = () => {
  const [text, setText] = useState("")
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    if(!recognition) return 

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      console.log(event.results)
      setText(event.results[0][0].transcript)
      recognition.stop()
      setIsListening(false)
      setTimeout(()=> {
        recognition.start()
        setIsListening(true)
      },1000)
    }
  },[])

  const startListening = () => {
    setText("")
    setIsListening(true)
    recognition.start() 
  }

  const stopListening = () => {
    setText("")
    setIsListening(false)
    recognition.stop()
  }

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !! recognition
  }
}

export default SoundToText

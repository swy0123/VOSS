import { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import AlarmSection from "../Header/AlarmSection";

function Header() {
  const [AlarmIsShown, setAlarmIsshown] = useState<boolean>("") 
    
  useEffect(()=>{
    setTimeout(()=> {setAlarmIsshown(false)},200)
  },[])
  return (
    <header>
      <NavigationBar 
        AlarmIsShown={AlarmIsShown}
        setAlarmIsshown={setAlarmIsshown}
        />

      <AlarmSection 
        AlarmIsShown={AlarmIsShown}
        setAlarmIsshown={setAlarmIsshown}/>
    </header>
  );
}

export default Header;
import { useEffect, useState } from "react";
import MenuListBar from "./MenuListBar";
import NavigationBar from "./NavigationBar";
import AlarmSection from "./AlarmSection";

function Header() {
  const [MenuIsShown, setMenuIsShown] = useState(false)
  const [AlarmIsShown, setAlarmIsshown] = useState<boolean>("") 
    
  useEffect(()=>{
    setTimeout(()=> {setAlarmIsshown(false)},300)
  },[]) 

  return (
    <header>
      <NavigationBar 
        AlarmIsShown={AlarmIsShown}
        setMenuIsShown={setMenuIsShown}
        setAlarmIsshown={setAlarmIsshown}/>

      {MenuIsShown ? <MenuListBar setMenuIsShown={setMenuIsShown}/>: ""}
      
      <AlarmSection 
        AlarmIsShown={AlarmIsShown}
        setAlarmIsshown={setAlarmIsshown}/>
    </header>
  );
}

export default Header;
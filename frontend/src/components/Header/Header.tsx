import { useState } from "react";
import MenuListBar from "./MenuListBar";
import NavigationBar from "./NavigationBar";
import AlarmSection from "./AlarmSection";

function Header() {
  const [MenuIsShown, setMenuIsShown] = useState(false)
  const [AlarmIsShown, setAlarmIsshown] = useState(false) 

  return (
    <header>
      <NavigationBar 
        AlarmIsShown={AlarmIsShown}
        setMenuIsShown={setMenuIsShown}
        setAlarmIsshown={setAlarmIsshown}
        />
      {MenuIsShown ? <MenuListBar setMenuIsShown={setMenuIsShown}/>: ""}
      {AlarmIsShown ? <AlarmSection setAlarmIsshown={setAlarmIsshown}/> : ""}
    </header>
  );
}

export default Header;
import { useState } from "react";
import NavigationBar from "./NavigationBar";
import AlarmSection from "./AlarmSection";

function Header() {
  const [AlarmIsShown, setAlarmIsshown] = useState(false) 

  return (
    <header>
      <NavigationBar 
        AlarmIsShown={AlarmIsShown}
        setAlarmIsshown={setAlarmIsshown}
        />
      {AlarmIsShown ? 
        <AlarmSection
          setAlarmIsshown={setAlarmIsshown}/> : ""}
    </header>
  );
}

export default Header;
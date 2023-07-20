import { useState } from "react";
import MenuListBar from "./MenuListBar";
import NavigationBar from "./NavigationBar";

function Header() {
  const [MenuIsShown, setMenuIsShown] = useState(false)

  return (
    <header>
      <NavigationBar setMenuIsShown={setMenuIsShown}/>
      {MenuIsShown ? <MenuListBar setMenuIsShown={setMenuIsShown}/>: ""}
    </header>
  );
}

export default Header;
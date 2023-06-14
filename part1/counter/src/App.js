import { useState } from "react";
import Display from "./components/display";
import Button from "./components/Button";
import History from "./components/History";

const App = () => {
  const [clicks, setClicks] = useState({left: 0, right: 0,});
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setClicks({ ...clicks, left: clicks.left + 1 });
    
  };

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setClicks({ ...clicks, right: clicks.right + 1 });
  };

  return (
    <div>
      <Display clicks={clicks} />
      <Button onClick={handleLeftClick} text="left" />
      <Button onClick={handleRightClick} text="right" />
      <History allClicks={allClicks}/> 
   
    </div>
  );
};

export default App;

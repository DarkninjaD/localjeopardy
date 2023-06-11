import React, { useEffect, useState } from "react";
import GamePage from "./pages/gamePage/GamePage";
import importTSV from "./util/importTool";

// Change the line bellow to the name of your file, after you placed your file in it.
//@ts-ignore
import LIVEGAMEDATA from "./livegamedata/Q_and_A_CSV.tsv";

function App() {
  const [fullQuestionSet, setData] = useState<JeopardyCategoryQuestion[]>([]);
  let Use = "";
  // THIS IS ONLY TO MAKE SURE THE GAME DOESN'T BLOW UP IF NO FILE IS THERE
  if (LIVEGAMEDATA !== null) Use = LIVEGAMEDATA;
  useEffect(() => {
    importTSV(Use).then((fullQuestionSet) => {
      setData(fullQuestionSet);
    });
  }, [Use]);

  return <GamePage fullQuestionSet={fullQuestionSet} />;
}

export default App;

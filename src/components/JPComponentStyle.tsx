import styled from "styled-components";
import tw from "twin.macro";
import QuestionsCard from "./QuestionCard";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
//@ts-ignore
import jeopardy_double from "../assets/sounds/jeopardy_double.wav";

interface JPComponentProps {
  questionData: JeopardyQuestion;
  isDoubleJep?: boolean;
}

const JPComponent = (questionData: JPComponentProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [beenClicked, setHasBeenClicked] = useState(false);

  const playDoubleJep = () => {
    const player = new Audio(jeopardy_double);
    player.volume = 0.08;
    player.play();
  };

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const handleClicked = () => {
    if (questionData.isDoubleJep && !beenClicked) {
      playDoubleJep();
    }
    modalOpen ? close() : open();
    if (beenClicked === false) setHasBeenClicked(true);
  };

  return (
    <GameBroadTile>
      <GameBoardButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClicked}
        $hasBeenClicked={beenClicked}
      >
        $ {questionData.questionData.score}
        {questionData.isDoubleJep ? "here" : ""}
      </GameBoardButton>
      <AnimatePresence initial={false} mode="wait">
        {modalOpen && (
          <QuestionsCard
            question={questionData.questionData}
            handleClose={close}
            isDoubleJep={questionData.isDoubleJep}
          />
        )}
      </AnimatePresence>
    </GameBroadTile>
  );
};

const GameBroadTile = styled(motion.div)`
  ${tw`bg-black py-1 px-1 border border-black flex flex-col grow justify-center`}
`;

const GameBoardButton = styled(motion.button)<{ $hasBeenClicked?: boolean }>`
  ${tw`font-bold text-2xl py-2 px-4 border border-black rounded`}
  --tw-bg-opacity: 1;
  background-color: ${(props) =>
    props.$hasBeenClicked
      ? tw`bg-gray-700 text-gray-900 hover:bg-red-500 hover:text-gray-900`
      : tw`bg-blue-600 hover:bg-blue-500 hover:text-amber-500 text-amber-400`};
  text-shadow: 2px 2px 1px black;
  font-family: "Dollar_Bill";
`;

export default JPComponent;

import { Variants, motion } from "framer-motion";
import Backdrop from "./Backdrop";
import styled from "styled-components";
import tw from "twin.macro";
import { useRef, useState } from "react";
//@ts-ignore
import jeopardy_thinking from "../assets/sounds/jeopardy_thinking.wav";

interface QuestionsCardProps {
  question: JeopardyQuestion;
  handleClose: () => void;
  isDoubleJep?: boolean;
}

const QuestionsCard = ({
  question,
  handleClose,
  isDoubleJep,
}: QuestionsCardProps) => {
  const { questions, answer, score } = question;

  const player = useRef(new Audio(jeopardy_thinking));

  const [side, isFrontSide] = useState(true);
  const backFlip = () => isFrontSide(false);
  const frontFlip = () => isFrontSide(true);

  const [swap, isSwap] = useState(isDoubleJep);
  const swapIt = () => {
    swap ? isSwap(false) : isSwap(true);
    playThinkJep();
  };

  const playThinkJep = () => {
    player.current.volume = 0.04;
    player.current.play();
  };

  const stopThinkJep = () => {
    player.current.pause();
  };

  const flipIt = () => {
    side ? backFlip() : frontFlip();
  };

  const flipVariants = {
    front: { transition: { duration: 0.7 }, rotateY: 0 },
    back: { transition: { duration: 0.7 }, rotateY: 180 },
  };

  const dropIn: Variants = {
    hidden: {
      scale: 0,
    },
    visible: {
      transition: {
        duration: 0.5,
      },
      // rotate: 360,
      scale: 1,
    },
    exit: {
      scale: 0,
    },
  };

  const stopAll = () => {
    stopThinkJep();
    handleClose();
  };

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {swap ? (
          <QuestionsCardStyle>
            <>
              <Header>
                <Button onClick={stopAll}>X</Button>
              </Header>
              <Body>
                <QuestionDisplay>
                  EVERYONE GETS TO PLAY! PLACE YOUR BETS THIS WILL BE TIMED!
                </QuestionDisplay>
              </Body>
              <Tail>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button onClick={swapIt}> Show me what you got! </Button>
                </motion.div>
              </Tail>
            </>
          </QuestionsCardStyle>
        ) : (
          <div>
            <motion.div
              onClick={(e) => e.stopPropagation()}
              variants={flipVariants}
              animate={side ? "front" : "back"}
            >
              <QuestionsCardStyle>
                {side ? (
                  <>
                    <Header>
                      {!isDoubleJep ? (
                        <HeaderText>Amount: ${score}</HeaderText>
                      ) : (
                        <></>
                      )}
                      <Button onClick={stopAll}>X</Button>
                    </Header>
                    <Body>
                      <QuestionDisplay>{questions}</QuestionDisplay>
                    </Body>
                    <Tail>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button onClick={flipIt}> Show me the Answer </Button>
                      </motion.div>
                    </Tail>
                  </>
                ) : (
                  <BackSide>
                    <Header>
                      {!isDoubleJep ? (
                        <HeaderText>Amount: ${score}</HeaderText>
                      ) : (
                        <></>
                      )}
                      <Button onClick={stopAll}>X</Button>
                    </Header>
                    <Body>
                      <QuestionDisplay>{answer}</QuestionDisplay>
                    </Body>
                    <Tail>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button onClick={flipIt}> Show me the Question </Button>
                      </motion.div>
                    </Tail>
                  </BackSide>
                )}
              </QuestionsCardStyle>
            </motion.div>
          </div>
        )}
      </motion.div>
    </Backdrop>
  );
};

const QuestionsCardStyle = styled.div`
  ${tw`rounded shadow-lg bg-blue-600 flex justify-center content-center flex-col`}
  width: 70vw;
  height: 70vh;
`;

const BackSide = styled.div`
  transform: rotateY(180deg);
`;

const QuestionDisplay = styled.p`
  ${tw`font-bold text-2xl mb-2 text-white text-center text-7xl p-2`}
  font-family: "ITC_Korinna_Bold";
  text-shadow: 3px 3px 1px BLACK;
`;

const HeaderText = styled.p`
  ${tw`text-xl font-bold text-white`}
  font-family: "Dollar_Bill";
  text-shadow: 3px 3px 1px BLACK;
`;

const Header = styled.div`
  ${tw`flex flex-row content-evenly justify-between p-2`}
`;
const Body = styled.div`
  ${tw`flex-1 flex flex-row items-center justify-center`}
`;
const Tail = styled.div`
  ${tw`flex flex-row content-evenly justify-evenly p-2`}
`;

const Button = styled.button`
  ${tw`bg-blue-700 hover:bg-blue-500 hover:text-amber-500 text-amber-400 font-bold text-2xl py-2 px-4 border border-black rounded`}
  text-shadow: 2px 2px 1px black;
  font-family: "Dollar_Bill";
`;

export default QuestionsCard;

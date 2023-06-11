import styled from "styled-components";
import JPComponent from "../../components/JPComponentStyle";
import tw from "twin.macro";

interface GamePageProps {
  fullQuestionSet: JeopardyCategoryQuestion[];
}

const GamePage = (data: GamePageProps) => {
  const { fullQuestionSet } = data;

  const doubleJepCategory: number[] = [];
  doubleJepCategory.push(generateRandomNumber(0, fullQuestionSet.length - 1));
  doubleJepCategory.push(
    generateRandomNumber(0, fullQuestionSet.length - 1, doubleJepCategory[0])
  );

  console.log(doubleJepCategory);

  let doubleJepQuestion = -1;

  return (
    <GamePageStyle>
      {fullQuestionSet.map((categoryQuestionSet, index) => {
        if (index === doubleJepCategory[0] || index === doubleJepCategory[1]) {
          doubleJepQuestion = generateRandomNumber(0, 5);
        } else {
          doubleJepQuestion = -1;
        }
        return (
          <CategoryStyle>
            <h2>{categoryQuestionSet.category}</h2>
            {categoryQuestionSet.questions.map((question, index) => {
              return (
                <JPComponent
                  questionData={question}
                  isDoubleJep={index === doubleJepQuestion ? true : false}
                />
              );
            })}
          </CategoryStyle>
        );
      })}
    </GamePageStyle>
  );
};

const generateRandomNumber = (
  min: number,
  max: number,
  rerollValue?: number
) => {
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  let number = 0;

  console.log(rerollValue);
  if (rerollValue !== null) {
    while (randomNumber === rerollValue) {
      if (number > 100) break;
      // There is technically a very very very small chance that the random number will be the same as the reroll.
      // but at this point I accept it.
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      number++;
    }
  }

  return randomNumber;
};

const GamePageStyle = styled.div.attrs({
  className:
    "flex flex-row h-screen w-screen justify-between items-between bg-gray-700 p-4",
})`
  & {
    h2 {
      ${tw`flex flex-row justify-center items-center flex-1 text-center break-words bg-blue-700 text-white font-bold text-xl py-2 px-2 border border-black rounded`}
      text-shadow: 2px 2px 1px black;
      font-family: "Dollar_Bill";
    }
  }
`;

const CategoryStyle = styled.div`
  ${tw`flex flex-col grow`}
`;

export default GamePage;

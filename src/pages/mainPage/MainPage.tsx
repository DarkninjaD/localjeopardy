import styled from "styled-components";
import tw from "twin.macro";
import { motion } from "framer-motion";

const MainPage = () => {
  return (
    <MainPageStyle>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <button>Test</button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <button>Test</button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <button>Test</button>
      </motion.div>
    </MainPageStyle>
  );
};

const MainPageStyle = styled.div.attrs({
  className: "flex flex-col h-screen justify-center items-center bg-gray-600",
})`
  & {
    button {
      ${tw`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
    }
  }
`;

export default MainPage;

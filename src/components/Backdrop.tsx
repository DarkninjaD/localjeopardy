import { ReactNode } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";

interface BackdropProps {
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLElement>;
}
const Backdrop = ({ children, onClick }: BackdropProps) => {
  return (
    <BackdropStyle>
      <motion.div onClick={onClick}>{children}</motion.div>
    </BackdropStyle>
  );
};

const BackdropStyle = styled.div`
  ${tw`
    h-screen w-screen absolute top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center
  `}
`;

export default Backdrop;

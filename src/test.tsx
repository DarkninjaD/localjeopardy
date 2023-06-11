import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Test = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const handleShowCard = () => {
    setIsCardVisible(true);
  };

  const handleFlipCard = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  const flipVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  return (
    <div>
      <button onClick={handleShowCard}>Show Card</button>

      <AnimatePresence>
        {isCardVisible && (
          <motion.div
            className="card-container"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={cardVariants}
          >
            <motion.div
              className="card"
              onClick={handleFlipCard}
              variants={flipVariants}
              animate={isCardFlipped ? "back" : "front"}
            >
              {isCardFlipped ? (
                <div className="front">Front of Card</div>
              ) : (
                <div className="back">Back of Card</div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Test;

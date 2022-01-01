import { Body, OutlinedButton, PageTitle } from "..";
import { motion } from "framer-motion";
export const HomeDescription = ({
  title,
  description,
  buttonContent,
  x = 0,
  y = 0,
}) => {
  return (
    <motion.div
      className="relative flex md:block flex-col items-center z-20 w-full md:w-1/2 h-full"
      initial={{
        opacity: 0,
        x,
        y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.25,
          ease: [0.85, 0, 0.15, 1],
        },
      }}
    >
      <PageTitle>{title}</PageTitle>
      <div className="my-6" />
      <Body>{description}</Body>
      <div className="my-6" />
      <OutlinedButton title={buttonContent} />
    </motion.div>
  );
};

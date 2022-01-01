import { motion } from "framer-motion";

export const HomeImage = ({ img, title, x = 0, y = 0 }) => {
  return (
    <motion.div
      className="z-20 w-1/2 h-fit"
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
          ease: [0.85, 0, 0.15, 1],
        },
      }}
    >
      <img src={img} className="w-full" alt={title} />
    </motion.div>
  );
};

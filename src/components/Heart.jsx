import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Heart = ({ containerConstraint = null, className }) => {
  let heart = useRef(null);

  const [dragConstraints, setDragConstraints] = useState(null);
  useEffect(() => {
    let containerWidth = containerConstraint.current.clientWidth,
      containerHeight = containerConstraint.current.clientHeight,
      heartHeight = heart.current.clientHeight,
      heartWidth = heart.current.clientWidth;

    setDragConstraints({ top: 0, left: 0, bottom: containerHeight - heartHeight, right: containerWidth - heartWidth });

    // ! limitations: maapektohan ang result if mag resize sa window.
    return () => {};
  }, [containerConstraint]);

  return (
    <motion.svg
      className={`h-fit max-w-40 ${className}`}
      ref={heart}
      drag
      whileDrag={{ scale: 0.9 }}
      dragConstraints={dragConstraints}
      style={{ touchAction: 'none' }}
      initial={{ scale: 1 }}
      animate={{
        scale: [1, 1.1, 1.2, 1],
        transition: {
          repeat: Infinity,
          duration: 1,
          repeatDelay: 1,
          times: [0, 0.2, 0.3, 1],
          delay: 0.5,
        },
      }}
      layout
      width="317"
      height="273"
      viewBox="0 0 317 273"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 92.6602C0 169.658 63.65 210.682 110.232 247.415C126.667 260.367 142.5 272.574 158.333 272.574C174.167 272.574 190 260.383 206.435 247.399C253.032 210.698 316.667 169.658 316.667 92.6761C316.667 15.6944 229.583 -38.9464 158.333 35.0902C87.0833 -38.9464 0 15.6627 0 92.6602Z"
        fill="#995F7E"
      />
    </motion.svg>
  );
};

export default Heart;

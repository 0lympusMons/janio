/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
const Heart = React.memo(
  forwardRef((props, ref) => {
    let heart = useRef(null);

    // const [dragConstraints, setDragConstraints] = useState(null);
    useEffect(() => {
      if (props.containerConstraint.current) {
        let containerWidth = props.containerConstraint?.current.clientWidth,
          containerHeight = props.containerConstraint?.current.clientHeight,
          heartHeight = heart?.current.clientHeight,
          heartWidth = heart?.current.clientWidth;

        /*   setDragConstraints({
        top: 0,
        left: 0,
        bottom: containerHeight - heartHeight,
        right: containerWidth - heartWidth,
      }); */

        // ! limitations: maapektohan ang result if mag resize sa window.
      }

      return () => {};
    }, [props.containerConstraint]);

    /*     const dragEnabled = useMotionValue(props.enableDrag);

    useEffect(() => {
      // Update the motion value when props.enableDrag changes
      dragEnabled.set(props.enableDrag);
    }, [props.enableDrag, dragEnabled]); */

    return (
      <motion.div
        drag={props.enableDrag}
        whileDrag={{ scale: 1.2 }}
        onDragEnd={props.enableDrag ? props.handleDragEnd : null}
        dragConstraints={props.containerConstraint.current ? props.containerConstraint : null}
        className={`absolute z-10 h-fit ${props.divClassName}`}
        {...props.dragProps}
        ref={ref}
        {...props}
      >
        <motion.svg
          className={`h-fit max-w-40 ${props.svgClassName}`}
          ref={heart}
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
            /*           x: props.snappingHeartPosition?.x,
          y: props.snappingHeartPosition?.y */
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
      </motion.div>
    );
  })
);

const HeartSVG = forwardRef(({ className, props }, ref) => {
  return (
    <svg
      ref={ref}
      className={className}
      width="317"
      height="273"
      viewBox="0 0 317 273"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 92.6602C0 169.658 63.65 210.682 110.232 247.415C126.667 260.367 142.5 272.574 158.333 272.574C174.167 272.574 190 260.383 206.435 247.399C253.032 210.698 316.667 169.658 316.667 92.6761C316.667 15.6944 229.583 -38.9464 158.333 35.0902C87.0833 -38.9464 0 15.6627 0 92.6602Z"
        fill="#995F7E"
      />
    </svg>
  );
});

export default Heart;
export { HeartSVG };

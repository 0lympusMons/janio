import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Paw from '../components/Paw';
import Heart, { HeartSVG } from '../components/Heart';
import { AnimatePresence, motion, animate, useMotionValue, transform } from 'framer-motion';

//happy monthsary, anniversary
export default function HappyGreeting(date) {
  // if date is nov 19, anniverasary
  // if date is 19, monthsary
  // if date is November 26, birthday

  const BirthdayMessage = {
    first: ['To my cutest papai ', 'in the whole wide universe ', '(opkorz)'],
    second: 'Happy Birthday',
    third: 'DRAG THE HARTOHART',
    longMessage:
      'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ',
  };

  const seqeunceRef = useRef({});
  const [activeSequence, setActiveSequence] = useState(3);

  let pawsVariant = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        duration: 0.5,
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  let pawItemsVariant = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  useEffect(() => {
    function set(num, ms) {
      let timeout = setTimeout(() => {
        setActiveSequence(num);
      }, ms);

      return timeout;
    }

    // let secondSeq = set(2, 10000);
    let thirdSeq = set(3, 15000);
  }, []);

  // * 3RD SEQUENCE, SNAPPING HEART

  const heartContainerRef = useRef(null);
  const HeartRef = useRef(null);
  const SnappingHeartRef = useRef(null);
  const SNAP_RADIUS = 100;
  const heartPos = useRef({ x: 0, y: 0 });
  const heartPosX = useMotionValue(0);
  const [snapCenter, setSnapCenter] = useState({ x: null, y: null });

  const [animatePosition, setAnimatePosition] = useState(false);

  const calculateDistance = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  const handleDragEnd = (event, info) => {
    console.log('info', info);

    const snapToCenter = setTimeout(() => {
      const { x, y } = info.point;
      const distance = calculateDistance(x, y, snapCenter.x, snapCenter.y);
      console.log(heartPos.current);

      if (distance < SNAP_RADIUS) {
        // heartPos.current = { x: snapCenter.x, y: snapCenter.y };
        console.log('snapppppppppppppppppppp');
        animate(HeartRef.current, { x: 0, y: snapCenter.y, translateY: '-50%' }, { duration: 1 });
      } else {
        // Otherwise, keep the current position
        // setHeartPos({ x, y });
        // heartPos.current = { x, y };
      }
    }, 2000);
  };

  /* 
 get final position of the heart 
  calculate distance between heart and radius
  if within radius, animate to center
  if not, remain to final position
  */

  useLayoutEffect(() => {
    const rect = SnappingHeartRef.current.getBoundingClientRect();

    setSnapCenter({
      x: rect.left + rect.width / 2 + window.scrollX,
      y: rect.top + rect.height / 2 + window.scrollY,
    });

    console.log(snapCenter);
  }, [SnappingHeartRef.current]);

  useLayoutEffect(() => {
    console.log('chnaged');
    const modalElement = HeartRef?.current;
    if (modalElement) {
      const coords = modalElement.style.transform.match(/^translateX\((.+)px\) translateY\((.+)px\) translateZ/);
      if (coords?.length) {
        console.log('coords', coords);

        /* localStorage.setItem(
          'lastModalCoords',
          JSON.stringify({
            x: parseInt(coords[1], 10),
            y: parseInt(coords[2], 10),
          })
        ); */
      }
    }
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-pink-900 px-2">
      <AnimatePresence>
        {activeSequence == 1 ? (
          <motion.div
            ref={(el) => (seqeunceRef.current.first = el)}
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              position: 'fixed',
              opacity: 0,
            }}
          >
            <FadeInText transition={{ ease: 'easeInOut', delay: 1 }}>
              <h1 className="text-2xfreal text-center font-cooper text-pink-50">{BirthdayMessage.first[0]}</h1>
            </FadeInText>
            <FadeInText transition={{ delay: 4 }}>
              <p className="text-center font-serif text-pink-100">{BirthdayMessage.first[1]}</p>
            </FadeInText>
            <FadeInText transition={{ delay: 6 }}>
              <p className="font-serif text-xs text-pink-100">{BirthdayMessage.first[2]}</p>
            </FadeInText>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeSequence == 2 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              position: 'fixed',

              opacity: 0,
            }}
          >
            <motion.div
              ref={(el) => (seqeunceRef.current.second = el)}
              className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-between overflow-hidden"
              variants={pawsVariant}
              initial="hidden"
              animate="show"
            >
              <Paw
                className={'mr-[20%]'}
                variants={pawItemsVariant}
                delay={1.25}
              />
              <Paw
                className={'mr-[-20%]'}
                variants={pawItemsVariant}
                delay={1}
              />
              <Paw
                className={'mr-[20%]'}
                variants={pawItemsVariant}
                delay={0.75}
              />

              <Paw
                className={'mr-[-20%]'}
                variants={pawItemsVariant}
                delay={0.5}
              />
              <Paw
                className={'mr-[20%]'}
                variants={pawItemsVariant}
                delay={0.25}
              />
              <Paw
                className={'mr-[-20%]'}
                variants={pawItemsVariant}
              />
            </motion.div>
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: 'anticipate' }}
              className="text-center font-cooper text-2xl text-pink-50"
            >
              {BirthdayMessage.second}
            </motion.h1>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeSequence == 3 ? (
          <div className="flex h-full w-full flex-col">
            <motion.div
              className="relative flex w-full flex-1 justify-center"
              ref={heartContainerRef}
            >
              <Heart
                ref={HeartRef}
                containerConstraint={heartContainerRef}
                SnappingHeartPosition={snapCenter}
                handleDragEnd={handleDragEnd}
              />
              <HeartSVG
                ref={SnappingHeartRef}
                className="absolute top-1/2 z-0 m-auto max-w-40 -translate-y-1/2 brightness-0 saturate-100"
              />
              {snapCenter.x ? (
                <div
                  className="absolute h-1 w-1 bg-pink-50"
                  style={{
                    left: `${snapCenter.x}px`,
                    top: `${snapCenter.y}px`,
                  }}
                ></div>
              ) : null}
            </motion.div>
            <h2 className="mx-auto mt-auto pb-4 font-serif tracking-wider text-pink-50">{BirthdayMessage.third}</h2>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function FadeInText({ children, duration = 3, transition, ...props }) {
  const textVariants = {
    start: {
      opacity: 0,
      y: 50,
    },
    end: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      variants={textVariants}
      initial="start"
      animate="end"
      transition={{ ease: 'easeInOut', duration: duration, bounce: 0, ...transition }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

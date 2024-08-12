import React, { useEffect, useRef, useState } from 'react';
import Paw from '../components/Paw';
import { AnimatePresence, delay, motion, useAnimate, useAnimation } from 'framer-motion';

//happy monthsary, anniversary
export default function HappyGreeting(date) {
  // if date is nov 19, anniverasary
  // if date is 19, monthsary
  // if date is November 26, birthday

  const BirthdayMessage = {
    first: ['To my cutest papai ', 'in the whole wide universe ', '(opkorz)'],
    second: 'Happy Birthday',
    third: 'I hab samting to say :> (unlock)',
    longMessage:
      'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ',
  };

  const [scope, animate] = useAnimate();
  const sequence = useRef([1, 2, 3, 4]);
  const [activeSequence, setActiveSequence] = useState(2);

  useEffect(() => {
    const animation = async () => {
      // await animate(scope.current, { opacity: 0 }, { delay: 10 });
      setActiveSequence(2);
      // setTimeout(() => {
      //   setActiveSequence(3);
      // }, 5000);
    };

    animation();
  }, []);

  let sequenceAnimations = {
    firstSequence: {
      start: {
        opacity: 0,
      },
      exit: {
        opacity: 0,
      },
    },


  };

  let pawsVariant = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        duration: 4,
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

  return (
    <div className="flex h-full w-full items-center justify-center bg-pink-900 px-2">
      {activeSequence == 1 ? (
        <motion.div ref={scope} className="flex flex-col items-center">
          <FadeInText transition={{ ease: 'easeInOut', delay: 1 }} kuyaya="yawa">
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

      <AnimatePresence>
        {activeSequence == 2 ? (
          <motion.div
            exit={{
              opacity: 0,
            }}
          >
            <motion.div
              className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-between"
              variants={pawsVariant}
              initial="hidden"
              animate="show"
            >
              <Paw className={'mr-[20%]'} variants={pawItemsVariant} />
              <Paw className={'mr-[-20%]'} variants={pawItemsVariant} />
              <Paw className={'mr-[20%]'} variants={pawItemsVariant} />

              <Paw className={'mr-[-20%]'} variants={pawItemsVariant} />
              <Paw className={'mr-[20%]'} variants={pawItemsVariant} />
              <Paw className={'mr-[-20%]'} variants={pawItemsVariant} />
            </motion.div>
            <h1 className="text-center font-cooper text-2xl text-pink-50">{BirthdayMessage.second}</h1>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>{activeSequence == 3 ? <div>{BirthdayMessage.third}</div> : null}</AnimatePresence>
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

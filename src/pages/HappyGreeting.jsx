import React, { useEffect } from 'react';

import { motion, useAnimate } from 'framer-motion';

//happy monthsary, anniversary
export default function HappyGreeting(date) {
  // if date is nov 19, anniverasary
  // if date is 19, monthsary
  // if date is November 26, birthday

  const BirthdayMessage = {
    first: ['To my cutest papai ', 'in the whole wide universe ', '(opkorz)'],
    second: 'Happy Birthday',
    third: 'I hab samting to say :>',
    longMessage:
      'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ',
  };

  return (
    <div className="w-full h-full flex justify-center items-center px-2 bg-pink-900">
      <div className="flex flex-col items-center">
        <FadeInText transition={{ ease: 'easeInOut', delay: 1 }} kuyaya="yawa">
          <h1 className="text-2xl font-cooper text-pink-50 text-center">{BirthdayMessage.first[0]}</h1>
        </FadeInText>
        <FadeInText transition={{ delay: 4 }}>
          <p className="font-serif  text-pink-100 text-center">{BirthdayMessage.first[1]}</p>
        </FadeInText>
        <FadeInText transition={{ delay: 6 }}>
          <p className="font-serif text-xs text-pink-100">{BirthdayMessage.first[2]}</p>
        </FadeInText>
      </div>
    </div>
  );
}

function FadeInText({ children, duration = 3, transition, ...props }) {
  let [scope, animate] = useAnimate();
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

  useEffect(() => {}, []);

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

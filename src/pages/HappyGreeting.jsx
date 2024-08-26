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
  const [activeSequence, setActiveSequence] = useState(1);

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
    // todo
    let secondSeq = set(2, 10000);
    let thirdSeq = set(3, 15000);
  }, []);

  // * 3RD SEQUENCE, SNAPPING HEART

  const heartContainerRef = useRef(null);
  const HeartRef = useRef(null);
  const SnappingHeartRef = useRef(null);
  const SNAP_RADIUS = 100;
  const heartPos = useRef({ x: 0, y: 0 });
  const [snapCenter, setSnapCenter] = useState({ x: null, y: null });

  const calculateDistance = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  const handleDragEnd = (event, info) => {
    console.log('info', info);

    const snapToCenter = setTimeout(async () => {
      const { x, y } = info.point;
      const distance = calculateDistance(x, y, snapCenter.x, snapCenter.y);
      console.log(heartPos.current);

      if (distance < SNAP_RADIUS) {
        await animate(HeartRef.current, { x: 0, y: snapCenter.y, translateY: '-50%' }, { duration: 1 });
        await animate(HeartRef.current, { scale: 100 }, { ease: 'easeInOut', duration: 2 });
        await animate(SnappingHeartRef.current, { display: 'none' });

        setActiveSequence(4);
      }
    }, 2000);
  };

  useLayoutEffect(() => {
    if (activeSequence === 3) {
      const rect = SnappingHeartRef.current.getBoundingClientRect();

      setSnapCenter({
        x: rect.left + rect.width / 2 + window.scrollX,
        y: rect.top + rect.height / 2 + window.scrollY,
      });

      console.log(snapCenter);
    }
  }, [activeSequence, SnappingHeartRef.current]);

  return (
    <div className={`flex h-full w-full ${activeSequence != 3 ? 'px-2' : ''}`}>
      <AnimatePresence>
        {activeSequence == 1 ? (
          <div className="flex h-dvh w-full items-center justify-center overflow-hidden">
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
          </div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeSequence == 2 ? (
          <div className="flex h-dvh w-full items-center justify-center overflow-hidden">
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
          </div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activeSequence == 3 ? (
          <div className="flex h-dvh w-full items-center justify-center overflow-hidden">
            <motion.div
              className="flex h-full w-full flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ position: 'fixed', opacity: 0 }}
            >
              <motion.div
                className="relative flex w-full flex-1 justify-center"
                ref={heartContainerRef}
              >
                <Heart
                  ref={HeartRef}
                  containerConstraint={heartContainerRef}
                  SnappingHeartPosition={snapCenter}
                  handleDragEnd={handleDragEnd}
                  exit={{ opacity: 0, position: 'fixed' }}
                />
                <HeartSVG
                  ref={SnappingHeartRef}
                  className="absolute top-1/2 z-0 m-auto max-w-40 -translate-y-1/2 brightness-0 saturate-100"
                  exit={{ opacity: 0, position: 'fixed' }}
                />
              </motion.div>
              <h2 className="mx-auto mt-auto pb-4 font-serif tracking-wider text-pink-50">{BirthdayMessage.third}</h2>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeSequence == 4 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4"
          >
            <p className="mb-8 min-h-dvh px-4 font-serif leading-[170%] tracking-wide text-pink-50">
              Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis
              tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit
              sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad
              litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac
              scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel
              bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
            </p>

            <div className="flex h-screen flex-col items-center justify-center gap-6">
              <h1 className="font-cooper text-[7vw] text-pink-50 sm:text-4xl">Island sunset with you</h1>
              <img
                src="/olango.png"
                alt="Olango sunset"
                className="rounded-3xl"
              />
              <p className="font-serif leading-[170%] tracking-wide text-pink-50">
                Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac
                aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos.
              </p>
            </div>
          </motion.div>
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

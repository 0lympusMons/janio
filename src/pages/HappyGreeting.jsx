import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Paw from '../components/Paw';
import Heart, { HeartSVG } from '../components/Heart';
import {
  AnimatePresence,
  motion,
  animate,
  useMotionValue,
  transform,
  useScroll,
  useSpring,
  useTransform,
  useElementScroll,
  clamp,
} from 'framer-motion';

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
  const [activeSequence, setActiveSequence] = useState(4);

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
    // let secondSeq = set(2, 10000);
    // let thirdSeq = set(3, 15000);
  }, []);

  // * 3RD SEQUENCE, SNAPPING HEART

  const heartContainerRef = useRef(null);
  const HeartRef = useRef(null);
  const SnappingHeartRef = useRef(null);
  const SNAP_RADIUS = 100;
  const heartPos = useRef({ x: 0, y: 0 });
  const [snapCenter, setSnapCenter] = useState({ x: null, y: null });
  const enableDrag = useMotionValue(true);

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
        enableDrag.set(false);
        await animate(HeartRef.current, { x: 0, y: snapCenter.y, translateY: '-50%' }, { duration: 1 });
        await animate(HeartRef.current, { scale: 100 }, { ease: 'easeInOut', duration: 2 });
        await animate(SnappingHeartRef.current, { display: 'none' });

        setActiveSequence(4);
      }
    }, 2000);
  };

  useLayoutEffect(() => {
    if (activeSequence === 3 && SnappingHeartRef.current) {
      const calculateSnapCenter = () => {
        const rect = SnappingHeartRef.current.getBoundingClientRect();
        setSnapCenter({
          x: rect.left + rect.width / 2 + window.scrollX,
          y: rect.top + rect.height / 2 + window.scrollY,
        });

        console.log('snapcenter: ', snapCenter);
      };

      const resizeObserver = new ResizeObserver(calculateSnapCenter);
      resizeObserver.observe(SnappingHeartRef.current);

      // Initial calculation
      calculateSnapCenter();

      // Clean up observer on unmount
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [activeSequence, SnappingHeartRef]);

  return (
    <div className={`flex h-full w-full ${activeSequence != 3 ? 'px-2' : ''}`}>
      <AnimatePresence mode="wait">
        {activeSequence == 1 ? (
          <motion.div
            className="flex h-dvh w-full items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              position: 'fixed',
              opacity: 0,
            }}
          >
            <motion.div
              ref={(el) => (seqeunceRef.current.first = el)}
              className="flex flex-col items-center"
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
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activeSequence == 2 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              position: 'fixed',
              opacity: 0,
            }}
            className="flex h-dvh w-full items-center justify-center overflow-hidden"
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

      <AnimatePresence mode="wait">
        {activeSequence == 3 ? (
          <motion.div
            className="flex h-dvh w-full items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="heart"
          >
            <motion.div className="flex h-full w-full flex-col">
              <motion.div
                className="relative flex w-full flex-1 justify-center"
                ref={heartContainerRef}
              >
                <AnimatePresence>
                  <Heart
                    ref={HeartRef}
                    containerConstraint={heartContainerRef}
                    SnappingHeartPosition={snapCenter}
                    enableDrag={enableDrag.get()}
                    handleDragEnd={handleDragEnd}
                    exit={{ opacity: 0, position: 'fixed' }}
                  />
                </AnimatePresence>
                <HeartSVG
                  ref={SnappingHeartRef}
                  className="absolute top-1/2 z-0 m-auto max-w-40 -translate-y-1/2 brightness-0 saturate-100"
                  exit={{ opacity: 0, position: 'fixed' }}
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
            </motion.div>
          </motion.div>
        ) : null}

        {activeSequence == 4 ? <LongMessagePage /> : null}
      </AnimatePresence>
    </div>
  );
}

function LongMessagePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="progress-bar"
        style={{ scaleX }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative snap-y snap-mandatory p-4"
        key="messages"
      >
        <section className="snap-start scroll-mb-4 scroll-mt-4">
          <p className="mb-8 min-h-dvh px-4 font-serif leading-[170%] tracking-wide text-pink-50">
            Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis
            tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit
            sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora
            torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac
            scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel
            bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus. Forem ipsum
            dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
            dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
            Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
            per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante
            pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem.
            Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus. Forem ipsum dolor sit amet,
            consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
            fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget
            condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia
            nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
            Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi
            convallis convallis diam sit amet lacinia. Aliquam in elementum tellus. Forem ipsum dolor sit amet,
            consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
            fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget
            condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia
            nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
            Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi
            convallis convallis diam sit amet lacinia. Aliquam in elementum tellus. Forem ipsum dolor sit amet,
            consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
            fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget
            condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia
            nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
            Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi
            convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
          </p>
        </section>

        <PictureMessage key={1} />
        <PictureMessage key={2} />
        <PictureMessage key={3} />

        <section className="-m-6 grid h-dvh snap-center grid-cols-[repeat(2,_minmax(0px,_200px))] justify-around overflow-hidden font-serif text-pink-50">
          {/* moviehaus */}
          <div className="relative m-auto h-full w-full">
            <motion.img
              className="polka-img moviehaus absolute top-1/2 w-[50vw] -translate-x-1/4 -translate-y-1/2 rotate-45 scale-125"
              src="/polkadot_pics/moviehaus.png"
              alt="moviehaus"
            />
          </div>

          {/* park */}
          <img
            className="polka-img-grow polka-img park m-auto"
            src="/polkadot_pics/park.png"
            alt="park"
          />

          <div className="col-span-2 content-center text-center">
            <p>I love you to the core.</p>
            <p>Happy birthday, my love!</p>
          </div>

          {/* olango */}
          <img
            className="polka-img olango"
            src="/polkadot_pics/olango.png"
            alt="olango"
          />

          {/* elevator */}
          <div className="relative row-span-2 m-auto h-full w-full">
            <img
              className="polka-img elevator absolute top-1/2 -rotate-[30deg]"
              src="/polkadot_pics/elevator.png"
              alt="elevator"
            />
          </div>

          {/* sm */}
          <img
            className="polka-img sm mt-auto"
            src="/polkadot_pics/sm.png"
            alt="sm"
          />
        </section>
      </motion.div>
    </>
  );
}

function PictureMessage(props) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  const scaleImg = useTransform(scrollYProgress, [0, 1], [0.5, 1], { clamp: false });
  const scale = useSpring(scaleImg, { stiffness: 300, damping: 30 });

  /*   scrollYProgress.on('change', () => {
    console.log(scrollYProgress.current);
  }); */

  return (
    <motion.section
      className="flex h-screen snap-center flex-col items-center justify-center gap-6"
      style={{ scale: scale, opacity: scale }}
      ref={ref}
    >
      <h1 className="font-cooper text-[7vw] text-pink-50 sm:text-4xl">Island sunset with you</h1>
      <motion.img
        src="/olango.png"
        alt="Olango sunset"
        className="rounded-3xl"
      />
      <p className="font-serif leading-[170%] tracking-wide text-pink-50">
        Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet
        odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      </p>
    </motion.section>
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

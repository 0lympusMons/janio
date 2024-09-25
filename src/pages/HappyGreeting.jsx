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

import { sleep } from '../utils/HelperFunctions';
import { Await } from 'react-router-dom';

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

  // * music

  let introBeats = new Audio('/music/IntroBeats.mp3');
  let fullSong = new Audio('/music/FullSong.mp3');

  const seqeunceRef = useRef({});
  // todo manually control page here
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
        staggerChildren: 0.5,
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
    introBeats.loop = true;
    introBeats.muted = 'muted';

    introBeats.autoplay = true;
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
        introBeats.pause();
        enableDrag.set(false);
        await animate(HeartRef.current, { x: 0, y: snapCenter.y, translateY: '-50%' }, { duration: 1 });
        fullSong.play();
        await animate(HeartRef.current, { scale: 100 }, { ease: 'easeInOut', duration: 3, delay: 0.5 });
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
                className={'paws-left mr-[20%]'}
                variants={pawItemsVariant}
              />
              <Paw
                className={'paws-right mr-[-20%]'}
                variants={pawItemsVariant}
              />
              <Paw
                className={'paws-left mr-[20%]'}
                variants={pawItemsVariant}
              />

              <Paw
                className={'paws-right mr-[-20%]'}
                variants={pawItemsVariant}
              />
              <Paw
                className={'paws-left mr-[20%]'}
                variants={pawItemsVariant}
              />
              <Paw
                className={'paws-right mr-[-20%]'}
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

                {/*  {snapCenter.x ? (
                  <div
                    className="absolute h-1 w-1 bg-pink-50"
                    style={{
                      left: `${snapCenter.x}px`,
                      top: `${snapCenter.y}px`,
                    }}
                  ></div>
                ) : null} */}
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
          <div>
            <p className="mb-8 px-4 font-serif leading-[170%] tracking-wide text-pink-50">
              Hi love, it’s your birthday! Wow sah. Dali ra kaayu ang panahon nuh? It’s so crazy how time moved so fast,
              so many things happened already, and mountain of life events that we forgot how we got to this point given
              the endless pointy-ass needles life have had been poking me. But one thing is for sure, that you made this
              life a heaven of a ride. That I was sure that I was not alone in facing OP boss battles. And through it
              all, even in my most rainiest days, you were always there holding an umbrella for me, shielding me from
              every raindrop.
            </p>

            <p className="mb-8 px-4 font-serif leading-[170%] tracking-wide text-pink-50">
              You unlocked an unchartered territory of my heart. You taught me what true love means. You do
              unexplainable things that make my heart pound like they be running on gasoline. All of these sa isa rana
              ka tuig. Goodness gracious, jusko santa maria inahan ka sa Diyos. What did I do to deserve you?
            </p>

            <p className="mb-8 px-4 font-serif leading-[170%] tracking-wide text-pink-50">
              I’ve witnessed your birthday twice now, and our love has grown thrice as much. Wala gyud damha sah nga mag
              kita. Pero as they say nga, “You will find love when you least expect it”. Damn, I didn’t expect to find
              it with you. I mean, naa diay tong meant to be nako gapuyo sa suburban part sa Lacion. Pai, all my life
              this heart has been waiting for you. Only you. You don’t know how lucky I am for you. (Also, you don’t
              know how beautiful and sexy and cutie patootie Papai you are.) I love you a gazillion times! My only wish
              for you is for your happiness kay seeing you happy is also my happiness. I wish you all the best, my love.
            </p>
          </div>
        </section>

        <PictureMessage
          key={1}
          imgSrc={'/images/bite.jpg'}
          header={'Bite that kugmo factory!'}
          p={'Since I can’t squish you, I must paak you. Pakyu! That’s for being so cute uwu'}
        />

        <PictureMessage
          key={2}
          imgSrc={'/images/kingking.jpg'}
          header={'First meetup with a fam'}
          p={'Wow ah. Ana pa’s Kingking ganahan siya nimo because you listen. True. You are a level 9999 listener.'}
        />

        <PictureMessage
          key={3}
          imgSrc={'/images/foods.jpg'}
          header={'First pamisita'}
          p={
            'Wow, food! Ofcors apil jud nang favorite memory ang foods. Matmat enjoyed the mini donuts so much, he so cute T__T  I lab food, but tati is d food that I labber. '
          }
        />

        <PictureMessage
          key={4}
          imgSrc={'/images/foreshadow.jpg'}
          header={'Foreshadowing'}
          p={'Ay maypa foreshadowing diay ta nila? We so cool!'}
        />

        <PictureMessage
          key={5}
          imgSrc={'/images/movie-date.jpg'}
          header={'First movie date'}
          p={'First movie date nga nauwian sa first kiss! Wahhahah kilig namarn'}
        />

        <PictureMessage
          key={6}
          imgSrc={'/images/olango.jpg'}
          header={'Island sunsets with you'}
          p={
            'I could live in this moment forever. Huhuhu I miss you so much. I could be stuck in an island with you and I’d probably be fine (moangal nis Janice ani ron kay wa mi kan-on)'
          }
        />

        <PictureMessage
          key={7}
          imgSrc={'/images/valentines.jpg'}
          header={'Valentine’s dateee'}
          p={'Aweee first valentine’s date ever with my favorite person!'}
        />

        <PictureMessage
          key={8}
          imgSrc={'/images/video-call.jpg'}
          header={'Video calls'}
          p={
            'This is taking the top spot as this is how we spend most of our time together. I love talking with you bb, I’m not that talkative to everyone baya even sa akong mga ka work ari but to you I am. I am soaper comfy with you. You are my comfort <3 Ang 2nd image kay kato nang ga video call ta. Abi nakog natog naka pero gisapot man diay ka nako hehe. Labyuuu'
          }
        />

        <section className="-m-6 grid h-dvh snap-center grid-cols-[repeat(2,_minmax(0px,_200px))] justify-around overflow-hidden font-serif text-pink-50">
          {/* moviehaus */}
          <div className="relative m-auto h-full w-full">
            <JigglingPics
              className="absolute top-1/2 w-[50vw] -translate-x-1/4 -translate-y-1/2 scale-125"
              src="/polkadot_pics/moviehaus.png"
              alt="moviehaus"
              initialClassname="polka-img-grow"
              finalClassname="polka-img moviehaus"
            />
          </div>

          {/* park
          className, src, alt, initialClassname, finalClassname */}

          <JigglingPics
            className="m-auto"
            src="/polkadot_pics/park.png"
            alt="park"
            initialClassname="polka-img-grow"
            finalClassname="polka-img park"
          />

          <div className="col-span-2 content-center text-center">
            <p>
              Cheers for more love, movie dates, ranked games, birthdays and Spotify monthly subscriptions to come. I
              love you. I miss you so much.
            </p>
            <p>Happy birthday, my love!</p>
          </div>

          {/* olango */}

          <JigglingPics
            className=""
            src="/polkadot_pics/olango.png"
            alt="olango"
            initialClassname="polka-img-grow"
            finalClassname="polka-img olango"
          />

          {/* elevator */}
          <div className="relative row-span-2 m-auto h-full w-full">
            <JigglingPics
              className="absolute top-1/2 -rotate-[30deg]"
              src="/polkadot_pics/elevator.png"
              alt="elevator"
              initialClassname="polka-img-grow"
              finalClassname="polka-img elevator"
            />
          </div>

          {/* sm */}
          <JigglingPics
            className="mt-auto"
            src="/polkadot_pics/sm.png"
            alt="sm"
            initialClassname="polka-img-grow"
            finalClassname="polka-img sm"
          />
        </section>
      </motion.div>
    </>
  );
}

function JigglingPics({ className, src, alt, initialClassname, finalClassname }) {
  return (
    <motion.img
      className={`${className} ${initialClassname}`}
      src={src}
      alt={alt}
      onViewportEnter={async (info) => {
        info.target.classList.remove(initialClassname);
        info.target.classList.add(...finalClassname.split(' '));
      }}
      onViewportLeave={async (info) => {
        await sleep(200);
        // Remove all final classes and re-add the initial class
        info.target.classList.remove(...finalClassname.split(' '));
        await sleep(200);
        info.target.classList.add(initialClassname);
      }}
      viewport={{ once: true }}
    />
  );
}

function usePreloadImage(src) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return loaded;
}

function PictureMessage({ header, imgSrc, p }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  const scaleImg = useTransform(scrollYProgress, [0, 1], [0.5, 1], { clamp: false });
  const scale = useSpring(scaleImg, { stiffness: 150, damping: 20 });
  const isLoaded = usePreloadImage(imgSrc); // Preloading image

  // if (!isLoaded) return null; // or display a loader

  return (
    <motion.section
      className="flex h-screen snap-center flex-col items-center justify-center gap-6"
      style={{ scale: scale }}
      ref={ref}
    >
      <h1 className="font-cooper text-[7vw] text-pink-50 sm:text-4xl">{header}</h1>
      <img
        src={imgSrc}
        alt={imgSrc}
        className="rounded-3xl"
      />
      <p className="font-serif leading-[170%] tracking-wide text-pink-50">{p}</p>
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

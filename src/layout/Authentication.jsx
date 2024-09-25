import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function Authentication() {
  // * cats
  // * if correct
  // 1 save authentication for the day
  // 2  sign in as janice or dodot
  // * if incorrect for multiple times
  // 1 ban user for 5 mins
  // * reset authentication every day
  // 1 clear local storage
  // 2 display cats password
  // 3 display greetings
  const [started, setStarted] = React.useState(false);

  if (!started) {
    return (
      <div className="flex h-dvh w-full items-end justify-center pb-8">
        <button
          className="rounded-2xl bg-pink-50 px-6 py-2 font-cooper text-4xl text-pink-900 shadow-md duration-100 hover:bg-pink-400 hover:shadow-none focus:bg-pink-500"
          onClick={() => setStarted(true)}
        >
          Start
        </button>
      </div>
    );
  }

  return <Outlet />;
}

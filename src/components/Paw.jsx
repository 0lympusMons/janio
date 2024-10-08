import React from 'react';
import { motion } from 'framer-motion';
export default function Paw({ className, variants }) {
  return (
    <motion.span
      className={`${className} paws max-h-28`}
      variants={variants}
    >
      <svg
        className={`paw`}
        xmlns="http://www.w3.org/2000/svg"
        width="95"
        height="93"
        fill="none"
      >
        <path
          fill="#995F7E"
          d="M27.383 33.994c0-7.473-6.062-13.533-13.537-13.533C6.372 20.46.313 26.52.313 33.994c0 7.479 6.057 13.537 13.533 13.537 7.476 0 13.537-6.058 13.537-13.537Zm53.975-10.89c-7.473 0-13.533 6.06-13.533 13.534 0 7.479 6.06 13.534 13.533 13.534 7.475 0 13.535-6.055 13.535-13.534 0-7.473-6.059-13.534-13.535-13.534Zm-12.292 28.6c-.941-1.16-2.273-2.503-3.802-3.91-4.081-5.29-10.464-8.711-17.66-8.711-6.405 0-12.162 2.712-16.231 7.033-2.312 2.011-4.367 3.974-5.675 5.589l-.875 1.069c-4.084 4.98-9.167 11.174-9.13 21.686.036 9.763 7.986 17.71 17.72 17.71a17.536 17.536 0 0 0 13.97-6.885 17.533 17.533 0 0 0 13.972 6.885c9.73 0 17.679-7.946 17.716-17.71.037-10.512-5.047-16.707-9.13-21.686l-.875-1.07ZM48.542 30.45c8.236 0 14.913-6.677 14.913-14.914C63.455 7.3 56.778.623 48.542.623c-8.237 0-14.914 6.677-14.914 14.913 0 8.237 6.677 14.914 14.914 14.914Z"
        />
      </svg>{' '}
    </motion.span>
  );
}

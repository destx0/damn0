// src/renderer/src/pages/animationVariants.js

export const iconVariants = {
  hover: { scale: 1.2, transition: { type: 'spring', stiffness: 300 } },
  tap: { scale: 0.8, transition: { type: 'spring', stiffness: 300 } }
}

export const buttonVariants = {
  hidden: { opacity: 1, x: 450, scale: 0.01 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { ease: 'easeIn', duration: 0.3 } },
  hover: { scale: 1.05, transition: { type: 'spring', stiffness: 300 } },
  tap: { scale: 0.95, transition: { type: 'spring', stiffness: 300 } }
}

export const formContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.01,
      staggerChildren: 0.01
    }
  }
}

export const formItemVariants = {
  hidden: { opacity: 0, x: 250 },
  visible: { opacity: 1, x: 0, transition: { ease: 'easeIn', duration: 0.1 } }
}

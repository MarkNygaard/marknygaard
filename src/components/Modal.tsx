import React from 'react';
import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';

export default function Modal(props: {
  onClose;
  children;
  type: 'blur' | 'clear';
}) {
  if (!open) return null;

  let type = props.type;
  const onClose = props.onClose;
  const children = props.children;

  return (
    <Dialog
      as={motion.div}
      key="modal"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: [0.36, 0.66, 0.04, 1],
          delay: 1.15,
        },
      }}
      className={classNames(
        type === 'blur' && 'bg-[#787878]/30 backdrop-blur',
        type === 'clear' && 'bg-gray-500/75',
        'fixed inset-0 top-0 h-screen z-50'
      )}
      open={true}
      onClose={onClose}
    >
      <Dialog.Panel
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
        }}
        className="w-full h-full"
        onClick={onClose}
      >
        <AnimatePresence>{children}</AnimatePresence>
      </Dialog.Panel>
    </Dialog>
  );
}

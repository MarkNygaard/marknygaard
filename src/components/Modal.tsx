'use client';

import React from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';

export default function Modal({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed z-50 inset-0 p-4 md:p-8 md:my-12 max-w-[840px] mx-auto min-h-[200px] max-h-[630px] w-full h-full"
    >
      <Dialog.Overlay
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
        className="fixed inset-0 bg-gray-500/75"
        onClick={onClose}
      ></Dialog.Overlay>
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
        // className="w-full bg-white dark:bg-gray-900 h-full transform overflow-hidden rounded-lg text-left align-middle shadow-xl"
      >
        {children}
      </Dialog.Panel>
    </Dialog>
  );
}

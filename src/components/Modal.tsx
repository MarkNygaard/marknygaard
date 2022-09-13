import React from 'react';
import { Dialog } from '@headlessui/react';

export default function Modal({ onClose, children }) {
  if (!open) return null;

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed z-50 inset-0 p-8 m-12 max-w-[840px] mx-auto min-h-[200px] max-h-[630px] w-full h-full"
    >
      <Dialog.Overlay
        className="fixed inset-0 bg-gray-500/75"
        onClick={onClose}
      ></Dialog.Overlay>
      <Dialog.Panel className="w-full h-full transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl">
        <div className="w-full h-full">{children}</div>
      </Dialog.Panel>
    </Dialog>
  );
}

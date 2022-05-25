import React from 'react';
import Icon from './Icon';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="border-ash-200 border-t bg-pine-300 dark:bg-gray-900 dark:border-gray-900">
      <div className="container flex flex-col items-center pb-16 pt-12 font-extralight mx-auto">
        <ul className="p-4">
          <motion.li
            className="text-3xl"
            animate={{ opacity: [1, 1, 0, 1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            drag
            dragConstraints={{
              top: -500,
              left: -150,
              right: 150,
              bottom: 50,
            }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            dragElastic={0.5}
            whileTap={{ cursor: 'grabbing' }}
            whileDrag={{ opacity: 1 }}
          >
            ✌️
          </motion.li>
        </ul>
        <ul className="flex p-4">
          <li className="px-2">
            <a
              href="https://www.linkedin.com/in/mnleth/"
              target="_blank"
              rel="noopener norefferer noreferrer"
              className="hover:text-pine-600"
            >
              <Icon symbol="linkedin" />
            </a>
          </li>
          <li className="px-2">
            <a
              href="https://www.facebook.com/mark.nygaard"
              target="_blank"
              rel="noopener norefferer noreferrer"
              className="hover:text-pine-600"
            >
              <Icon symbol="facebook" />
            </a>
          </li>
          <li className="px-2">
            <a
              href="https://github.com/MarkNygaard"
              target="_blank"
              rel="noopener norefferer noreferrer"
              className="hover:text-pine-600"
            >
              <Icon symbol="github" />
            </a>
          </li>
          <li className="px-2">
            <a
              href="mailto:mark.nygaard@hotmail.com"
              target="_self"
              rel="noopener norefferer"
              className="hover:text-pine-600"
            >
              <Icon symbol="mail" />
            </a>
          </li>
        </ul>
        <ul>
          <li>
            &copy; {new Date().getFullYear()} Mark Nygaard. All rights reserved.
          </li>
        </ul>
      </div>
    </footer>
  );
}

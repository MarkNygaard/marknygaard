'use client';

import clsx from 'clsx';
import { useActiveSectionContext } from 'context/ActiveSectionContext';
import { SectionRecord } from 'infrastructure/generated/graphql';
import Link from 'next/link';

export default function CategoryMenuItem({ name, section }: SectionRecord) {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <ol>
      <li className="py-1 hover:text-gray-800 dark:hover:text-gray-200">
        <Link
          onClick={() => {
            setActiveSection(name as string);
            setTimeOfLastClick(Date.now());
          }}
          href={'#' + name}
          className={clsx({
            'text-gray-800 dark:text-gray-200':
              activeSection === name,
          })}
        >
          {name}
        </Link>
      </li>
      <li>
        {section?.map((SecondLevelMenu) => {
          return (
            <ol key={SecondLevelMenu.id} className="pb-1">
              <li className="hover:text-gray-800 dark:hover:text-gray-200">
                <Link
                  onClick={() => {
                    setActiveSection(SecondLevelMenu.name as string);
                    setTimeOfLastClick(Date.now());
                  }}
                  href={'#' + SecondLevelMenu.name}
                  className={clsx('pl-2', {
                    'text-gray-800 dark:text-gray-200':
                      activeSection === SecondLevelMenu.name,
                  })}
                >
                  {SecondLevelMenu.name}
                </Link>
              </li>
              {SecondLevelMenu?.section?.map((ThirdLevelMenu) => {
                return (
                  <li
                    key={ThirdLevelMenu.id}
                    className="hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    <Link
                      onClick={() => {
                        setActiveSection(ThirdLevelMenu.name as string);
                        setTimeOfLastClick(Date.now());
                      }}
                      href={'#' + ThirdLevelMenu.name}
                      className={clsx('pl-4', {
                        'text-gray-800 dark:text-gray-200':
                          activeSection === ThirdLevelMenu.name,
                      })}
                    >
                      {ThirdLevelMenu.name}
                    </Link>
                  </li>
                );
              })}
            </ol>
          );
        })}
      </li>
    </ol>
  );
}

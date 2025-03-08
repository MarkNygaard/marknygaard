'use client';

import ProgressBar from '@Primitives/ProgressBar';
import { useActiveSectionContext } from 'context/ActiveSectionContext';
import { SectionRecord } from 'infrastructure/generated/graphql';
import { cn } from 'lib/utils';
import Link from 'next/link';

export default function SectionMenu(props: any) {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  const renderMenuItems = (menu: SectionRecord, level: number = 0) => {
    return (
      <div key={menu.id}>
        <ProgressBar />
        <ol key={menu.id} className={level > 0 ? `pl-2` : ''}>
          <li className='py-1 hover:text-gray-800 dark:hover:text-gray-200'>
            <Link
              onClick={() => {
                setActiveSection(menu.name as string);
                setTimeOfLastClick(Date.now());
              }}
              href={'#' + menu.name}
              className={cn({
                'text-gray-800 dark:text-gray-200': activeSection === menu.name,
              })}
            >
              {menu.name}
            </Link>
          </li>
          {menu.section?.map((subMenu) => renderMenuItems(subMenu, level + 1))}
        </ol>
      </div>
    );
  };

  return (
    <div className='flex flex-col text-sm text-gray-400 dark:text-gray-500'>
      {props?.post?.section?.map((Section: SectionRecord) =>
        renderMenuItems(Section),
      )}
    </div>
  );
}

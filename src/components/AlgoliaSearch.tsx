import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, SearchBox } from 'react-instantsearch-hooks-web';
import { BsArrowReturnLeft } from 'react-icons/bs';
import Image from 'next/image';
import Modal from './Modal';

const searchClient = algoliasearch(
  'WGUS10UMIP',
  '01851bb5a02f53e334fc56d85eaa9dd3'
);

const results = ({ hit }) => (
  <>
    {hit.image && (
      <div className="flex hover:bg-pine-100 dark:hover:bg-pine-700 rounded-lg text-md m-2 p-2 group max-w-[840px]">
        <a className="flex w-full" href={hit.url}>
          <div className="relative w-[180px] h-[100px] mr-3">
            <Image
              className="rounded-md"
              alt=""
              src={hit.image}
              layout="fixed"
              width={180}
              height={100}
            />
          </div>
          <div className="flex w-full truncate pr-12 items-center">
            <div className="flex flex-col w-full">
              <p className="font-bold">{hit.title}</p>
              <div className="line-clamp-2 whitespace-normal w-full dark:text-gray-300 text-gray-500">
                {hit.content}
              </div>
            </div>
          </div>
          <div className="flex items-center h-full text-gray-500 dark:text-gray-300 text-xl">
            <BsArrowReturnLeft className="opacity-0 group-hover:opacity-100 fill-current" />
          </div>
        </a>
      </div>
    )}
  </>
);

export default function AlgoliaSearch({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <InstantSearch
        searchClient={searchClient}
        indexName="netlify_381a28a9-55d8-4c31-a82b-3f57df562e98_main_all"
      >
        <div className="relative w-full flex flex-col justify-between shadow-md xl:rounded-lg h-full">
          <div className="flex items-center flex-none h-16 border-b border-gray-500-opacity-10 dark:border-gray-700">
            <div className="w-full h-full flex items-center">
              <SearchBox
                placeholder="Search"
                classNames={{
                  root: 'w-full pl-14',
                  form: '',
                  input:
                    'flex-1 h-full bg-transparent focus:text-gray-900 text-gray-500 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-300 shadow-none outline-none truncate text-lg sm:text-3xl leading-normalized w-full appearance-none rounded-none',
                  submit: 'text-gray-400 dark:text-gray-300',
                  submitIcon:
                    'absolute left-0 top-0 mt-5 ml-4 w-6 h-6 fill-current',
                  reset:
                    'text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-500',
                  resetIcon:
                    'absolute right-0 top-0 mt-[1.7rem] mr-[6.5rem] w-[0.625rem] h-[0.625rem] fill-current',
                }}
              />
            </div>
            <div className="w-[1px] h-8 bg-gray-300 flex-none"></div>
            <button
              onClick={onClose}
              className="px-4 h-full text-gray-500 dark:text-gray-300 hover:text-gray-800 items-center flex"
            >
              Cancel
            </button>
          </div>
          <div className="grow w-full h-full overflow-y-scroll">
            <Hits hitComponent={results} />
          </div>
        </div>
      </InstantSearch>
    </Modal>
  );
}

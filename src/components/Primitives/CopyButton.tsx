import { FC } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { Button, ButtonProps } from '@Primitives/Button';
import useClipboard from 'lib/hooks/useClipboard';

export interface CopyButtonProps extends ButtonProps {
  value?: string;
}

export const CopyButton: FC<CopyButtonProps> = ({ value, ...buttonProps }) => {
  const { copy, copied } = useClipboard();

  const handleCopy = () => {
    copy(value);
  };

  return (
    <Button
      className='group absolute right-0 top-0 m-2 hover:border-2 group-hover:border-zinc-500 dark:border-zinc-500 dark:group-hover:border-zinc-400'
      size='icon'
      variant='outline'
      onClick={handleCopy}
      {...buttonProps}
    >
      <FiCheck
        className='transition-transform-opacity absolute scale-50 text-zinc-300 opacity-0 data-[visible=true]:scale-100 data-[visible=true]:opacity-100 dark:text-zinc-500'
        data-visible={copied}
        size={16}
      />
      <FiCopy
        className='transition-transform-opacity absolute scale-50 text-zinc-300 opacity-0 group-hover:text-zinc-500 data-[visible=true]:scale-100 data-[visible=true]:opacity-100 dark:text-zinc-500 dark:group-hover:text-zinc-400'
        data-visible={!copied}
        size={16}
      />
    </Button>
  );
};

import { FC } from 'react';
import { Button, ButtonProps } from 'components/ui/button';
import { useClipboard } from 'lib/hooks';

import { FiCheck, FiCopy } from 'react-icons/fi';

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
      className="absolute top-0 right-0 m-2 group-hover:border-zinc-500 dark:border-zinc-500 dark:group-hover:border-zinc-400 hover:border-2 group"
      size="icon"
      variant="outline"
      onClick={handleCopy}
      {...buttonProps}
    >
      <FiCheck
        className="absolute opacity-0 scale-50 text-zinc-300 dark:text-zinc-500 data-[visible=true]:opacity-100 data-[visible=true]:scale-100 transition-transform-opacity"
        data-visible={copied}
        size={16}
      />
      <FiCopy
        className="absolute opacity-0 scale-50 text-zinc-300 dark:text-zinc-500 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 data-[visible=true]:opacity-100 data-[visible=true]:scale-100 transition-transform-opacity"
        data-visible={!copied}
        size={16}
      />
    </Button>
  );
};

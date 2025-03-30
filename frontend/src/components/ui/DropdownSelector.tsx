import { Button } from '@/components/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { ChevronDown } from 'lucide-react';

export type DropdownSelectorProps = {
  placeholder: string;
  selectedField: string | null;
  onValueChange: (value: string) => void;
  listOfOptions: string[];
};
export const DropdownSelector = ({
  placeholder,
  selectedField,
  onValueChange,
  listOfOptions = [],
}: DropdownSelectorProps) => {
  const noOptions = listOfOptions.length === 0;
  return (
    <DropdownMenu data-testid={placeholder}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='w-64 min-w-fit justify-between border-gray-500'
        >
          {noOptions
            ? `No options found, please refresh or try a different vehicle`
            : (selectedField ?? placeholder)}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='max-h-60 w-64 overflow-y-auto'>
        <DropdownMenuSeparator />
        {Array.isArray(listOfOptions) && listOfOptions.length > 0 ? (
          <DropdownMenuRadioGroup
            value={selectedField || ''}
            onValueChange={onValueChange}
          >
            {listOfOptions.map((option) => (
              <DropdownMenuRadioItem
                key={option}
                value={option}
                className='cursor-pointer'
              >
                {option}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        ) : (
          <div className='p-2 text-center text-sm text-gray-500'>
            No options available
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

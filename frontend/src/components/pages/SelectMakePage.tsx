import { DropdownSelector } from '@/components/ui/DropdownSelector.tsx';
import { Button } from '@/components/ui/button';

type SelectMakePageProps = {
  ListOfMakes: string[];
  selectedMake: string | null;
  onMakeSelect: (make: string) => void;
  onNext: () => void;
};

export const SelectMakePage = ({
  ListOfMakes,
  selectedMake,
  onMakeSelect,
  onNext,
}: SelectMakePageProps) => {
  return (
    <div className='flex flex-col items-center gap-8 p-8'>
      <h1 className='text-2xl font-semibold'>Please Select Make</h1>
      <DropdownSelector
        placeholder={'Select a make'}
        selectedField={selectedMake}
        onValueChange={onMakeSelect}
        listOfOptions={ListOfMakes}
      />
      <div className='flex gap-4'>
        <Button
          variant='outline'
          className={'border-gray-500'}
          onClick={onNext}
          disabled={!selectedMake}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

import { DropdownSelector } from '@/components/ui/DropdownSelector.tsx';
import { Button } from '@/components/ui/button';

type SelectModelPageProps = {
  modelsList: string[];
  selectedModel: string | null;
  onModelSelect: (model: string) => void;
  onNext: () => void;
  onBack: () => void;
};
export const SelectModelPage = ({
  modelsList,
  selectedModel,
  onModelSelect,
  onNext,
  onBack,
}: SelectModelPageProps) => {
  return (
    <div className='flex flex-col items-center gap-8 p-8'>
      <h1 className='text-2xl font-semibold'>Select Model</h1>
      <DropdownSelector
        placeholder={'Select a model'}
        selectedField={selectedModel}
        onValueChange={onModelSelect}
        listOfOptions={modelsList}
      />

      <div className='flex gap-4'>
        <Button
          className='border-gray-500'
          variant='outline'
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          className='border-gray-500'
          variant='outline'
          onClick={onNext}
          disabled={!selectedModel}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

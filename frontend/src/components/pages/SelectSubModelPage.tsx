import { DropdownSelector } from '@/components/ui/DropdownSelector.tsx';
import { Button } from '@/components/ui/button';

type SelectSubModelPageProps = {
  subModelsList: string[];
  selectedSubModel: string | null;
  onSubModelSelect: (model: string) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
};

export const SelectSubModelPage = ({
  subModelsList,
  selectedSubModel,
  onSubModelSelect,
  onNext,
  onBack,
  onSkip,
}: SelectSubModelPageProps) => {
  return (
    <div className='flex flex-col items-center gap-8 p-8'>
      <h1 className='text-2xl font-semibold'>Select SubModel</h1>

      {subModelsList.length > 0 ? (
        <>
          <DropdownSelector
            placeholder={'Select a submodel'}
            selectedField={selectedSubModel}
            onValueChange={onSubModelSelect}
            listOfOptions={subModelsList}
          />

          <div className='flex gap-4'>
            <Button
              variant='outline'
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              variant='outline'
              onClick={onSkip}
            >
              Skip
            </Button>
            <Button
              variant='outline'
              onClick={onNext}
              disabled={!selectedSubModel}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <div className='flex flex-col items-center gap-4'>
          <p className='text-muted-foreground'>
            No submodels available for this model
          </p>
          <div className='flex gap-4'>
            <Button
              variant='outline'
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              variant='outline'
              onClick={onSkip}
            >
              Continue without submodel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

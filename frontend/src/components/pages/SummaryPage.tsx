import {
  StepState,
  VehicleDetails,
} from '@/components/VehiclePickingController.tsx';
import { Button } from '@/components/ui/button.tsx';

type SummaryPageProps = {
  make: string | null;
  model: string | null;
  submodel: string | null;
  modelDetails: VehicleDetails;
  onEdit: (step: StepState) => void;
  onBack: () => void;
};

export const SummaryPage = ({
  make,
  model,
  submodel,
  modelDetails,
  onEdit,
  onBack,
}: SummaryPageProps) => {
  const formatDateToMMYY = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${month}/${year}`;
  };

  return (
    <div className='flex flex-col items-center gap-8 p-8'>
      <h1 className='text-2xl font-semibold'>Summary</h1>

      <div className='flex w-full max-w-md flex-col gap-6'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex flex-col gap-2'>
            <span className='text-sm font-medium text-gray-500'>Make</span>
            <span className='text-lg'>{make}</span>
          </div>
          <Button
            size='sm'
            onClick={() => onEdit('initial')}
            className='w-16'
          >
            Edit
          </Button>
        </div>

        <div className='flex items-center justify-between gap-4'>
          <div className='flex flex-col gap-2'>
            <span className='text-sm font-medium text-gray-500'>Model</span>
            <span className='text-lg'>{model}</span>
          </div>
          <Button
            size='sm'
            onClick={() => onEdit('make-selected')}
            className='w-16'
          >
            Edit
          </Button>
        </div>

        <div className='flex items-center justify-between gap-4'>
          <div className='flex flex-col gap-2'>
            <span className='text-sm font-medium text-gray-500'>Submodel</span>
            <span className='text-lg'>{submodel}</span>
          </div>
          <Button
            size='sm'
            onClick={() => onEdit('model-selected')}
            className='w-16'
          >
            Edit
          </Button>
        </div>

        {modelDetails.date && (
          <div className='flex items-center justify-between gap-4'>
            <div className='flex flex-col gap-2'>
              <span className='text-sm font-medium text-gray-500'>
                Manufacture Date
              </span>
              <span className='text-lg'>
                {formatDateToMMYY(modelDetails.date)}
              </span>
            </div>
            <Button
              size='sm'
              onClick={() => onEdit('submodel-selected')}
              className='w-16'
            >
              Edit
            </Button>
          </div>
        )}

        {modelDetails.transmission && (
          <div className='flex items-center justify-between gap-4'>
            <div className='flex flex-col gap-2'>
              <span className='text-sm font-medium text-gray-500'>
                Transmission
              </span>
              <span className='text-lg'>{modelDetails.transmission}</span>
            </div>
            <Button
              size='sm'
              onClick={() => onEdit('submodel-selected')}
              className='w-16'
            >
              Edit
            </Button>
          </div>
        )}

        {modelDetails.fuel && (
          <div className='flex items-center justify-between gap-4'>
            <div className='flex flex-col gap-2'>
              <span className='text-sm font-medium text-gray-500'>
                Fuel Type
              </span>
              <span className='text-lg'>{modelDetails.fuel}</span>
            </div>
            <Button
              size='sm'
              onClick={() => onEdit('submodel-selected')}
              className='w-16'
            >
              Edit
            </Button>
          </div>
        )}

        {modelDetails.engineSize && (
          <div className='flex items-center justify-between gap-4'>
            <div className='flex flex-col gap-2'>
              <span className='text-sm font-medium text-gray-500'>
                Engine Size
              </span>
              <span className='text-lg'>{modelDetails.engineSize}</span>
            </div>
            <Button
              size='sm'
              onClick={() => onEdit('submodel-selected')}
              className='w-16'
            >
              Edit
            </Button>
          </div>
        )}
      </div>

      <div className='flex gap-4'>
        <Button
          className='border-gray-500'
          variant='outline'
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            alert('Find Parts');
          }}
        >
          Find Parts
        </Button>
      </div>
    </div>
  );
};

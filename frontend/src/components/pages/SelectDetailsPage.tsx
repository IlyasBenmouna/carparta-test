import { VehicleDetails } from '@/components/VehiclePickingController.tsx';
import { DropdownSelector } from '@/components/ui/DropdownSelector.tsx';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar.tsx';
import { PopoverTrigger } from '@/components/ui/popover.tsx';
import { cn } from '@/lib/utils.ts';
import { Popover, PopoverContent } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon, ChevronDownIcon } from 'lucide-react';

type SelectDetailsPageProps = {
  detailsList: {
    transmissions: string[];
    fuels: string[];
    engineSizes: string[];
  };
  selectedDetails: VehicleDetails;
  onDetailSelect: (type: keyof VehicleDetails, value: string | Date) => void;
  onNext: () => void;
  onBack: () => void;
};

export const SelectDetailsPage = ({
  detailsList,
  selectedDetails,
  onDetailSelect,
  onNext,
  onBack,
}: SelectDetailsPageProps) => {
  return (
    <div className='flex flex-col items-center gap-8 p-8'>
      <h1 className='text-2xl font-semibold'>Select Vehicle Details</h1>

      <div className='grid grid-rows-4 gap-12'>
        <div className='flex flex-col gap-3'>
          <h3>Date from:</h3>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[280px] justify-start text-left font-normal',
                  !selectedDetails.date && 'text-muted-foreground'
                )}
              >
                <div className='flex w-full gap-4'>
                  <CalendarIcon />
                  {selectedDetails.date ? (
                    format(selectedDetails.date, 'MMMM yyyy')
                  ) : (
                    <span>Pick a month & year</span>
                  )}
                  <ChevronDownIcon className='ml-auto' />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                className='border border-slate-50 bg-black'
                onMonthYearChange={(date) => {
                  if (date) {
                    onDetailSelect('date', date);
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex flex-col gap-3'>
          <h3>Transmission type:</h3>{' '}
          <DropdownSelector
            placeholder={'Select a transmission'}
            selectedField={selectedDetails.transmission}
            onValueChange={(transmissionType) =>
              onDetailSelect('transmission', transmissionType)
            }
            listOfOptions={detailsList.transmissions}
          />
        </div>

        <div className='flex flex-col gap-3'>
          <h3>Fuel type:</h3>
          <DropdownSelector
            placeholder={'Select a fuel type'}
            selectedField={selectedDetails.fuel}
            onValueChange={(fuel) => onDetailSelect('fuel', fuel)}
            listOfOptions={detailsList.fuels}
          />
        </div>

        <div className='flex flex-col gap-3'>
          <h3>Engine size:</h3>
          <DropdownSelector
            placeholder={'Select an engine size'}
            selectedField={selectedDetails.engineSize}
            onValueChange={(engineSize) =>
              onDetailSelect('engineSize', engineSize)
            }
            listOfOptions={detailsList.engineSizes}
          />
        </div>
      </div>

      <div className='flex gap-4'>
        <Button
          className={`border-gray-500`}
          variant='outline'
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          className={'border-gray-500'}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  onMonthYearChange?: (month: Date) => void;
  value?: Date;
};

function Calendar({
  className,
  onMonthYearChange,
  value,
  ...props
}: CalendarProps) {
  const defaultMonth = value || new Date();

  const handleMonthChange = (month: Date) => {
    const newDate = new Date(month.getFullYear(), month.getMonth(), 1);
    onMonthYearChange?.(newDate);
  };

  return (
    <DayPicker
      mode='single'
      defaultMonth={defaultMonth}
      month={value}
      selected={value}
      captionLayout='dropdown'
      fromYear={1990}
      toYear={2025}
      className={cn('p-3', className)}
      onMonthChange={handleMonthChange}
      showOutsideDays={false}
      hideWeekdays={true}
      classNames={{
        day: 'hidden',
        week: 'hidden',
        tbody: 'hidden',
        caption: 'block',
        nav: 'flex justify-between',
        dropdown: 'block',
      }}
      styles={{
        day: { display: 'none' },
        week: { display: 'none' },
        weeks: { display: 'none' },
        tbody: { display: 'none' },
        weekdays: { display: 'none' },
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft
            className={cn('h-4 w-4', className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight
            className={cn('h-4 w-4', className)}
            {...props}
          />
        ),
      }}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };

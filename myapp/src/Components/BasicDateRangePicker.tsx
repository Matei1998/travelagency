import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Dayjs } from 'dayjs';

interface BasicDateRangePickerProps {
  onDateChange: (dateRange: [Dayjs | null, Dayjs | null]) => void;
}

const BasicDateRangePicker: React.FC<BasicDateRangePickerProps> = ({ onDateChange }) => {
  const [value, setValue] = React.useState<[Dayjs | null, Dayjs | null]>([null, null]);

  const handleChange = (newValue: [Dayjs | null, Dayjs | null]) => {
    setValue(newValue);
    onDateChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']}>
        <DateRangePicker
          localeText={{ start: 'Check-in', end: 'Check-out' }}
          value={value}
          onChange={handleChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default BasicDateRangePicker;

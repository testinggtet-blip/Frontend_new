// components/DateTimepicker/index.js
import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { TextField, Box, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { dateTimePickerTheme } from './DateTimeStyles';

dayjs.extend(isSameOrAfter);

const DateTimepicker = ({
  label,
  onChangeval,
  dateSegment,
  name,
  value,
  readOnly,
}) => {
  const now = dayjs();
  const parsedValue = value ? dayjs(value) : null;

  const handleDateChange = (newDate) => {
    if (newDate?.isValid() && newDate.isSameOrAfter(now)) {
      onChangeval({
        target: { name, value: newDate.format('YYYY-MM-DD') },
      });
    }
  };

  const handleDateTimeChange = (newDateTime) => {
    const selected = dayjs(newDateTime);
    if (selected?.isValid() && selected.isSameOrAfter(now)) {
      onChangeval(selected.format('YYYY-MM-DD HH:mm:ss'));
    }
  };

  return (
    <ThemeProvider theme={dateTimePickerTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ pt: dateSegment ? 0 : 1, overflow: 'hidden' }}>
          {readOnly ? (
            <TextField
              label={label}
              value={
                parsedValue
                  ? dateSegment
                    ? parsedValue.format('DD/MM/YYYY')
                    : parsedValue.format('DD/MM/YYYY hh:mm A')
                  : ''
              }
              fullWidth
              InputProps={{
                readOnly: true,
                sx: {
                  pointerEvents: 'none',
                  color: '#000000',
                },
              }}
              InputLabelProps={{
                sx: {
                  color: '#000000',
                },
              }}
            />
          ) : dateSegment ? (
            <DatePicker
              label={label}
              minDate={now}
              value={parsedValue}
              format="DD/MM/YYYY"
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: false,
                  helperText: '',
                },
              }}
            />
          ) : (
            <DateTimePicker
              label={label}
              value={parsedValue}
              minDateTime={now}
              format="DD/MM/YYYY HH:mm"
              onChange={handleDateTimeChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: false,
                  helperText: '',
                },
              }}
              sx={{
                width: '100%',
                '& .MuiInputBase-input': {
                  color: '#000000',
                },
              }}
            />
          )}
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

DateTimepicker.propTypes = {
  label: PropTypes.string,
  onChangeval: PropTypes.func.isRequired,
  dateSegment: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
};

DateTimepicker.defaultProps = {
  label: '',
  dateSegment: false,
  name: '',
  value: '',
  readOnly: false,
};

export default DateTimepicker;
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Drawer,
} from '@mui/material';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { ConditionDrawerArray, WaitingTimeArray } from 'constants/appConstant';
import { CustomSelect } from 'components/CustomSelect';
import { MdDelete } from 'react-icons/md';

const AddCondition = ({ deletenode, data, close, saveData, open }) => {
  const [formState, setFormState] = useState({
    waitingTime: data.waitingTime,
    waitingTimeType: data.waitingTimeType,
    trigger: data.trigger,
  });

  const handleWaitingTimeSelect = (event) => {
    const { value } = event.target;
    setFormState((prev) => ({
      ...prev,
      waitingTime: Number(value),
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    saveData(formState);
  };

  return (
    <Drawer anchor={'right'} onClose={close} open={open}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 400,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            marginTop: 2,
            px: 2.5,
            borderBottom: '2px solid rgba(0,0,0,0.1)',
          }}
        >
          <Typography
            mb={2}
            variant="black_h4"
            sx={{ fontSize: 25 }}
            gutterBottom
          >
            Add Condition
          </Typography>

          <Button
            sx={{
              padding: 0.2,
              minWidth: 0,
              pointerEvents: 'all',
              marginTop: 0.6,
            }}
            variant="text"
            onClick={deletenode}
          >
            <MdDelete color="red" size={25} />
          </Button>
        </Box>

        <Box sx={{ mt: 2, px: 2 }}>
          <Typography variant="p" fontSize={'17px'}>
            Conditions will help to sort interested subscribers from unengaged
            recipients
          </Typography>
        </Box>

        <Box sx={{ mt: 2, px: 2 }}>
          <Typography mb={2} variant="black" sx={{ fontSize: 20 }}>
            Add Trigger
          </Typography>

          <Box my={1} ml={1} width={'100%'}>
            <RadioGroup
              name="trigger"
              value={formState?.trigger}
              onChange={handleInputChange}
            >
              <Box>
                <FormControlLabel
                  value="Opened"
                  control={<Radio />}
                  label="Opened"
                  sx={{
                    '.MuiFormControlLabel-label': {
                      fontWeight: '400',
                      fontSize: '1rem',
                      color: 'black',
                    },
                  }}
                />
              </Box>

              <Box>
                <FormControlLabel
                  value="button_clicked_1"
                  control={<Radio />}
                  label="Button Clicked 1"
                  sx={{
                    '.MuiFormControlLabel-label': {
                      fontWeight: '400',
                      fontSize: '1rem',
                      color: 'black',
                    },
                  }}
                />
              </Box>

              <Box>
                <FormControlLabel
                  value="button_clicked_2"
                  control={<Radio />}
                  label="Button Clicked 2"
                  sx={{
                    '.MuiFormControlLabel-label': {
                      fontWeight: '400',
                      fontSize: '1rem',
                      color: 'black',
                    },
                  }}
                />
              </Box>
            </RadioGroup>
          </Box>
        </Box>

        <Box sx={{ mt: 2, px: 2 }}>
          <Typography mb={3} variant="black" sx={{ fontSize: 20 }}>
            Waiting Time
          </Typography>

          <Box
            sx={{
              width: '100%',
              mt: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              px: 1,
            }}
          >
            <FormControl sx={{ minWidth: '47%' }}>
              <CustomSelect
                name="waitingTime"
                value={formState?.waitingTime}
                onChange={handleWaitingTimeSelect}
                options={WaitingTimeArray}
                sx={{ color: 'black' }}
              />
            </FormControl>

            <FormControl sx={{ minWidth: '40%' }}>
              <CustomSelect
                name="waitingTimeType"
                value={formState?.waitingTimeType}
                onChange={handleInputChange}
                options={ConditionDrawerArray}
                sx={{ color: 'black' }}
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          borderTop: '1px solid gray',
          width: '100%',
          padding: 1,
        }}
      >
        <Button
          variant="text"
          sx={{ border: '1px solid #033A32', color: '#033A32', fontSize: 15 }}
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="contained"
          sx={{ bgcolor: '#07826F', color: 'white', fontSize: 15 }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </Drawer>
  );
};

export default AddCondition;

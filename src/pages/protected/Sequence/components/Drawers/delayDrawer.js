import { Box, Button, Drawer, FormControl, Typography } from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { useState } from 'react';
import { CustomSelect } from 'components/CustomSelect';
import { ConditionDrawerArray, WaitingTimeArray } from 'constants/appConstant';
import { InnerTextField } from 'components/InputFields';

const AddDelay = ({ deletenode, data, close, open, saveData }) => {
  const [waitingTime, setWaitingTime] = useState(data.waitingTime ?? 0); // fallback to 1 second
  const [waitingTimeType, setWaitingTimeType] = useState(data.waitingTimeType);

  const handleWaitingTimeChange = (event) => {
    setWaitingTime(Number(event.target.value));
  };

  const handleWaitingTimeTypeChange = (event) => {
    setWaitingTimeType(event.target.value);
  };

  const handleSave = () => {
    saveData({ waitingTime: waitingTime, waitingTimeType: waitingTimeType });
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
            Add Delay
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

        <Box sx={{ mt: 2, px: 1.5 }}>
          <Typography ml={1} variant="black" sx={{ fontSize: 20 }}>
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
            <Box>
              <InnerTextField
                type="number"
                margin="dense"
                required
                name="waitingTime"
                value={waitingTime}
                onChange={handleWaitingTimeChange}
                inputProps={{ min: 0 }}
              />
            </Box>

            <FormControl sx={{ minWidth: '46%' }}>
              <CustomSelect
                name="waitingTimeType"
                value={waitingTimeType}
                onChange={handleWaitingTimeTypeChange}
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
          borderTop: '2px solid rgba(0,0,0,0.1)',
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

export default AddDelay;

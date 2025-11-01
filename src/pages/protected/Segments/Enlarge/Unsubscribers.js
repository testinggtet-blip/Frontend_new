import { Box, Stack, Typography } from '@mui/material';
import { InputField } from 'components/InputField/InputField';
import React from 'react';

const UnSubscriberDetails = () => {
  return (
    <Box>
    <Box
      sx={{
        border: '1px solid #B9B9B9',
        padding: 2,
        borderRadius: '10px'
      }}
    >
      <Box
        sx={{
          background: '#DDF8F4',
          borderRadius: '10px',
          display: 'flex',
          height: '50px',
          alignItems: 'center',
        }}
      >
        <Typography width={'33%'} pl={2} color={'#747272'}>
        Unsubscriber ID
        </Typography>
        <Box
          sx={{
            width: '1px',
            border: '1px solid',
            height: '30px',
            borderImageSource:
              'radial-gradient(50% 50% at 50% 50%, rgba(205, 205, 205, 0.6) 0%, rgba(89, 89, 89, 0.6) 50%, rgba(255, 255, 255, 0.006) 100%)',
            borderImageSlice: 1,
          }}
        />
        <Typography pl={2} color={'#747272'} width={'33%'}>
          Status
        </Typography>
        <Box
          sx={{
            width: '1px',
            border: '1px solid',
            height: '30px',
            borderImageSource:
              'radial-gradient(50% 50% at 50% 50%, rgba(205, 205, 205, 0.6) 0%, rgba(89, 89, 89, 0.6) 50%, rgba(255, 255, 255, 0.006) 100%)',
            borderImageSlice: 1,
          }}
        />
        <Typography pl={2} color={'#747272'}>
          Mobile
        </Typography>
      </Box>

      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        spacing={3}
        my={2}
      >
        <InputField isReadable={true} />
        <InputField isReadable={true} />
        <InputField isReadable={true} />
      </Stack>

      <Box
        sx={{
          background: '#F1F2F7',
          borderRadius: '10px',
          display: 'flex',
          height: '50px',
          alignItems: 'center',
          my: 1,
          width: '100%'
        }}
      >
        <Typography
          width={'33%'}
          pl={2}
          color={'#00519B'}
          className="underline"
        >
          Test
        </Typography>

        <Box display={'flex'} alignItems={'center'} width={'33%'}>
          <Box
            sx={{
              width: '1rem',
              height: '1rem',
              background:
                'radial-gradient(53.12% 53.12% at 50% 50%, #4FABFF 0%, rgba(255, 255, 255, 0.4) 100%)',
            }}
          />
          <Typography pl={2} color={'#747272'} >
            Subscribed
          </Typography>

          
        </Box>
        <Typography
          pl={2} color={'#747272'}
        >
          Oppo
        </Typography>
      </Box>
      <Box
        sx={{
          background: '#F1F2F7',
          borderRadius: '10px',
          display: 'flex',
          height: '50px',
          alignItems: 'center',
          my: 1,
        }}
      >
        <Typography
          width={'33%'}
          pl={2}
          color={'#00519B'}
          className="underline"
        >
          Test
        </Typography>
        <Box display={'flex'} alignItems={'center'} width={'33%'}>
          <Box
            sx={{
              width: '1rem',
              height: '1rem',
              background:
                'radial-gradient(53.12% 53.12% at 50% 50%, #FF5A4F 0%, rgba(255, 255, 255, 0.4) 100%)',
            }}
          />
          <Typography pl={2} color={'#747272'}>
            UnSubscribed
          </Typography>
        </Box>
        <Typography
          pl={2} color={'#747272'}
        >
          Oppo
        </Typography>
      </Box>
      
    </Box>
  </Box>
  );
};

export default UnSubscriberDetails;

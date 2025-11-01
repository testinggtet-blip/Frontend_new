import React from 'react';
import {
  Box,
  Grid,
  Typography,
  IconButton,
} from '@mui/material';
import { InnerTextField } from 'components/InputFields';
import { formatDateTime } from 'utils/commonFunctions';
import theme from 'styles/app.theme';
import { commonIcons } from 'constants/appConstant';
import toast from 'react-hot-toast';

const SubscriberDetails = ({ item }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied sucessfully');
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: '500px', md: '600px' },
        margin: 'auto',
        padding: theme.spacing(1),
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <InnerTextField
              label="Subscriber ID"
              value={item?.id || ''}
              readOnly
              fullWidth
            />
            <IconButton
              onClick={() => handleCopy(item?.id || '')}
              sx={{
                background: '#F1F2F7',
                borderRadius: '6px',
                padding: '6px',
                height: '45px',
                width: '45px',
                '&:hover': {
                  background: '#e0e0e0',
                },
              }}
            >
              <img
                src={commonIcons.copyIcon}
                alt="copy"
                style={{ width: 18, height: 18 }}
              />
            </IconButton>
          </Box>
        </Grid>

        {/* Other fields */}
        <Grid item xs={12} sm={6}>
          <InnerTextField
            label="Mobile"
            value={item?.mobile || ''}
            readOnly
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InnerTextField
            label="Platform"
            value={item?.platform || ''}
            readOnly
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InnerTextField
            label="Browser"
            value={item?.browser || ''}
            readOnly
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InnerTextField
            label="Subscription Id"
            value={item?.subscriptionId || ''}
            readOnly
            fullWidth
          />
        </Grid>
        <Grid item xs={12} lg={12} sm={6}>
          <InnerTextField
            label="Visitor URL"
            value={item?.visitedURL || ''}
            readOnly
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InnerTextField
            label="Time Zone"
            value={item?.timeZone || ''}
            readOnly
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InnerTextField
            label="Language"
            value={item?.language || ''}
            readOnly
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InnerTextField
            label="Visitor Id"
            value={item?.visitorId || ''}
            readOnly
            fullWidth
          />
        </Grid>
      </Grid>

      {/* Status + Created + Modified */}
      <Box marginTop={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.palette.background.default,
                padding: theme.spacing(1.5),
                borderRadius: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                color="black"
                fontWeight={600}
                marginBottom={0.5}
              >
                Status
              </Typography>
              <Typography variant="body2">
                {item?.status || 'Not specified'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4.5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.palette.background.default,
                padding: theme.spacing(1.5),
                borderRadius: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                color="black"
                fontWeight={600}
                marginBottom={0.5}
              >
                Created Time
              </Typography>
              <Typography variant="body2">
                {formatDateTime(item?.createdTime) || 'Not available'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4.5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.palette.background.default,
                padding: theme.spacing(1.5),
                borderRadius: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                color="black"
                fontWeight={600}
                marginBottom={0.5}
              >
                Modified Time
              </Typography>
              <Typography variant="body2">
                {formatDateTime(item?.modifiedTime) || 'Not modified'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SubscriberDetails;

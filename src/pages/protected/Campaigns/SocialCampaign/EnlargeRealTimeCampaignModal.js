import React, { useState } from 'react';
import { Box, Tabs } from '@mui/material';
import EnlargeModal, {
  a11yProps,
  CustomTab,
  CustomTabPanel,
  SvgSeparator,
} from 'components/EnlargeModal';
import RealtimeAnalytics from '../../Analytics/RealtimeAnalytics';
import CampaignDetails from './Enlarge/Details';
import ActivityRealtimeCampaign from './Enlarge/Activity';

const EnlargeCampaign = ({ open, onClose, item, refresh }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <EnlargeModal
      open={open}
      onCloseModal={onClose}
      title={'Realtime Notifications'}
    >
      <Box width={'100%'}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="campaign tabs"
            sx={{ minHeight: '40px' }}
          >
            <CustomTab label="Analytics" {...a11yProps(0)} />
            <SvgSeparator />
            <CustomTab label="Details" {...a11yProps(2)} />
            <SvgSeparator />
            <CustomTab label="Activity" {...a11yProps(4)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <RealtimeAnalytics />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <CampaignDetails item={item} refresh={refresh} />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={4}>
          <ActivityRealtimeCampaign />
        </CustomTabPanel>
      </Box>
    </EnlargeModal>
  );
};

export default EnlargeCampaign;

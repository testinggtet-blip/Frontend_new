import { Box, Icon, Tabs } from '@mui/material';
import EnlargeModal, {
  CustomTab,
  CustomTabPanel,
  SvgSeparator,
  a11yProps,
} from 'components/EnlargeModal';
import Campaign from './Enlarge/Campaign';
import Segment from './Enlarge/Segment';
import SubscriberDetails from './Enlarge/Subscriber';
import DetailIconInActive from '../../../assets/Icons/SideBar/details.png';
import DetailIconActive from '../../../assets/Icons/SideBar/details 1.png';
import CampaignIconInActive from '../../../assets/Icons/SideBar/send-1.png';
import CampaignIconActive from '../../../assets/Icons/SideBar/send.png';
import SegmentIconInActive from '../../../assets/Icons/SideBar/template-1.png';
import SegmentIconActive from '../../../assets/Icons/SideBar/template.png';
import ActivityIconInActive from '../../../assets/Icons/SideBar/activity-1.png';
import ActivityIconActive from '../../../assets/Icons/SideBar/activity.png';
import { useState } from 'react';

const EnlargeSubscribersModal = ({ open, onCloseModal, item, refresh }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRefresh = () => {
    refresh();
  };

  return (
    <EnlargeModal
      open={open}
      onCloseModal={onCloseModal}
      title={'Subscriber'}
      tabsRow={
        <Tabs value={value} onChange={handleChange}>
          <CustomTab
            label="Subscriber detail"
            {...a11yProps(0)}
            icon={
              <Icon sx={{ marginTop: '5px', marginRight: '0px !important' }}>
                <img
                  src={value === 0 ? DetailIconActive : DetailIconInActive}
                  alt="Subscribers Icon"
                  style={{ width: '20px', height: '20px' }}
                />
              </Icon>
            }
            iconPosition="start"
          />
          <SvgSeparator />
          <CustomTab
            label="Details"
            {...a11yProps(2)}
            icon={
              <Icon sx={{ marginTop: '5px', marginRight: '0px !important' }}>
                <img
                  src={value === 1 ? DetailIconActive : DetailIconInActive}
                  alt="Subscribers Icon"
                  style={{ width: '20px', height: '20px' }}
                />
              </Icon>
            }
            iconPosition="start"
          />
          <SvgSeparator />
          <CustomTab
            label="Activity"
            {...a11yProps(4)}
            icon={
              <Icon sx={{ marginTop: '5px', marginRight: '0px !important' }}>
                <img
                  src={value === 2 ? ActivityIconActive : ActivityIconInActive}
                  alt="Subscribers Icon"
                  style={{ width: '20px', height: '20px' }}
                />
              </Icon>
            }
            iconPosition="start"
          />
        </Tabs>
      }
    >
      <CustomTabPanel value={value} index={0}>
        <SubscriberDetails
          onClose={onCloseModal}
          refresh={refresh}
          item={item}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Segment />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Campaign />
      </CustomTabPanel>
    </EnlargeModal>
  );
};

export default EnlargeSubscribersModal;

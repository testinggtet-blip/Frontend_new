import { Box, Icon, Tabs } from '@mui/material';
import EnlargeModal, {
  CustomTab,
  CustomTabPanel,
  SvgSeparator,
  a11yProps,
} from 'components/EnlargeModal';
import React, { useState } from 'react';
import CampaignDetails from './Enlarge/Campaigns';
import Details from './Enlarge/Details';
import ActivitySegment from '../Segments/Enlarge/Activity';
import CampaignIconInActive from '../../../assets/Icons/SideBar/send-1.png';
import CampaignIconActive from '../../../assets/Icons/SideBar/send.png';
import ActivityIconInActive from '../../../assets/Icons/SideBar/activity-1.png';
import ActivityIconActive from '../../../assets/Icons/SideBar/activity.png';
import DetailIconInActive from '../../../assets/Icons/SideBar/details.png';
import DetailIconActive from '../../../assets/Icons/SideBar/details 1.png';
import ActivityLogViewer from '../Segments/Enlarge/Activity';

const EnlargeSegmentModal = ({ open, onCloseModal, refresh, item }) => {
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
      title={'Segment'}
      tabsRow={
        <Tabs value={value} onChange={handleChange}>
          {/* <CustomTab
              label="Subscribers"
              {...a11yProps(0)}
              icon={
                <Icon sx={{ marginTop: '5px', marginRight: '0px !important' }}>
                  <img
                    src={
                      value === 0
                        ? SubscribersIconActive
                        : SubscribersIconInActive
                    }
                    alt="Subscribers Icon"
                    style={{ width: '20px', height: '20px' }}
                  />
                </Icon>
              }
              iconPosition="start"
              segtext="true"
            />
            <SvgSeparator />
            <CustomTab
              label="Unsubscribers"
              {...a11yProps(2)}
              icon={
                <Icon sx={{ marginTop: '5px', marginRight: '0px !important' }}>
                  <img
                    src={
                      value === 2
                        ? UnsubscribersIconActive
                        : UnsubscribersIconInActive
                    }
                    alt="Unsubscribers Icon"
                    style={{ width: '20px', height: '20px' }}
                  />
                </Icon>
              }
              iconPosition="start"
              segtext="true"
            /> */}
          {/* <SvgSeparator /> */}
          <CustomTab
            label="Details"
            {...a11yProps(0)}
            icon={
              <Icon sx={{ marginTop: '5px', marginRight: '0px !important' }}>
                <img
                  src={value === 0 ? DetailIconActive : DetailIconInActive}
                  alt="Campaign Icon"
                  style={{ width: '20px', height: '20px' }}
                />
              </Icon>
            }
            iconPosition="start"
          />
          <SvgSeparator />

          <CustomTab
            label="Campaigns"
            {...a11yProps(2)}
            icon={
              <Icon sx={{ marginTop: '5px', marginRight: '0px !important' }}>
                <img
                  src={value === 2 ? CampaignIconActive : CampaignIconInActive}
                  alt={'Campaign Icon'}
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
                  src={value === 4 ? ActivityIconActive : ActivityIconInActive}
                  alt={'Activity Icon'}
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
        <Details itemId={item} refresh={handleRefresh} onClose={onCloseModal} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <CampaignDetails />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={4}>
        <ActivityLogViewer
          item={item}
          moduleName={'Segment'}
          excluded={['options', 'id', 'userId', 'conditions']}
        />
      </CustomTabPanel>
    </EnlargeModal>
  );
};

export default EnlargeSegmentModal;

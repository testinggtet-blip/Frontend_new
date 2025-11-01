import React, { useEffect, useState } from 'react';
import { Box, Icon, Tabs } from '@mui/material';
import EnlargeModal, {
  a11yProps,
  CustomTab,
  CustomTabPanel,
  SvgSeparator,
} from 'components/EnlargeModal';

import DetailIconInActive from '../../../../assets/Icons/SideBar/details.png';
import DetailIconActive from '../../../../assets/Icons/SideBar/details 1.png';
import ActivityIconInActive from '../../../../assets/Icons/SideBar/activity-1.png';
import ActivityIconActive from '../../../../assets/Icons/SideBar/activity.png';
import Details from './Enlarge/Details';
import SocialDetails from '../SocialCampaign/Enlarge/Details';
import Activity from './Enlarge/Activity';

const EnlargeCampaign = ({
  open,
  onClose,
  item,
  templates,
  segments,
  refresh,
  fetchSegment,
  fetchTemplate,
}) => {
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
      onCloseModal={onClose}
      title={'Campaign'}
      tabsRow={
        <Tabs value={value} onChange={handleChange}>
          <CustomTab
            label="Details"
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
            label="Activity"
            {...a11yProps(2)}
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
        {item?.type === 'Social_Proof' ? (
          <SocialDetails
            item={item}
            onClose={onClose}
            refresh={handleRefresh}
            templates={templates}
            segments={segments}
            fetchTemplate={fetchTemplate}
            fetchSegment={fetchSegment}
          />
        ) : (
          <Details
            item={item}
            onClose={onClose}
            refresh={handleRefresh}
            templates={templates}
            segments={segments}
            fetchTemplate={fetchTemplate}
            fetchSegment={fetchSegment}
          />
        )}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <Activity item={item} />
      </CustomTabPanel>
    </EnlargeModal>
  );
};

export default EnlargeCampaign;

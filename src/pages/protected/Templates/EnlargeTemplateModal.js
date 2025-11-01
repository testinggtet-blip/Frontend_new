import { Box, Icon, Tabs } from '@mui/material';
import EnlargeModal, {
  CustomTab,
  CustomTabPanel,
  SvgSeparator,
  a11yProps,
} from 'components/EnlargeModal';
import Analytics from './Enlarge/Analytics';
import Details from './Enlarge/Details';
import Preview from './Enlarge/Preview';
import Activity from './Enlarge/Activity';
import PreviewIconInActive from '../../../assets/Icons/SideBar/preview.png';
import PreviewIconActive from '../../../assets/Icons/SideBar/preview 1.png';
import AnalyticsIconInActive from '../../../assets/Icons/SideBar/device-analytics.png';
import AnalyticsIconActive from '../../../assets/Icons/SideBar/device-analytics 1.png';
import DetailIconInActive from '../../../assets/Icons/SideBar/details.png';
import DetailIconActive from '../../../assets/Icons/SideBar/details 1.png';
import ActivityIconInActive from '../../../assets/Icons/SideBar/activity-1.png';
import ActivityIconActive from '../../../assets/Icons/SideBar/activity.png';
import { useState } from 'react';

const EnlargeTemplateModal = ({ open, onCloseModal, item, refresh }) => {
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
      title={'Template'}
      tabsRow={
        <Tabs value={value} onChange={handleChange}>
          <CustomTab
            label="Analytics"
            {...a11yProps(0)}
            icon={
              <Icon sx={{ marginTop: '5px', marginRight: '0px !important' }}>
                <img
                  src={
                    value === 0 ? AnalyticsIconActive : AnalyticsIconInActive
                  }
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
                  src={value === 2 ? DetailIconActive : DetailIconInActive}
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
                  src={value === 4 ? ActivityIconActive : ActivityIconInActive}
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
        <Analytics />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <Details item={item} onClose={onCloseModal} refresh={refresh} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={4}>
        <Activity item={item} />
      </CustomTabPanel>
    </EnlargeModal>
  );
};

export default EnlargeTemplateModal;

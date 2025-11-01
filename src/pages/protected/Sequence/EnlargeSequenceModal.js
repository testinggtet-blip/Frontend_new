import EnlargeModal, {
  a11yProps,
  CustomTab,
  CustomTabPanel,
  SvgSeparator,
} from 'components/EnlargeModal';
import React, { useState } from 'react';
import DetailIconInActive from '../../../assets/Icons/SideBar/details.png';
import DetailIconActive from '../../../assets/Icons/SideBar/details 1.png';
import ActivityIconInActive from '../../../assets/Icons/SideBar/activity-1.png';
import ActivityIconActive from '../../../assets/Icons/SideBar/activity.png';
import { Icon, Tabs } from '@mui/material';
import ActivityLogViewer from './Enlarge/Activity';
import Details from './Enlarge/Details';

const EnlargeSequenceModal = ({ open, onClose, item, refresh, segments }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <EnlargeModal
      open={open}
      onCloseModal={onClose}
      title={'Sequence'}
      tabsRow={
        <Tabs value={value} onChange={handleChange}>
          {/* <CustomTab
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
          <SvgSeparator /> */}

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
            label="Activity"
            {...a11yProps(2)}
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
        <Details item={item} segments={segments} refresh={refresh} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <ActivityLogViewer
          item={item} // The current record object (must have .id)
          moduleName={'Sequence'} // Or whatever your module is named
          excluded={['id', 'modifiedTime']} // Exclude fields from diff as needed (optional)
        />
      </CustomTabPanel>
    </EnlargeModal>
  );
};

export default EnlargeSequenceModal;

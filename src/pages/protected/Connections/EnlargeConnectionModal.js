import { Box, Icon, Tabs } from '@mui/material';
import EnlargeModal, {
  a11yProps,
  CustomTab,
  CustomTabPanel,
  SvgSeparator,
} from 'components/EnlargeModal';
import { useState } from 'react';
import { Welcome } from './Enlarge/Welcome';
import { CustomPrompt } from './Enlarge/CustomPrompt';
import { Detail } from './Enlarge/Detail';
import Activity from './Enlarge/Activity';
import DetailIconInActive from '../../../assets/Icons/SideBar/details.png';
import DetailIconActive from '../../../assets/Icons/SideBar/details 1.png';
import ActivityIconInActive from '../../../assets/Icons/SideBar/activity-1.png';
import ActivityIconActive from '../../../assets/Icons/SideBar/activity.png';
import CustomPromptIconInActive from '../../../assets/Icons/SideBar/custom prompt black.png';
import CustomPromptIconActive from '../../../assets/Icons/SideBar/custom prompt.png';
import TemplateIconInActive from '../../../assets/Icons/SideBar/template-1.png';
import TemplateIconActive from '../../../assets/Icons/SideBar/template.png';

const EnlargeConnectionModal = ({
  open,
  close,
  item,
  refresh,
  initialLoading,
  welcomeTemplate,
  refreshWelcomeTemplate,
  customPrompt,
  refreshCustomPrompt,
  setCustomPrompts,
  setWelcomeTemplates,
}) => {
  const [value, setValue] = useState(0);
  const [shouldFetchWelcome, setShouldFetchWelcome] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 2) {
      setShouldFetchWelcome(true);
    }
  };

  return (
    <EnlargeModal
      open={open}
      onCloseModal={close}
      title="Connection"
      tabsRow={
        <Tabs value={value} onChange={handleChange}>
          <CustomTab
            label="Details"
            {...a11yProps(0)}
            icon={
              <Icon sx={{ mt: '5px', mr: '0px !important' }}>
                <img
                  src={value === 0 ? DetailIconActive : DetailIconInActive}
                  alt="Details Icon"
                  style={{ width: '20px', height: '20px' }}
                />
              </Icon>
            }
            iconPosition="start"
            segtext="true"
          />

          <SvgSeparator />

          <CustomTab
            label="Custom Prompt"
            {...a11yProps(2)}
            icon={
              <Icon sx={{ mt: '5px', mr: '0px !important' }}>
                <img
                  src={
                    value === 2
                      ? CustomPromptIconActive
                      : CustomPromptIconInActive
                  }
                  alt="Custom Prompt Icon"
                  style={{ width: '20px', height: '20px' }}
                />
              </Icon>
            }
            iconPosition="start"
            segtext="true"
          />

          <SvgSeparator />

          <CustomTab
            label="Welcome Template"
            {...a11yProps(4)}
            icon={
              <Icon sx={{ mt: '5px', mr: '0px !important' }}>
                <img
                  src={value === 4 ? TemplateIconActive : TemplateIconInActive}
                  alt="Template Icon"
                  style={{ width: '20px', height: '20px' }}
                />
              </Icon>
            }
            iconPosition="start"
            segtext="true"
          />

          <SvgSeparator />

          <CustomTab
            label="Activity"
            {...a11yProps(6)}
            icon={
              <Icon sx={{ mt: '5px', mr: '0px !important' }}>
                <img
                  src={value === 6 ? ActivityIconActive : ActivityIconInActive}
                  alt="Activity Icon"
                  style={{ width: '20px', height: '20px' }}
                />
              </Icon>
            }
            iconPosition="start"
            segtext="true"
          />
        </Tabs>
      }
    >
      {/* Tab Panels go inside the scrollable body */}
      <CustomTabPanel value={value} index={0}>
        <Detail item={item} refresh={refresh} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <CustomPrompt
          initialLoading={initialLoading}
          customPrompt={customPrompt}
          refreshCustomPrompt={refreshCustomPrompt}
          setCustomPrompts={setCustomPrompts}
        />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={4}>
        <Welcome
          item={item}
          welcomeTemplate={welcomeTemplate}
          refreshWelcomeTemplate={refreshWelcomeTemplate}
          setWelcomeTemplates={setWelcomeTemplates}
        />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={6}>
        <Activity item={item} />
      </CustomTabPanel>
    </EnlargeModal>
  );
};

export default EnlargeConnectionModal;

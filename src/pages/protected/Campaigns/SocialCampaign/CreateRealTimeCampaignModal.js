import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  Modal,
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Card,
  Switch,
  Tab,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { Loading } from 'components/Loading/Loading';
import { SideDrawer } from 'components/SideDrawer';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ClearIcon from '@mui/icons-material/Clear';
import toast from 'react-hot-toast';
import Preview from './Enlarge/Preview';
import CreateRealCampaign from './CreateRealCampaign';

const CreateRealTimeCampaign = ({ open, onClose, refresh, campaignRealName }) => {
  const [state, setState] = useState({
    campaignName: campaignRealName || '',
    messageText: '',
    status: false,
    allowClose: false,
    loading: false,
    isPreview: false,
    tabValue: '1',
    searchTerm: '',
    selectedSegment: null,
    showDropdown: false,
    url: '',
    formData: {
      title: '',
      description: '',
      mobilePosition: '',
      allowButtonText: '',
      allowButtonTextColor: '',
      allowButtonBackgroundColor: '',
      laterButtonText: '',
    },
    image: { logo: null },
    segments: [
      { id: 1, name: 'Segment 1' },
      { id: 2, name: 'Segment 2' },
      { id: 3, name: 'Segment 3' },
    ],
  });

  const segmentOptions = [
    { id: 1, name: 'Segment 1' },
    { id: 2, name: 'Segment 2' },
    { id: 3, name: 'Segment 3' },
  ];

  useEffect(() => {
    if (open) {
      setState((prevState) => ({
        ...prevState,
        campaignName: '',
        messageText: '',
        status: false,
      }));
    }
  }, [open]);

  const handleRealTimeChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleFormDataChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        [key]: value,
      },
    }));
  };

  const handleRealTimeSubmit = async (event) => {
    event.preventDefault();
    const { campaignName, messageText, status } = state;
    const campaignData = { campaignName, messageText, status };
    handleRealTimeChange('loading', true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Static campaign data submitted:', campaignData);
      refresh(campaignData);
      onClose();
      toast.success('Static campaign created successfully');
    } catch (error) {
      console.error('Error creating static campaign:', error);
      toast.error('Error creating static campaign');
    } finally {
      handleRealTimeChange('loading', false);
    }
  };

  const handleTabChange = (event, newValue) => {
    handleRealTimeChange('tabValue', newValue);
  };

  const handleInputFocus = () => {
    handleRealTimeChange('showDropdown', true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      handleRealTimeChange('showDropdown', false);
    }, 100);
  };

  const debounceSearch = useCallback((e) => {
    handleRealTimeChange('searchTerm', e.target.value);
  }, []);

  const filteredResults = useMemo(() => {
    return segmentOptions.filter((segment) =>
      segment.name.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  }, [state.searchTerm]);

  const handleSegmentSelect = (segment) => {
    handleRealTimeChange('selectedSegment', segment);
    handleRealTimeChange('searchTerm', segment.name);
    handleRealTimeChange('showDropdown', false);
  };

  const handleClear = () => {
    handleRealTimeChange('searchTerm', '');
    handleRealTimeChange('selectedSegment', null);
    handleRealTimeChange('showDropdown', false);
  };

  return (
    <SideDrawer
      open={open}
      onClose={onClose}
      title="Realtime Notifications"
      handleRealTimeSubmit={handleRealTimeSubmit}
      EyeIcon={true}
      isPreview={state.isPreview}
      setIsPreview={(value) => handleRealTimeChange('isPreview', value)}
    >
      {state.loading && <Loading state={state.loading} />}

      {!state.isPreview && (
        <CreateRealCampaign
          campaignName={state.campaignName}
          setCampaignName={(value) => handleRealTimeChange('campaignName', value)}
          triggerFor={state.triggerFor}
          setTriggerFor={(value) => handleRealTimeChange('triggerFor', value)}
          searchTerm={state.searchTerm}
          debounceSearch={debounceSearch}
          handleInputFocus={handleInputFocus}
          handleClear={handleClear}
          ControlPointIcon={ControlPointIcon}
          showDropdown={state.showDropdown}
          filteredResults={filteredResults}
          handleSegmentSelect={handleSegmentSelect}
          allowClose={state.allowClose}
          setAllowClose={(value) => handleRealTimeChange('allowClose', value)}
          status={state.status}
          setStatus={(value) => handleRealTimeChange('status', value)}
          setSearchTerm={(value) => handleRealTimeChange('searchTerm', value)}
          messageText={state.messageText}
          setMessageText={(value) => handleRealTimeChange('messageText', value)}
        />
      )}
      {state.isPreview && <Preview />}
    </SideDrawer>
  );
};

export default CreateRealTimeCampaign;

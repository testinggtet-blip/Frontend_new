import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Drawer,
  TextField,
  Typography,
  Autocomplete,
  IconButton,
} from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { FetchAllTemplate } from 'Api/Api';
import AddBox from '@mui/icons-material/AddBox';
// import { CampaignStyle } from '../../../WebCampaigns/Style';
import CreateTemplateModal from 'pages/protected/Templates/NotificationTemplateModal';
import { CampaignStyle } from 'pages/protected/Campaigns/WebCampaign/Style';

const AddNotification = ({ deletenode, close, open, saveData }) => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [errors, setErrors] = useState(false);

  const getTemplates = async () => {
    try {
      let response = await FetchAllTemplate({
        page: 1,
        limit: 25,
        welcomeTemplate: false,
      });
      if (response?.data?.status === true) {
        setTemplates(response?.data?.data);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };
  useEffect(() => {
    getTemplates();
  }, [open]);

  const handleSave = () => {
    if (!selectedTemplate) {
      setErrors(true);
    } else {
      setErrors(false);
      saveData({
        templateId: {
          id: selectedTemplate?.id,
          templateName: selectedTemplate?.templateName,
        },
      });
    }
  };

  return (
    <Drawer anchor={'right'} onClose={close} open={open}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 400,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 2,
            px: 2.5,
            borderBottom: '2px solid rgba(0,0,0,0.1)',
          }}
        >
          <Typography
            my={1}
            variant="black_h4"
            sx={{ fontSize: 25 }}
            gutterBottom
          >
            Add Template
          </Typography>

          <Button
            sx={{
              padding: 0.2,
              minWidth: 0,
              pointerEvents: 'all',
            }}
            variant="text"
            onClick={deletenode}
          >
            <MdDelete color="red" size={25} />
          </Button>
        </Box>

        <Box
          sx={{
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            gap: 1,
            mb: 1,
            px: 2,
          }}
        >
          <Autocomplete
            disablePortal
            options={templates}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.templateName}
            value={selectedTemplate || null}
            onChange={(e, newValue) => {
              setSelectedTemplate(newValue);
            }}
            sx={CampaignStyle.autoSelectStyle}
            noOptionsText="No match found. Please create one."
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Template"
                error={errors && !selectedTemplate}
                helperText={errors && !selectedTemplate && 'Field required'}
                InputLabelProps={{ style: { color: 'black' } }}
                InputProps={{ ...params.InputProps, style: { color: 'black' } }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} style={{ color: 'black' }}>
                {option.templateName}
              </li>
            )}
          />
          <IconButton
            sx={{
              height: '56px',
              width: '56px',
              mb: 0,
            }}
            onClick={() => setTemplateModalOpen(true)}
          >
            {' '}
            <AddBox
              sx={{
                color: '#058270',
                height: '50px',
                width: '50px',
                // marginBottom: '10px',
              }}
            />
          </IconButton>
          <CreateTemplateModal
            refresh={getTemplates}
            open={templateModalOpen}
            onClose={() => setTemplateModalOpen(false)}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          borderTop: '1px solid gray',
          width: '100%',
          padding: 1,
        }}
      >
        <Button
          variant="text"
          sx={{ border: '1px solid #033A32', color: '#033A32', fontSize: 15 }}
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="contained"
          sx={{ bgcolor: '#07826F', color: 'white', fontSize: 15 }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </Drawer>
  );
};

export default AddNotification;

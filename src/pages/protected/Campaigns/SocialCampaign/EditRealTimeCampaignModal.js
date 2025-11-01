import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Switch,
  Typography,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import toast from 'react-hot-toast';
import { Loading } from 'components/Loading/Loading';
import { SideDrawer } from 'components/SideDrawer';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { formatDateTime } from 'utils/commonFunctions';
import { UpdateCampaign } from 'Api/Api';
import { TemplateStyles } from '../../Templates/Style';
import Preview from './Enlarge/Preview';
import CreateSegmentModal from '../../Segments/CreateSegmentModal';

const EditRealTimeCampaign = ({
  open,
  onClose,
  itemId,
  refresh,
  isPreview,
  setIsPreview,
  segments,
  isDetail = false
}) => {
  const [campaignDetails, setCampaignDetails] = useState(
    {
      id: itemId?.id || null,
      campaignName: itemId?.campaignName || '',
      type: 'Social_Proof',
      triggerFor: itemId?.triggerFor || '',
      status: itemId?.status || '',
      whereToDisplay: itemId?.whereToDisplay || '',
      displayUrls: itemId?.displayUrls || [''],
      messageText: itemId?.messageText || '',
      notificationPosition: itemId?.notificationPosition || '',
      closable: itemId?.closable || false,
      redirectingNotification: itemId?.redirectingNotification || '',
      displayDuration: itemId?.displayDuration || 0,
      segmentID: itemId?.segmentID || null,
      logo: itemId?.logo || '',
    }
  );
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState(itemId?.segment?.segmentName || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const [previewImage, setPreviewImage] = useState({ logo: null });
  const [tabValue, setTabValue] = useState('1');
  const [segmentModalOpen, setSegmentModalOpen] = useState(false);

  const handleEditChange = () => setEdit(!edit);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleToggle = (e) => {
    const name = e.target.name;
    if (name === 'status') {
      const newStatus = campaignDetails?.status === 'Active' ? 'Inactive' : 'Active';
      setCampaignDetails((prevState) => ({
        ...prevState,
        status: newStatus,
      }));
    }
  };


  const handleSubmit = async () => {
    const newErrors = {
      campaignName: !campaignDetails.campaignName?.trim(),
      triggerFor: !campaignDetails.triggerFor,
      messageText: !campaignDetails.messageText?.trim(),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        const { campaignName: spName, segmentID, status, type, logo, ...rest } = campaignDetails;

        // Create FormData for file upload
        let formData = new FormData();

        // Add basic campaign data
        formData.append('id', campaignDetails.id);
        formData.append('campaignName', spName || '');
        formData.append('segmentID', segmentID != null ? segmentID : 0);
        formData.append('status', 'Active');
        formData.append('type', 'Social_Proof');
        formData.append('templateID', 0);
        formData.append('frequency', 'now');
        formData.append('frequencyDateTime', '2025-08-13T22:19');
        formData.append('data', JSON.stringify({ ...rest }));

        // Add logo file if it exists
        if (logo && logo instanceof File) {
          formData.append('logo', logo);
        } else if (logo && typeof logo === 'string') {
          // If logo is a string (base64), convert it to a file
          try {
            const response = await fetch(logo);
            const blob = await response.blob();
            const file = new File([blob], 'logo.png', { type: 'image/png' });
            formData.append('logo', file);
          } catch (error) {
            // If conversion fails, send as string
            formData.append('logo', logo);
          }
        }

        // Call UpdateCampaign API
        const response = await UpdateCampaign(campaignDetails?.id, formData);
        if (response?.data?.status === true) {
          toast.success(response?.data?.message || 'Campaign updated successfully!');
          refresh();
          onClose();
        } else {
          toast.error('Failed to update campaign');
        }
      } catch (error) {
        console.error('Error updating campaign:', error);
        toast.error(error?.response?.data?.message || 'Error updating campaign');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSegmentSelect = (segment) => {
    setSearchTerm(segment.segmentName);
    setShowDropdown(false);
    setCampaignDetails(prev => ({ ...prev, segmentID: segment?.id || null }));
  };


  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };

  const handleClear = () => {
    setSearchTerm('');
    setShowDropdown(false);
    setCampaignDetails(prev => ({ ...prev, segmentID: null }));
  };

  // Use the actual segment from the response or provide default segments
  const filteredSegments = segments;

  // Handle file upload for logo
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'logo' && files[0]) {
      const file = files[0];
      setCampaignDetails(prev => ({
        ...prev,
        logo: file
      }));

      // Create URL for preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage({
        logo: objectUrl,
      });
    }
  };

  useEffect(() => {
    if (itemId && open) {
      // Parse the data field from JSON string
      let parsedData = {};
      try {
        if (itemId.data) {
          parsedData = JSON.parse(itemId.data);
        }
      } catch (error) {
        console.error('Error parsing campaign data:', error);
        parsedData = {};
      }

      // Only keep declared keys in campaignDetails
      setCampaignDetails({
        id: itemId?.id ?? null,
        campaignName: itemId?.campaignName || '',
        type: 'Social_Proof',
        triggerFor: parsedData.triggerFor || '',
        status: itemId?.status || '',
        whereToDisplay: parsedData.whereToDisplay || '',
        displayUrls: parsedData.displayUrls || [''],
        messageText: parsedData.messageText || '',
        notificationPosition: parsedData.notificationPosition || '',
        closable: parsedData.closable ?? false,
        redirectingNotification: parsedData.redirectingNotification || '',
        displayDuration: parsedData.displayDuration ?? 0,
        segmentID: itemId?.segmentId ?? null,
        logo: itemId?.logo || '',
      });

      setSearchTerm(itemId?.segment?.segmentName || '');
      setShowDropdown(false);

      // Set logo preview if logo exists
      if (itemId?.logo) {
        setPreviewImage({
          logo: itemId.logo,
        });
      }
    }
    setErrors({});
  }, [itemId, open]);

  return (
    <>
      <Loading state={loading} />
      <SideDrawer
        open={open}
        onClose={onClose}
        isDetail={isDetail}
        edit={edit}
        setEdit={handleEditChange}
        title={!edit && isDetail ? 'View Campaign' : 'Edit Campaign'}
        handleSubmit={handleSubmit}
        EyeIcon={true}
        isPreview={isPreview}
        setIsPreview={setIsPreview}
      >
        {!isPreview && (
          <Box>
            <Box width="90%">
              <TextField
                label="Conversion Title"
                variant="outlined"
                name='campaignName'
                fullWidth
                required
                value={campaignDetails.campaignName || ''}
                onChange={(e) => {
                  setCampaignDetails(prev => ({ ...prev, campaignName: e.target.value }));
                }}
                margin="normal"
                error={errors.campaignName}
                helperText={errors.campaignName ? 'Field required' : ''}
                disabled={!edit && isDetail}
                InputProps={{
                  style: {
                    borderRadius: '8px',
                    color: 'black'
                  },
                  inputProps: {
                    style: { color: 'black' },
                  },
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                  shrink: true,
                  required: false
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: errors.campaignName ? 'red' : 'black',
                    },
                    '&:hover fieldset': {
                      borderColor: errors.campaignName ? 'red' : 'black',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: errors.campaignName ? 'red' : 'red',
                    },
                  },
                }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
                <TextField
                  select
                  label="Trigger for"
                  name='triggerFor'
                  variant="outlined"
                  fullWidth
                  required
                  margin="normal"
                  value={campaignDetails.triggerFor || ''}
                  onChange={(e) => {
                    setCampaignDetails(prev => ({ ...prev, triggerFor: e.target.value }));
                  }}
                  error={errors.triggerFor}
                  helperText={errors.triggerFor ? 'Field required' : ''}
                  disabled={!edit && isDetail}
                  InputProps={{
                    style: {
                      borderRadius: '8px',
                      color: 'black',
                    },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                    required: false,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: errors.triggerFor ? 'red' : 'black',
                      },
                      '&:hover fieldset': {
                        borderColor: errors.triggerFor ? 'red' : 'black',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: errors.triggerFor ? 'red' : 'red',
                      },
                      '& .MuiSelect-select': {
                        color: 'black',
                      },
                    },
                  }}
                >
                  <MenuItem value="" style={{ color: 'black' }}>Select an option</MenuItem>
                  <MenuItem value="Existing" style={{ color: 'black' }}>Existing</MenuItem>
                  <MenuItem value="New" style={{ color: 'black' }}>New</MenuItem>
                </TextField>

                {campaignDetails.triggerFor === 'Existing' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
                    <TextField
                      label="Select Segment"
                      variant="outlined"
                      required
                      margin="normal"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      disabled={!edit && isDetail}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClear} title="Clear" disabled={!edit && isDetail}>
                              <ClearIcon sx={{ color: 'black' }} />
                            </IconButton>
                            <IconButton onClick={handleInputFocus} title="Dropdown" disabled={!edit && isDetail}>
                              <ArrowDropDownIcon sx={{ color: 'black' }} />
                            </IconButton>
                          </InputAdornment>
                        ),
                        style: { borderRadius: '8px', color: 'black' },
                      }}
                      InputLabelProps={{
                        shrink: true,
                        style: { color: 'black' },
                        required: false,
                      }}
                      sx={{
                        width: '85%',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'black',
                          },
                          '&:hover fieldset': {
                            borderColor: 'black',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'black',
                          },
                          '& .MuiInputBase-input': {
                            color: 'black',
                          },
                        },
                      }}
                    />

                    <IconButton
                      onClick={() => setSegmentModalOpen(true)}
                      title="Add Segment"
                      disabled={!edit && isDetail}
                      sx={{
                        ml: 1,
                        mt: '13px',
                        color: 'black',
                      }}
                    >
                      <ControlPointIcon sx={{ '& path': { fill: '#058270' }, fontSize: 35 }} />
                    </IconButton>

                    {showDropdown && (
                      <Box
                        sx={{
                          maxHeight: '200px',
                          overflowY: 'auto',
                          border: '1px solid #ccc',
                          borderRadius: '8px',
                          mt: 1,
                          position: 'absolute',
                          zIndex: 1000,
                          width: '85%',
                          bgcolor: 'white',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          top: '100%',
                          left: 0,
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <List>
                          {filteredSegments.length > 0 ? (
                            filteredSegments.map((segment) => (
                              <ListItem
                                button
                                key={segment.id}
                                onClick={() => handleSegmentSelect(segment)}
                                sx={{
                                  '& .MuiListItemText-primary': {
                                    color: 'black',
                                  },
                                }}
                              >
                                <ListItemText primary={segment.segmentName} />
                              </ListItem>
                            ))
                          ) : (
                            <ListItem>
                              <ListItemText primary="No segments found" sx={{ color: 'black' }} />
                            </ListItem>
                          )}
                        </List>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>

              <Box>
                <Typography variant="h9">Status</Typography>
                <Switch
                  name="status"
                  size="large"
                  checked={campaignDetails.status === 'Active'}
                  onChange={handleToggle}
                  disabled={!edit && isDetail}
                />
              </Box>

              <TextField
                select
                label="Where to Display (URL)"
                variant="outlined"
                fullWidth
                margin="normal"
                value={campaignDetails.whereToDisplay || ''}
                onChange={(e) => {
                  setCampaignDetails(prev => ({ ...prev, whereToDisplay: e.target.value }));
                }}
                disabled={!edit && isDetail}
                InputProps={{
                  style: { borderRadius: '8px', color: 'black' },
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'black',
                    },
                    '&:hover fieldset': {
                      borderColor: 'black',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'black',
                    },
                    '& .MuiSelect-select': {
                      color: 'black',
                    },
                  },
                }}
              >
                <MenuItem value="allPages" sx={{ color: 'black' }}>
                  All Pages
                </MenuItem>
                <MenuItem value="selectedPages" sx={{ color: 'black' }}>
                  Selected Pages
                </MenuItem>
              </TextField>

              {campaignDetails.whereToDisplay === 'selectedPages' && (
                <Box>
                  {(campaignDetails.displayUrls || ['']).map((url, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 2 }}>
                      <TextField
                        label={`URL ${index + 1}`}
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                        value={url}
                        onChange={(e) => {
                          const newUrls = [...(campaignDetails.displayUrls || [''])];
                          newUrls[index] = e.target.value;
                          setCampaignDetails(prev => ({ ...prev, displayUrls: newUrls }));
                        }}
                        disabled={!edit && isDetail}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => {
                                  const newUrls = [...(campaignDetails.displayUrls || [''])];
                                  newUrls[index] = '';
                                  setCampaignDetails(prev => ({ ...prev, displayUrls: newUrls }));
                                }}
                                title="Clear"
                                disabled={!edit && isDetail}
                              >
                                <ClearIcon sx={{ color: 'black' }} />
                              </IconButton>
                            </InputAdornment>
                          ),
                          style: { borderRadius: '8px', color: 'black' },
                        }}
                        InputLabelProps={{
                          shrink: true,
                          style: { color: 'black' },
                          required: false,
                        }}
                        sx={{
                          width: '100%',
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'black',
                            },
                            '&:hover fieldset': {
                              borderColor: 'black',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'black',
                            },
                            '& .MuiInputBase-input': {
                              color: 'black',
                            },
                          },
                        }}
                      />

                      {index === (campaignDetails.displayUrls || ['']).length - 1 && (
                        <IconButton
                          onClick={() => {
                            const newUrls = [...(campaignDetails.displayUrls || ['']), ''];
                            setCampaignDetails(prev => ({ ...prev, displayUrls: newUrls }));
                          }}
                          title="Add URL"
                          disabled={!edit && isDetail}
                          sx={{
                            ml: 1,
                            mt: '13px',
                            color: 'black',
                          }}
                        >
                          <ControlPointIcon sx={{ '& path': { fill: '#058270' }, fontSize: 35 }} />
                        </IconButton>
                      )}

                      {(campaignDetails.displayUrls || ['']).length > 1 && (
                        <IconButton
                          onClick={() => {
                            const newUrls = [...(campaignDetails.displayUrls || [''])];
                            newUrls.splice(index, 1);
                            setCampaignDetails(prev => ({ ...prev, displayUrls: newUrls }));
                          }}
                          title="Delete URL"
                          disabled={!edit && isDetail}
                          sx={{
                            ml: 1,
                            mt: '13px',
                            color: 'red',
                          }}
                        >
                          <ClearIcon sx={{ fontSize: 35 }} />
                        </IconButton>
                      )}
                    </Box>
                  ))}
                </Box>
              )}

              <TextField
                label="Message Text"
                variant="outlined"
                fullWidth
                margin="normal"
                value={campaignDetails.messageText || ''}
                onChange={(e) => {
                  setCampaignDetails(prev => ({ ...prev, messageText: e.target.value }));
                }}
                error={errors.messageText}
                helperText={errors.messageText ? 'Field required' : ''}
                disabled={!edit && isDetail}
                InputProps={{
                  style: { borderRadius: '8px', color: 'black' },
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: errors.messageText ? 'red' : 'black',
                    },
                    '&:hover fieldset': {
                      borderColor: errors.messageText ? 'red' : 'black',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: errors.messageText ? 'red' : 'red',
                    },
                  },
                }}
              />

              {/* Logo Upload Field */}
              <Typography variant="subtitle2">Upload Logo</Typography>
              <Box>
                <TextField
                  type="file"
                  name="logo"
                  fullWidth
                  margin="dense"
                  onChange={handleFileChange}
                  inputProps={{ accept: 'image/*' }}
                  disabled={!edit && isDetail}
                  InputLabelProps={{
                    shrink: true,
                    style: { color: 'black' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': TemplateStyles.InputBorder,
                    '& input::file-selector-button': TemplateStyles.fileUploadButton,
                    '& input::file-selector-button:hover': { backgroundColor: '#045e50' },
                  }}
                />
              </Box>



              <TextField
                select
                label="Notification Position"
                fullWidth
                margin="normal"
                value={campaignDetails.notificationPosition || ''}
                onChange={(e) => {
                  setCampaignDetails(prev => ({ ...prev, notificationPosition: e.target.value }));
                }}
                disabled={!edit && isDetail}
                InputProps={{
                  style: { borderRadius: '8px', color: 'black' },
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'black',
                    },
                    '&:hover fieldset': {
                      borderColor: 'black',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'black',
                    },
                  },
                }}
              >
                <MenuItem value="Left Corner" sx={{ color: 'black' }}>Left Corner</MenuItem>
                <MenuItem value="Right Corner" sx={{ color: 'black' }}>Right Corner</MenuItem>
              </TextField>

              <Box>
                <Typography variant="h9">Allow users to close the notifications</Typography>
                <Switch
                  name="closable"
                  size="large"
                  checked={campaignDetails.closable || false}
                  onChange={(e) => {
                    setCampaignDetails(prev => ({ ...prev, closable: e.target.checked }));
                  }}
                  disabled={!edit && isDetail}
                />
              </Box>

              <TextField
                label="Redirecting Notification"
                variant="outlined"
                fullWidth
                margin="normal"
                value={campaignDetails.redirectingNotification || ''}
                onChange={(e) => {
                  setCampaignDetails(prev => ({ ...prev, redirectingNotification: e.target.value }));
                }}
                disabled={!edit && isDetail}
                InputProps={{
                  style: { borderRadius: '8px', color: 'black' },
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'black',
                    },
                    '&:hover fieldset': {
                      borderColor: 'black',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'black',
                    },
                    '& .MuiInputBase-input': {
                      color: 'black',
                    },
                  },
                }}
              />

              <TextField
                select
                label="Display Duration"
                fullWidth
                margin="normal"
                value={campaignDetails.displayDuration || ''}
                onChange={(e) => {
                  setCampaignDetails(prev => ({ ...prev, displayDuration: e.target.value }));
                }}
                disabled={!edit && isDetail}
                InputProps={{
                  style: { borderRadius: '8px', color: 'black' },
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'black',
                    },
                    '&:hover fieldset': {
                      borderColor: 'black',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'black',
                    },
                  },
                }}
              >
                <MenuItem value="2 sec" sx={{ color: 'black' }}>2 sec</MenuItem>
                <MenuItem value="3 sec" sx={{ color: 'black' }}>3 sec</MenuItem>
                <MenuItem value="4 sec" sx={{ color: 'black' }}>4 sec</MenuItem>
              </TextField>
            </Box>
          </Box>
        )}
        {isPreview && (
          <Preview
            handleTabChange={handleTabChange}
            tabValue={tabValue}
            campaignDetails={{
              description: campaignDetails.messageText,
              desktopPosition: campaignDetails.notificationPosition === 'Left Corner' ? 'bottom-left' : 'bottom-right',
              mobilePosition: campaignDetails.notificationPosition === 'Left Corner' ? 'bottom-left' : 'bottom-right',
            }}
            image={previewImage}
          />
        )}

        {/* Show created/modified time when in detail view */}
        {isDetail && !edit && (
          <Box mt={3}>
            <Typography variant="subtitle2" my={1}>
              Created time : {formatDateTime(campaignDetails?.createdTime)}
            </Typography>
            <Typography variant="subtitle2" my={1}>
              Modified time : {formatDateTime(campaignDetails?.modifiedTime)}
            </Typography>
          </Box>
        )}
      </SideDrawer>

      <CreateSegmentModal
        open={segmentModalOpen}
        onClose={() => setSegmentModalOpen(false)}
        refresh={refresh}
      />
    </>
  );
};

export default EditRealTimeCampaign;

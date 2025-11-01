import { Box, IconButton, InputAdornment, List, ListItem, ListItemText, MenuItem, Switch, TextField, Typography } from '@mui/material';
import { TemplateStyles } from '../../Templates/Style';
import { ArrowDropDownIcon, ClearIcon } from '@mui/x-date-pickers';
import { useState, useMemo, useEffect, useRef } from 'react';
import AddBox from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CreateSegmentModal from '../../Segments/CreateSegmentModal';

function CreateRealCampaign({
    campaignDetails,
    setCampaignDetails,
    handleRealTimeSubmit,
    segments = [],
    FetchSegment,
    setPreviewImage,
}) {
    // Local state for segment search and dropdown
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedSegment, setSelectedSegment] = useState(null);
    const [segmentModalOpen, setSegmentModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    // Filtered segments based on search term
    const filteredResults = useMemo(() => {
        return segments.filter((segment) =>
            (segment.segmentName || '').toLowerCase().includes((searchTerm || '').toLowerCase())
        );
    }, [searchTerm, segments]);

    // Sync local segment state with campaignDetails when it changes
    useEffect(() => {
        if (campaignDetails.segmentID && segments.length > 0) {
            const segment = segments.find(s => s.id === campaignDetails.segmentID);
            if (segment) {
                setSelectedSegment(segment);
                setSearchTerm(segment.segmentName);
            }
        }
    }, [campaignDetails.segmentID, segments]);

    // Sync searchTerm when selectedSegment changes from parent
    useEffect(() => {
        if (selectedSegment && selectedSegment.segmentName !== searchTerm) {
            setSearchTerm(selectedSegment.segmentName);
        }
    }, [selectedSegment, searchTerm]);

    // Persist logo preview when switching between preview and form modes
    useEffect(() => {
        if (campaignDetails.logo && setPreviewImage) {
            // If logo is a File object, create object URL for preview
            if (campaignDetails.logo instanceof File) {
                const objectUrl = URL.createObjectURL(campaignDetails.logo);
                setPreviewImage({
                    logo: objectUrl,
                });
            } else if (typeof campaignDetails.logo === 'string' && campaignDetails.logo.startsWith('blob:')) {
                // If logo is already a blob URL, use it directly
                setPreviewImage({
                    logo: campaignDetails.logo,
                });
            }
        }
    }, [campaignDetails.logo, setPreviewImage]);

    // Restore file input value when component re-renders
    useEffect(() => {
        if (fileInputRef.current && campaignDetails.logo instanceof File) {
            // Create a new FileList-like object to set the file input value
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(campaignDetails.logo);
            fileInputRef.current.files = dataTransfer.files;
        }
    }, [campaignDetails.logo]);

    // Handlers for segment search and selection
    const handleInputFocus = () => setShowDropdown(true);
    const handleInputBlur = () => setTimeout(() => setShowDropdown(false), 100);
    const handleClear = () => {
        setSearchTerm('');
        setSelectedSegment(null);
        setShowDropdown(false);
        setCampaignDetails(prev => ({ ...prev, segmentID: null }));
    };
    const handleSegmentSelect = (segment) => {
        setSelectedSegment(segment);
        setSearchTerm(segment.segmentName);
        setShowDropdown(false);
        setCampaignDetails(prev => ({ ...prev, segmentID: segment?.id ?? null }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'logo') {
            const file = files[0];

            if (file) {
                setCampaignDetails((prevState) => ({
                    ...prevState,
                    [name]: file,
                }));

                // Create URL for preview (like in CreateCustomPrompt.js)
                const objectUrl = URL.createObjectURL(file);

                // Update the parent component's preview image state
                if (setPreviewImage) {
                    setPreviewImage({
                        logo: objectUrl,
                    });
                }
            }
        }
    };

    return (
        <Box>
            <Box width="90%">
                <TextField
                    label="Conversion Title"
                    variant="outlined"
                    name='campaignName'
                    fullWidth
                    required
                    value={campaignDetails.campaignName}
                    onChange={(e) => setCampaignDetails(prev => ({ ...prev, campaignName: e.target.value }))}
                    margin="normal"
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
                        value={campaignDetails.triggerFor}
                        onChange={(e) => setCampaignDetails(prev => ({ ...prev, triggerFor: e.target.value }))}
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
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClear} title="Clear">
                                                <ClearIcon sx={{ color: 'black' }} />
                                            </IconButton>
                                            <IconButton onClick={handleInputFocus} title="Dropdown">
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
                                        // Prevent the input from losing focus before the item click is handled
                                        e.preventDefault();
                                    }}
                                >
                                    <List>
                                        {filteredResults.length > 0 ? (
                                            filteredResults.map((segment) => (
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
                        checked={!!campaignDetails.status}
                        onChange={(e) => setCampaignDetails(prev => ({ ...prev, status: e.target.checked }))}
                    />
                </Box>
                {/* Capture Form and Track fields removed */}
                <TextField
                    select
                    label="Where to Display (URL)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={campaignDetails.whereToDisplay || ''}
                    onChange={(e) => setCampaignDetails(prev => ({ ...prev, whereToDisplay: e.target.value }))}
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

                {/* Show URL fields only when "Selected Pages" is chosen */}
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

                                {/* Add URL button - only show on the last URL field */}
                                {index === (campaignDetails.displayUrls || ['']).length - 1 && (
                                    <IconButton
                                        onClick={() => {
                                            const newUrls = [...(campaignDetails.displayUrls || ['']), ''];
                                            setCampaignDetails(prev => ({ ...prev, displayUrls: newUrls }));
                                        }}
                                        title="Add URL"
                                        sx={{
                                            ml: 1,
                                            mt: '13px',
                                            color: 'black',
                                        }}
                                    >
                                        <AddBox sx={{ '& path': { fill: '#058270' }, fontSize: 35 }} />
                                    </IconButton>
                                )}

                                {/* Delete URL button - only show if there's more than one URL field */}
                                {(campaignDetails.displayUrls || ['']).length > 1 && (
                                    <IconButton
                                        onClick={() => {
                                            const newUrls = [...(campaignDetails.displayUrls || [''])];
                                            newUrls.splice(index, 1);
                                            setCampaignDetails(prev => ({ ...prev, displayUrls: newUrls }));
                                        }}
                                        title="Delete URL"
                                        sx={{
                                            ml: 1,
                                            mt: '13px',
                                            color: 'red',
                                        }}
                                    >
                                        <DeleteIcon sx={{ fontSize: 35 }} />
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
                    value={campaignDetails.messageText}
                    onChange={(e) => setCampaignDetails(prev => ({ ...prev, messageText: e.target.value }))}
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
                />
                <Typography variant="subtitle2">Upload Logo</Typography>
                <Box>
                    <TextField
                        type="file"
                        name="logo"
                        fullWidth
                        margin="dense"
                        onChange={handleFileChange}
                        inputRef={fileInputRef}
                        inputProps={{ accept: 'image/*' }}
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
                    value={campaignDetails.notificationPosition}
                    onChange={(e) => setCampaignDetails(prev => ({ ...prev, notificationPosition: e.target.value }))}
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
                        name="Allow users to close the notifications"
                        size="large"
                        checked={campaignDetails.closable}
                        onChange={(e) => setCampaignDetails(prev => ({ ...prev, closable: e.target.checked }))}
                    />
                </Box>
                <TextField
                    label="Redirecting Notification"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={campaignDetails.redirectingNotification || ''}
                    onChange={(e) => setCampaignDetails(prev => ({ ...prev, redirectingNotification: e.target.value }))}
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

                {/* Capture Past Event field removed */}
                <TextField
                    select
                    label="Display Duration"
                    fullWidth
                    margin="normal"
                    value={campaignDetails.displayDuration}
                    onChange={(e) => setCampaignDetails(prev => ({ ...prev, displayDuration: e.target.value }))}
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
            <CreateSegmentModal
                open={segmentModalOpen}
                onClose={() => setSegmentModalOpen(false)}
                refresh={FetchSegment}
            />
        </Box>
    )
}

export default CreateRealCampaign;







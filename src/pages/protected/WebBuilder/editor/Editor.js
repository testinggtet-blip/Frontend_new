import React, { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  DialogContentText,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import TemplateIcon from '@mui/icons-material/Apps';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { v4 as uuidv4 } from 'uuid';
import customCodePlugin from 'grapesjs-custom-code';
import grapesjsNavbar from 'grapesjs-navbar';
import CustomBlocks from '../builder/CustomBuilder';
import blockBasic from 'grapesjs-blocks-basic';
import FormPlugin from 'grapesjs-plugin-forms';
import 'grapesjs/dist/css/grapes.min.css';
import './editor.css';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import LanguageIcon from '@mui/icons-material/Language';

import { CreateWebBuilder } from 'Api/Api';
import toast from 'react-hot-toast';
import TemplatePicker from '../components/TemplatePicker';

const Editor = ({ onClose, refresh, editMode = false, editData = null, updateFunction = null }) => {
  const editorRef = useRef(null);
  const [jsCodeDialogOpen, setJsCodeDialogOpen] = useState(false);
  const [jsCode, setJsCode] = useState('');
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveWarningOpen, setSaveWarningOpen] = useState(false);
  const [websiteNameDialogOpen, setWebsiteNameDialogOpen] = useState(false);
  const [viewCodeDialogOpen, setViewCodeDialogOpen] = useState(false);
  const [templatePickerOpen, setTemplatePickerOpen] = useState(false);
  const [tabValue, setTabValue] = useState('1');

  const [websiteDetails, setWebsiteDetails] = useState({
    webBuilderName: '',
    htmlContent: '',
    cssContent: '',
    jsContent: '',
    deleted: false,
    shortUrl: '',
    userId: '',
  });

  // Handle template selection
  const handleTemplateSelect = (template) => {
    if (editorRef.current) {
      // Clear existing content
      editorRef.current.setComponents('');
      
      // Add new template content
      if (template.html) {
        editorRef.current.setComponents(template.html);
      }
      
      // Add template styles
      if (template.css) {
        editorRef.current.setStyle(template.css);
      }
      
      // Update the website content state
      updateWebsiteContent();
      setHasUnsavedChanges(true);
    }
  };

  // Load edit data if in edit mode
  useEffect(() => {
    if (editMode && editData) {
      setWebsiteDetails({
        webBuilderName: editData.webBuilderName || '',
        htmlContent: editData.htmlContent || '',
        cssContent: editData.cssContent || '',
        jsContent: editData.jsContent || '',
        deleted: editData.deleted || false,
        shortUrl: editData.shortUrl || '',
        userId: editData.userId || '',
        id: editData.id || editData._id || '',
      });
      setJsCode(editData.jsContent || '');
    }
  }, [editMode, editData]);

  useEffect(() => {
    if (!editorRef.current) {
      const editorDarkThemeCSS = `
                .gjs-editor {
                    background-color: #1e1e1e !important;
                }
                .gjs-cv-canvas {
                    background-color: #2c2c2c !important;
                }
                .gjs-blocks-container {
                    background-color: #252525 !important;
                    color: #ffffff !important;
                }
                .gjs-block {
                    background-color: #333333 !important;
                    color: #ffffff !important;
                    border: 1px solid #444444 !important;
                }
                .gjs-sm-sector-title {
                    background-color: #333333 !important;
                    color: #ffffff !important;
                }
                .gjs-sm-property {
                    background-color: #2c2c2c !important;
                    color: #ffffff !important;
                }
            `;

      const styleElement = document.createElement('style');
      styleElement.textContent = editorDarkThemeCSS;
      document.head.appendChild(styleElement);

      const editor = grapesjs.init({
        container: '#gjs',
        height: '100vh',
        fromElement: !editMode, // Don't load from element if in edit mode
        storageManager: { type: 'none' },
        plugins: [
          customCodePlugin,
          grapesjsNavbar,
          blockBasic,
          FormPlugin,
          (editor) => {
            // Custom commands
            editor.Commands.add('open-js', {
              run(editor) {
                setJsCodeDialogOpen(true);
              },
            });

            // Undo/Redo commands
            editor.Commands.add('core:undo', {
              run: (editor) => editor.UndoManager.undo(),
            });
            editor.Commands.add('core:redo', {
              run: (editor) => editor.UndoManager.redo(),
            });
          },
        ],
        pluginsOpts: {
          'grapesjs-custom-code': {
            blockCustomCode: {
              label: 'Custom Code',
              category: 'Extra',
            },
          },
        },
        allowScripts: true,

        // Minimal Style Manager Configuration
        styleManager: {
          sectors: [
            {
              name: 'General',
              open: true,
              properties: [
                {
                  type: 'color',
                  name: 'Background Color',
                  property: 'background-color',
                  defaults: '#1e1e1e',
                },
                {
                  type: 'color',
                  name: 'Text Color',
                  property: 'color',
                  defaults: '#ffffff',
                },
              ],
            },
            {
              name: 'Dimensions',
              open: false,
              properties: [
                {
                  type: 'text',
                  name: 'Width',
                  property: 'width',
                  units: ['px', '%', 'em', 'rem'],
                },
                {
                  type: 'text',
                  name: 'Height',
                  property: 'height',
                  units: ['px', '%', 'em', 'rem'],
                },
                {
                  type: 'text',
                  name: 'Padding',
                  property: 'padding',
                  units: ['px', '%', 'em', 'rem'],
                },
                {
                  type: 'text',
                  name: 'Margin',
                  property: 'margin',
                  units: ['px', '%', 'em', 'rem'],
                },
              ],
            },
            {
              name: 'Typography',
              open: false,
              properties: [
                {
                  type: 'select',
                  name: 'Font Family',
                  property: 'font-family',
                  options: [
                    { value: 'Arial, sans-serif', name: 'Arial' },
                    { value: 'Helvetica, sans-serif', name: 'Helvetica' },
                    {
                      value: 'Times New Roman, serif',
                      name: 'Times New Roman',
                    },
                    { value: 'Courier New, monospace', name: 'Courier New' },
                    { value: 'Georgia, serif', name: 'Georgia' },
                    { value: 'Verdana, sans-serif', name: 'Verdana' },
                  ],
                },
                {
                  type: 'number',
                  name: 'Font Size',
                  property: 'font-size',
                  units: ['px', 'rem', 'em'],
                },
                {
                  type: 'select',
                  name: 'Font Weight',
                  property: 'font-weight',
                  options: [
                    { value: '300', name: 'Light' },
                    { value: '400', name: 'Normal' },
                    { value: '600', name: 'Semi-Bold' },
                    { value: '700', name: 'Bold' },
                  ],
                },
                {
                  type: 'select',
                  name: 'Text Align',
                  property: 'text-align',
                  options: [
                    { value: 'left', name: 'Left' },
                    { value: 'center', name: 'Center' },
                    { value: 'right', name: 'Right' },
                    { value: 'justify', name: 'Justify' },
                  ],
                },
              ],
            },
            {
              name: 'Decorations',
              open: false,
              properties: [
                {
                  type: 'select',
                  name: 'Border Style',
                  property: 'border-style',
                  options: [
                    { value: 'none', name: 'None' },
                    { value: 'solid', name: 'Solid' },
                    { value: 'dashed', name: 'Dashed' },
                    { value: 'dotted', name: 'Dotted' },
                    { value: 'double', name: 'Double' },
                  ],
                },
                {
                  type: 'text',
                  name: 'Border Width',
                  property: 'border-width',
                  units: ['px'],
                },
                {
                  type: 'color',
                  name: 'Border Color',
                  property: 'border-color',
                },
                {
                  type: 'text',
                  name: 'Border Radius',
                  property: 'border-radius',
                  units: ['px', '%'],
                },
                {
                  type: 'select',
                  name: 'Box Shadow',
                  property: 'box-shadow',
                  options: [
                    { value: 'none', name: 'None' },
                    {
                      value: '0 2px 4px rgba(0,0,0,0.1)',
                      name: 'Light Shadow',
                    },
                    {
                      value: '0 4px 6px rgba(0,0,0,0.2)',
                      name: 'Medium Shadow',
                    },
                    { value: '0 6px 8px rgba(0,0,0,0.3)', name: 'Dark Shadow' },
                  ],
                },
              ],
            },
            {
              name: 'Positioning',
              open: false,
              properties: [
                {
                  type: 'select',
                  name: 'Position',
                  property: 'position',
                  options: [
                    { value: 'static', name: 'Static' },
                    { value: 'relative', name: 'Relative' },
                    { value: 'absolute', name: 'Absolute' },
                    { value: 'fixed', name: 'Fixed' },
                  ],
                },
                {
                  type: 'text',
                  name: 'Top',
                  property: 'top',
                  units: ['px', '%'],
                },
                {
                  type: 'text',
                  name: 'Left',
                  property: 'left',
                  units: ['px', '%'],
                },
                {
                  type: 'text',
                  name: 'Right',
                  property: 'right',
                  units: ['px', '%'],
                },
                {
                  type: 'text',
                  name: 'Bottom',
                  property: 'bottom',
                  units: ['px', '%'],
                },
              ],
            },
          ],
        },

        // Basic Device Manager
        deviceManager: {
          devices: [
            { name: 'Desktop', width: '100%' },
            { name: 'Tablet', width: '768px' },
            { name: 'Mobile', width: '320px' },
          ],
        },
      });

      editorRef.current = editor;
      CustomBlocks(editor);

      // Open Blocks panel by default
      setTimeout(() => {
        const blockBtn = editor.Panels.getButton('views', 'open-blocks');
        if (blockBtn) {
          blockBtn.set('active', true);
          // Close Style Manager panel if it's open by default
          const styleManagerBtn = editor.Panels.getButton('views', 'open-sm');
          if (styleManagerBtn) {
            styleManagerBtn.set('active', false);
          }
        }
      }, 100);

          // Load existing content if in edit mode
      if (editMode && editData) {
        const htmlContent = editData.htmlContent || '';
        const cssContent = editData.cssContent || '';
        const jsContent = editData.jsContent || '';
        
        if (htmlContent) {
          editor.setComponents(htmlContent);
        }
        if (cssContent) {
          editor.setStyle(cssContent);
        }
        // Always set the JS code to state, even if empty
        setJsCode(jsContent);
        
        // Add script to the editor if there's content
        if (jsContent && jsContent.trim() !== '') {
          // Remove any existing scripts first
          const components = editor.DomComponents.getComponents();
          components.each(component => {
            if ((component.get('type') === 'script' || component.get('tagName') === 'script') && 
                component.get('attributes')?.type === 'text/javascript') {
              component.destroy();
            }
          });
          
          // Add the script component
          editor.DomComponents.addComponent({
            type: 'script',
            content: jsContent,
            attributes: { type: 'text/javascript' }
          });
        }
      }

      // Track changes
      editor.on('component:add', updateWebsiteContent);
      editor.on('component:remove', updateWebsiteContent);
      editor.on('component:update', updateWebsiteContent);
      editor.on('style:update', updateWebsiteContent);
    }
  }, []);

  const updateWebsiteContent = () => {
    if (editorRef.current) {
      const html = editorRef.current.getHtml();
      const css = editorRef.current.getCss();
      
      // Get the current JS code from the script component if it exists
      const components = editorRef.current.DomComponents.getComponents();
      let currentJsCode = ' ';
      
      components.each(component => {
        if ((component.get('type') === 'script' || 
             component.get('tagName') === 'script') && 
             component.get('attributes')?.type === 'text/javascript') {
          currentJsCode = component.get('content') || ' ';
        }
      });

      setWebsiteDetails((prev) => ({
        ...prev,
        html,
        css,
        js: currentJsCode,
      }));
      setJsCode(currentJsCode);
      setHasUnsavedChanges(true);
    }
  };

  const handleSave = () => {
    // Open website name dialog if no name is provided
    if (!websiteDetails.webBuilderName) {
      setWebsiteNameDialogOpen(true);
    } else {
      performSave();
    }
  };

  const performSave = async () => {
    try {
      const editor = editorRef.current;
      if (!editor) return;

      const completeWebsiteData = {
        ...websiteDetails,
        webBuilderName: websiteDetails.webBuilderName || 'Untitled Website',
        htmlContent: editor.getHtml() || '',
        cssContent: editor.getCss() || '',
        jsContent: jsCode || '',
        deleted: websiteDetails.deleted || false,
        modifiedTime: new Date().toISOString(),
        shortUrl: websiteDetails.id || 'o',
        userId: websiteDetails.userId || null,
      };

      let response;
      if (editMode && updateFunction) {
        // Update existing web builder
        response = await updateFunction(websiteDetails.id, completeWebsiteData);
      } else {
        // Create new web builder
        completeWebsiteData.createdTime = new Date().toISOString();
        response = await CreateWebBuilder(completeWebsiteData);
      }

      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        setHasUnsavedChanges(false);
        setWebsiteNameDialogOpen(false);
        onClose();
        refresh();
      } else {
        console.error('Failed to save website');
      }
    } catch (error) {
      console.error('Error saving website:', error);
      toast.error('Failed to save website');
    }
  };

  const handleClose = () => {
    // If there are unsaved changes, show warning
    if (hasUnsavedChanges) {
      setSaveWarningOpen(true);
    } else {
      // No unsaved changes, directly close
      onClose();
    }
  };

  const handleDiscardChanges = () => {
    setSaveWarningOpen(false);
    onClose();
  };

  const handleJsCodeSave = () => {
    if (!editorRef.current) return;
    
    const components = editorRef.current.DomComponents.getComponents();
    let scriptFound = false;
    
    // If there's no JavaScript code, remove any existing script components
    if (!jsCode || jsCode.trim() === '') {
      components.each(component => {
        if ((component.get('type') === 'script' || component.get('tagName') === 'script') && 
            component.get('attributes')?.type === 'text/javascript') {
          component.destroy();
        }
      });
    } else {
      // Update or add script component if there is JavaScript code
      components.each(component => {
        if ((component.get('type') === 'script' || component.get('tagName') === 'script') && 
            component.get('attributes')?.type === 'text/javascript') {
          component.set('content', jsCode.trim());
          scriptFound = true;
        }
      });

      // If no script component found, add a new one
      if (!scriptFound) {
        editorRef.current.DomComponents.addComponent({
          type: 'script',
          content: jsCode.trim(),
          attributes: { type: 'text/javascript' }
        });
      }
    }
    
    // Update the UI and state
    setJsCodeDialogOpen(false);
    setHasUnsavedChanges(true);
    updateWebsiteContent();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getCurrentCode = () => {
    if (!editorRef.current) return { html: '', css: '', js: '' };
    
    const html = editorRef.current.getHtml();
    const css = editorRef.current.getCss();
    let js = '';
    
    // Get JavaScript from script components
    const components = editorRef.current.DomComponents.getComponents();
    components.each(component => {
      if ((component.get('type') === 'script' || component.get('tagName') === 'script') && 
          component.get('attributes')?.type === 'text/javascript') {
        js = component.get('content') || '';
      }
    });
    
    return { html, css, js };
  };


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: '#f0f2f5',
        color: '#333',
        p: 2,
        gap: 2,
      }}
    >
      <Box
        sx={{
          flex: 1,
          width: '100%',
          overflow: 'auto',
          bgcolor: '#ffffff',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
          borderRadius: 2,
          p: 2,
        }}
      >
        <div id="gjs" className="pl-2" />
      </Box>
      <AppBar
        position="static"
        color="default"
        elevation={1}
        sx={{
          top: 'auto',
          bottom: 0,
          bgcolor: '#f0f2f5',
          borderTop: '1px solid #e0e0e0',
          borderRadius: 2,
          p: 1,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Undo">
              <IconButton
                onClick={() => editorRef.current?.Commands.run('core:undo')}
              >
                <UndoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Redo">
              <IconButton
                onClick={() => editorRef.current?.Commands.run('core:redo')}
              >
                <RedoIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Templates">
              <IconButton 
                onClick={() => setTemplatePickerOpen(true)}
                color="inherit"
              >
                <TemplateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit JavaScript">
              <IconButton 
                onClick={() => setJsCodeDialogOpen(true)}
                color="inherit"
              >
                <CodeIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* JavaScript Editor Dialog */}
      <Dialog
        open={jsCodeDialogOpen}
        onClose={() => setJsCodeDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit JavaScript</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={15}
            variant="outlined"
            value={jsCode}
            onChange={(e) => setJsCode(e.target.value)}
            placeholder="// Enter your JavaScript code here"
            InputProps={{
              style: { 
                fontFamily: 'monospace',
                fontSize: '14px',
                lineHeight: '1.5',
                backgroundColor: '#f8f9fa',
                color: '#212529'
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setJsCodeDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleJsCodeSave}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Template Picker Dialog */}
      <TemplatePicker 
        open={templatePickerOpen}
        onClose={() => setTemplatePickerOpen(false)}
        onSelect={handleTemplateSelect}
      />

      {/* Website Name Dialog */}
      <Dialog
        open={websiteNameDialogOpen}
        onClose={() => setWebsiteNameDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            width: '100%',
            maxWidth: '500px',
            background: 'linear-gradient(145deg, #f8f9fa, #ffffff)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        <DialogTitle sx={{
          background: '#056a5a',
          color: 'white',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          '& .MuiSvgIcon-root': {
            fontSize: '1.8rem'
          }
        }}>
          <EditIcon />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2, color: 'white' }}>Name Your Website</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.8rem' }}>Choose a unique name for your website</Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ padding: '24px' }}>
          <TextField
            autoFocus
            margin="normal"
            label="Website Name"
            fullWidth
            variant="outlined"
            value={websiteDetails.webBuilderName || ''}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#056a5a',
                },
                '&:hover fieldset': {
                  borderColor: '#056a5a',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#056a5a',
                  boxShadow: '0 0 0 2px rgba(74, 108, 247, 0.2)'
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'black',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LanguageIcon color="action" />
                </InputAdornment>
              ),
            }}
            onChange={(e) =>
              setWebsiteDetails((prev) => ({
                ...prev,
                webBuilderName: e.target.value,
              }))
            }
            placeholder="Enter a name for your website"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setWebsiteNameDialogOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              performSave();
            }}
            color="primary"
            variant="contained"
            disabled={!websiteDetails.webBuilderName}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Save Warning Dialog */}
      <Dialog open={saveWarningOpen} onClose={() => setSaveWarningOpen(false)}>
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have unsaved changes. Do you want to save them before closing?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDiscardChanges} color="primary">
            Discard Changes
          </Button>
          <Button
            onClick={() => {
              setSaveWarningOpen(false);
              handleSave();
            }}
            color="primary"
            variant="contained"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Editor;

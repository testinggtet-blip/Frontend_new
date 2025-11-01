import React from 'react';
import {
  Stack,
  Typography,
  Button,
  IconButton,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useTheme } from '@mui/material/styles';
import { ContainerStyle } from './Style';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';

export const ResponsiveActionButton = ({
  label,
  icon,
  onClick,
  navigateTo,
  tooltip,
  sx = {},
  variant = 'contained',
  color = 'primary',
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    } else if (onClick) {
      onClick();
    }
  };

  if (isSmallScreen) {
    return (
      <Tooltip title={tooltip || label}>
        <IconButton
          color={color}
          onClick={handleClick}
          sx={{
            marginRight: { xs: '15%' },
            gap: '8px',
            ...sx,
          }}
        >
          {React.cloneElement(icon, { sx: { fontSize: '1.75rem' } })}
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Button
      variant={variant}
      color={color}
      onClick={handleClick}
      startIcon={React.cloneElement(icon, {
        sx: {
          fontSize: '1.75rem',
        },
      })}
      sx={{
        marginRight: { sm: '6%', md: '0%' },
        padding: '6px 16px',
        ...sx,
      }}
    >
      {label}
    </Button>
  );
};

const SearchBar = ({
  connectionModule,
  title,
  connectionDataLength = 0,
  onCreate,
  onHelpDocs,
  onSetting,
  navigateTo,
  hideActionButton = false,
  hideCreate = false,
  hideSettings = false,
}) => {
  const showCreate = connectionDataLength < 1;

  let buttonProps;

  if (connectionModule) {
    buttonProps = {
      label: showCreate ? 'Create' : 'Help Docs',
      icon: showCreate ? <AddToPhotosIcon /> : <HelpOutlineIcon />,
      tooltip: showCreate ? 'Create' : 'Help Docs',
      onClick: showCreate ? onCreate : onHelpDocs,
    };
  } else {
    buttonProps = {
      label: 'Create',
      icon: <AddToPhotosIcon />,
      tooltip: 'Create',
      ...(navigateTo ? { navigateTo } : { onClick: onCreate }),
    };
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={ContainerStyle.topBar}
    >
      <Typography variant="h5" sx={ContainerStyle.heading}>
        {title}
      </Typography>

      <Stack direction="row" spacing={2}>
        {title === 'Templates' && !hideSettings && (
          <ResponsiveActionButton
            variant="outlined"
            label="Settings"
            icon={<SettingsIcon />}
            tooltip="Settings"
            onClick={onSetting}
          />
        )}
        {!hideActionButton && !hideCreate && (
          <ResponsiveActionButton {...buttonProps} />
        )}
      </Stack>
    </Stack>
  );
};

export default SearchBar;

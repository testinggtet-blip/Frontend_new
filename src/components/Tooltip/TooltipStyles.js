// components/TooltipStyles.js
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

/**
 * BootstrapTooltip
 * A styled MUI Tooltip with dark background and arrow.
 */
export const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#3D393D',
    color: 'white',
    fontSize: '0.875rem',
    boxShadow: theme.shadows[1],
    padding: '10px',
  },
}));

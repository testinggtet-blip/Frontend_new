import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Drawer,
  IconButton,
  Stack,
  styled,
  Tab,
  Typography,
} from '@mui/material';
import { svgBorder } from 'constants/appConstant';
import { tableScrollbar } from './Style';

export const SvgSeparator = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'end',
      marginBottom: '8px',
    }}
    dangerouslySetInnerHTML={{ __html: svgBorder }}
  />
);

export function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const CustomTab = styled(Tab)(({ theme, ...props }) => ({
  textTransform: 'none',
  fontSize: props.segtext == 'true' ? '14px' : '16px',
  color: 'black',
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  minHeight: '55px',
  width: 'auto',
  minwidth: '21.33%',
  flexGrow: 1,
  fontWeight: 'bold',
  whiteSpace: 'nowrap',

  '&.Mui-selected': {
    color: '#07826F',
  },
}));

const EnlargeModal = ({ children, open, onCloseModal, title, tabsRow }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onCloseModal}
      PaperProps={{
        sx: {
          width: { xs: '100%', md: 550 },
          border: '1px solid #ABABAB',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 8,
          backgroundColor: 'white',
          zIndex: 10,
          px: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: '40px' }}
        >
          <Typography variant="h6" sx={{ lineHeight: 1.2, mb: 0 }}>
            {title}
          </Typography>
          <IconButton onClick={onCloseModal} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>

      {/* Tabs row (also fixed) */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 9,
          px: 1,
          backgroundColor: 'white',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        {tabsRow && <>{tabsRow}</>}
      </Box>

      {/* Scrollable content */}
      <Box
        sx={{
          px: 2,
          overflowY: 'auto',
          flexGrow: 1,
          ...tableScrollbar,
        }}
      >
        {children}
      </Box>
    </Drawer>
  );
};

export default EnlargeModal;

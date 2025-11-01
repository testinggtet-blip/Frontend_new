import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import {
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Chrome,
  Globe2,
} from 'lucide-react';
// ---------------------------------------------------------------------- Icons --------------------------------------------------

// Device Icon
export const getDeviceIcon = (device) => {
  const iconClass = 'inline w-4 h-4 mr-1 text-gray-500';
  switch (device?.toLowerCase()) {
    case 'desktop':
      return <Monitor className={iconClass} />;
    case 'mobile':
      return <Smartphone className={iconClass} />;
    case 'tablet':
      return <Tablet className={iconClass} />;
    default:
      return <Globe className={iconClass} />;
  }
};

// Country Flag (Emoji flag from country code, e.g. 'IN' => 🇮🇳)
export const getCountryFlag = (code) => {
  if (!code || code.length !== 2) return '🌍';
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
};

// Browser Icon
export const getBrowserIcon = (browser) => {
  const iconClass = 'inline w-4 h-4 mr-1 text-gray-500';
  const b = browser?.toLowerCase();
  if (b.includes('chrome')) return <Chrome className={iconClass} />;
  if (b.includes('firefox')) return <Globe2 className={iconClass} />;
  if (b.includes('safari')) return <Globe2 className={iconClass} />;
  if (b.includes('edge')) return <Globe2 className={iconClass} />;
  return <Globe className={iconClass} />;
};

// ----------------------------------------------------------------------

export function useResponsive(query, start, end) {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));

  const mediaDown = useMediaQuery(theme.breakpoints.down(start));

  const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end));

  const mediaOnly = useMediaQuery(theme.breakpoints.only(start));

  if (query === 'up') {
    return mediaUp;
  }

  if (query === 'down') {
    return mediaDown;
  }

  if (query === 'between') {
    return mediaBetween;
  }

  return mediaOnly;
}

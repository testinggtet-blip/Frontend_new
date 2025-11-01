import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton, CircularProgress } from '@mui/material';
import { FullscreenLoaderBox } from './LoadingStyles';

/**
 * Fullscreen loading spinner.
 */
export function Loading({ state }) {
  if (!state) return null;

  return (
    <FullscreenLoaderBox>
      <CircularProgress />
    </FullscreenLoaderBox>
  );
}

Loading.propTypes = {
  state: PropTypes.bool, // Controls visibility of loader
};

Loading.defaultProps = {
  state: false,
};

/**
 * Skeleton text loading component.
 */
export const SkeletonLoading = ({ value }) => {
  return (
    <div>
      {Array.from({ length: value + 1 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width="100%"
          height={20}
          animation="wave"
          sx={{ mb: 1.25 }}
        />
      ))}
    </div>
  );
};

SkeletonLoading.propTypes = {
  value: PropTypes.number, // Number of skeleton lines to show
};

SkeletonLoading.defaultProps = {
  value: 5,
};
// components/CustomTooltip.js
import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTooltip } from './TooltipStyles';

/**
 * CustomTooltip
 * Reusable tooltip component with dark style.
 */
const CustomTooltip = ({
  children,
  title,
  arrow,
  placement,
  TransitionComponent,
  ...props
}) => {
  return (
    <BootstrapTooltip
      title={title}
      arrow={arrow}
      placement={placement}
      TransitionComponent={TransitionComponent}
      {...props}
    >
      {children}
    </BootstrapTooltip>
  );
};

CustomTooltip.propTypes = {
  children: PropTypes.node.isRequired,              // Tooltip target element
  title: PropTypes.oneOfType([                      // Tooltip content
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  arrow: PropTypes.bool,                            // Show arrow or not
  placement: PropTypes.oneOf([
    'top', 'bottom', 'left', 'right',
    'top-start', 'top-end',
    'bottom-start', 'bottom-end',
    'left-start', 'left-end',
    'right-start', 'right-end',
  ]),
  TransitionComponent: PropTypes.elementType,       // Optional transition (Fade, Zoom, etc.)
};

CustomTooltip.defaultProps = {
  arrow: true,
  placement: 'top',
  TransitionComponent: undefined,
};

export default CustomTooltip;
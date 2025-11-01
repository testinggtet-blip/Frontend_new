import React from 'react';

import join from './Profile/community.png';
import logout from './Profile/logout.png';
import review from './Profile/review.png';
import account from './Profile/Profile.png';
import help from './Profile/help-circle.png';
import settings from './Profile/settings-2.png';
import termsAndCondition from './Profile/termsNconditions.png';

export const joinCommunityIcon = () => {
  return (
    <img src={join} alt="icon" style={{ width: '25px', height: '25px' }} />
  );
};

export const logoutIcon = () => {
  return (
    <img src={logout} alt="icon" style={{ width: '25px', height: '25px' }} />
  );
};

export const reviewIcon = () => {
  return (
    <img src={review} alt="icon" style={{ width: '25px', height: '25px' }} />
  );
};

export const accountIcon = () => {
  return (
    <img src={account} alt="icon" style={{ width: '25px', height: '25px' }} />
  );
};

export const helpIcon = () => {
  return (
    <img src={help} alt="icon" style={{ width: '25px', height: '25px' }} />
  );
};

export const settingsIcon = () => {
  return (
    <img src={settings} alt="icon" style={{ width: '25px', height: '25px' }} />
  );
};

export const termsAndConditionIcon = () => {
  return (
    <img
      src={termsAndCondition}
      alt="icon"
      style={{ width: '25px', height: '25px' }}
    />
  );
};

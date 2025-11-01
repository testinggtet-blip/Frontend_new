import React from 'react';

const EmailLink = ({ email, text, style }) => {
  const finalEmail = email || process.env.REACT_APP_EMAIL;

  return (
    <a
      href={`mailto:${finalEmail}`}
      style={{ textDecoration: 'underline', cursor: 'pointer', ...style }}
    >
      {text || finalEmail}
    </a>
  );
};

export default EmailLink;

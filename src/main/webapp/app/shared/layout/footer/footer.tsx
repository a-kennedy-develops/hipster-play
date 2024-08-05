import React from 'react';

const Footer = () => (
  <div className="tw-h-12 tw-page-content tw-mt-auto tw-bg-primary tw-p-4">
    <div className="tw-flex md:tw-flex-row tw-w-full md:tw-w-12/12 tw-text-white tw-text-sm">
      <span className="tw-mr-3">Version: {VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`}</span>
      <span>Date: </span>
    </div>
  </div>
);

export default Footer;

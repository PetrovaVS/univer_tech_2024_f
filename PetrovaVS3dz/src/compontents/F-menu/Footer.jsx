import React from 'react';

export const Footer = () => (
  <footer style={{ border: '1px solid #333', height: '140px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', backgroundColor: '#f8f8f8' }}>
    <div>
      <p style={{ margin: 0 }}>© 2024 Your Company</p>
    </div>
    <div>
      <a href="/privacy-policy" style={{ marginRight: '15px' }}>Privacy Policy</a>
      <a href="/terms-of-service">Terms of Service</a>
    </div>
    <div>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>FB</a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>TW</a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
    </div>
  </footer>
);

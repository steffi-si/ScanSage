import { useState } from "react";
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          © {new Date().getFullYear()} ScanSage. All rights reserved.
        </p>
        <p>
          Contact:{" "}
          <a href="mailto:support@scansage.com">support@scansage.com</a>
        </p>
      </div>
      <div className="footer-bottom">
        <p>Made with ❤️ by Steffi & Sophie</p>
      </div>
    </footer>
  );
}

export default Footer;
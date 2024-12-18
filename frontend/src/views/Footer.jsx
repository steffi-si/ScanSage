import { useState } from "react";

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
    </footer>
  );
}

export default Footer;
// footer.js - Professional Footer with Disclaimer
// This script injects the complete footer HTML into any page where it is called

(function() {
    // Create a container for the footer if it doesn't exist
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) {
        console.error('Footer container not found. Please add <div id="footer-container"></div> to your page.');
        return;
    }

    // Footer HTML with company info, quick links, services, contact, and full disclaimer
    const footerHTML = `
        <style>
            /* ========== FOOTER STYLES ========== */
            .site-footer {
                background: #0f2b3f;
                color: #cbd5e1;
                margin-top: 60px;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .footer-container {
                max-width: 1280px;
                margin: 0 auto;
                padding: 60px 24px 40px;
            }
            .footer-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 40px;
                margin-bottom: 50px;
            }
            .footer-brand .logo {
                display: flex;
                align-items: center;
                gap: 10px;
                text-decoration: none;
                padding: 0;
                margin-bottom: 20px;
            }
            .footer-brand .logo-icon {
                width: 38px;
                height: 38px;
                background: #1e3a5f;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 800;
                font-size: 14px;
            }
            .footer-brand .logo-text {
                font-weight: 700;
                font-size: 1.3rem;
                letter-spacing: -0.3px;
                color: white;
            }
            .footer-brand .logo-text span {
                font-weight: 400;
                color: #8aa0b5;
                font-size: 1rem;
            }
            .footer-description {
                font-size: 0.85rem;
                line-height: 1.6;
                margin: 16px 0;
                color: #9aadc2;
            }
            .social-links {
                display: flex;
                gap: 14px;
                margin-top: 20px;
            }
            .social-links a {
                width: 36px;
                height: 36px;
                background: rgba(255,255,255,0.08);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #cbd5e1;
                transition: all 0.25s ease;
                text-decoration: none;
            }
            .social-links a:hover {
                background: #1e3a5f;
                color: white;
                transform: translateY(-3px);
            }
            .footer-column h4 {
                color: white;
                font-size: 1rem;
                font-weight: 700;
                margin-bottom: 20px;
                position: relative;
                display: inline-block;
            }
            .footer-column h4::after {
                content: '';
                position: absolute;
                bottom: -6px;
                left: 0;
                width: 32px;
                height: 2px;
                background: #1e3a5f;
                border-radius: 2px;
            }
            .footer-links {
                list-style: none;
                margin-top: 8px;
            }
            .footer-links li {
                margin-bottom: 12px;
            }
            .footer-links a {
                color: #9aadc2;
                text-decoration: none;
                font-size: 0.85rem;
                transition: all 0.2s;
                display: inline-flex;
                align-items: center;
                gap: 6px;
            }
            .footer-links a i {
                font-size: 10px;
                opacity: 0.6;
            }
            .footer-links a:hover {
                color: white;
                transform: translateX(4px);
            }
            .contact-info p {
                display: flex;
                align-items: center;
                gap: 12px;
                font-size: 0.85rem;
                margin-bottom: 14px;
                color: #9aadc2;
            }
            .contact-info i {
                width: 24px;
                color: #6c8fb0;
            }
            /* Disclaimer Box inside Footer */
            .disclaimer-footer {
                background: rgba(0, 0, 0, 0.25);
                border-radius: 16px;
                padding: 20px 24px;
                margin-bottom: 40px;
                border-left: 4px solid #e8b84b;
                font-size: 0.75rem;
                line-height: 1.5;
                color: #cbd5e1;
            }
            .disclaimer-footer a {
                color: #e8b84b;
                text-decoration: underline;
                font-weight: 500;
            }
            .disclaimer-footer a:hover {
                color: white;
            }
            .footer-bottom {
                border-top: 1px solid rgba(255,255,255,0.08);
                padding-top: 28px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 16px;
                font-size: 0.75rem;
                color: #7e93aa;
            }
            .footer-bottom-links {
                display: flex;
                gap: 24px;
                flex-wrap: wrap;
            }
            .footer-bottom-links a {
                color: #7e93aa;
                text-decoration: none;
                transition: 0.2s;
            }
            .footer-bottom-links a:hover {
                color: white;
            }
            @media (max-width: 768px) {
                .footer-grid { grid-template-columns: 1fr; gap: 32px; }
                .footer-bottom { flex-direction: column; text-align: center; }
                .footer-bottom-links { justify-content: center; }
                .disclaimer-footer { padding: 16px; }
            }
            @media (max-width: 480px) {
                .footer-container { padding: 40px 20px 30px; }
                .footer-brand .logo-text { font-size: 1.1rem; }
            }
        </style>

        <footer class="site-footer">
            <div class="footer-container">
                <div class="footer-grid">
                    <!-- Brand Column -->
                    <div class="footer-brand">
                        <div class="logo">
                            <div class="logo-icon">NI</div>
                            <div class="logo-text">NI NO </div>
                        </div>
                        <p class="footer-description">Professional assistance for UK National Insurance number applications, replacements, and updates. Fast, reliable, and secure.</p>
                    </div>

                    <!-- Quick Links Column -->
                    <div class="footer-column">
                        <h4>Quick Links</h4>
                        <ul class="footer-links">
                            <li><a href="new-application-book.html"><i class="fas fa-chevron-right"></i> New Application</a></li>
                            <li><a href="replacement-application.html"><i class="fas fa-chevron-right"></i> Replacement Application</a></li>
                            <li><a href="update-details.html"><i class="fas fa-chevron-right"></i> Update Details</a></li>
                            <li><a href="contact.html"><i class="fas fa-chevron-right"></i> Contact Us</a></li>
                            <li><a href="faqs.html"><i class="fas fa-chevron-right"></i> FAQs</a></li>
                        </ul>
                    </div>

                    <!-- Our Services Column -->
                    <div class="footer-column">
                        <h4>Our Services</h4>
                        <ul class="footer-links">
                            <li><a href="nino-information.html"><i class="fas fa-chevron-right"></i> NINO Information</a></li>
                            <li><a href="nino-for-students.html"><i class="fas fa-chevron-right"></i> NINO for Students</a></li>
                            <li><a href="nino-dependants.html"><i class="fas fa-chevron-right"></i> NINO Dependants</a></li>
                            <li><a href="nino-skilled-workers.html"><i class="fas fa-chevron-right"></i> NINO Skilled Workers</a></li>
                            <li><a href="lost-nino-help.html"><i class="fas fa-chevron-right"></i> Lost NINO Help</a></li>
                        </ul>
                    </div>

                    <!-- Contact Info Column -->
                    <div class="footer-column">
                        <h4>Get in Touch</h4>
                        <div class="contact-info">
                            <p><i class="fas fa-envelope"></i> support@booknino.co.uk</p>
                            <p><i class="fas fa-map-marker-alt"></i> London, United Kingdom</p>
                            <p><i class="fas fa-clock"></i> Mon - Fri: 9am - 6pm</p>
                        </div>
                    </div>
                </div>

                <!-- FULL DISCLAIMER BOX IN FOOTER -->
                <div class="disclaimer-footer">
                    <strong><i class="fas fa-exclamation-triangle"></i> Disclaimer:</strong> You can apply directly at the DWP or contact Job Centre Plus. We have no affiliations with the Department for Work and Pension, Job Centre Plus or any UK government body. You may choose to apply directly by phoning the Jobcentre plus where there will be no fee payable. We cannot grant you your National Insurance Number ourselves, the decision rests solely with the HMRC. We can submit your National Insurance Number application on your behalf for a service fee. To apply for free you will need to visit <a href="https://www.gov.uk/apply-national-insurance-number" target="_blank" rel="noopener noreferrer">https://www.gov.uk/apply-national-insurance-number</a>.
                </div>

                <!-- Footer Bottom -->
                <div class="footer-bottom">
                    <div>&copy; 2026 NI NO. All rights reserved.</div>
                    <div class="footer-bottom-links">
                        <a href="privacy-policy.html">Privacy Policy</a>
                        <a href="terms.html">Terms & Conditions</a>
                        <a href="cookie-policy.html">Cookie Policy</a>
                        <a href="/accessibility">Refund Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    `;

    // Inject the footer HTML
    footerContainer.innerHTML = footerHTML;

    // Load Font Awesome if not already loaded
    if (!document.querySelector('link[href*="font-awesome"]') && !document.querySelector('script[src*="font-awesome"]')) {
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(fontAwesomeLink);
    }

    // Load Google Fonts if not already loaded
    if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Inter"]')) {
        const googleFontsLink = document.createElement('link');
        googleFontsLink.href = 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;400;500;600;700;800&display=swap';
        googleFontsLink.rel = 'stylesheet';
        document.head.appendChild(googleFontsLink);
    }
})();

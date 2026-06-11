// header-footer.js - PRO Version with Guaranteed Sticky Header on All Devices
// This script injects both the header and footer into any page where it is called

(function() {
    // ========== HEADER INJECTION ==========
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        const headerHTML = `
            <style>
                /* ========== RESET FOR HEADER AREA ========== */
                #header-container {
                    position: sticky;
                    top: 0;
                    z-index: 10000;
                    margin: 0;
                    padding: 0;
                }
                
                /* ========== TOP DISCLAIMER BAR ========== */
                .top-disclaimer {
                    background: #fef9e6;
                    border-bottom: 1px solid #f0d080;
                    padding: 8px 24px;
                    text-align: center;
                    font-size: 0.75rem;
                    color: #7a5a20;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    line-height: 1.4;
                }
                .top-disclaimer a {
                    color: #b45309;
                    text-decoration: underline;
                    font-weight: 500;
                }
                .top-disclaimer a:hover {
                    color: #1e3a5f;
                }

                /* ========== PROFESSIONAL STICKY HEADER ========== */
                .site-header {
                    background: #ffffff;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
                    position: sticky;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 9999;
                    border-bottom: 1px solid #eef2f8;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    /* CRITICAL for sticky on all devices */
                    -webkit-position: sticky;
                    position: -webkit-sticky;
                    position: sticky;
                    /* Ensure hardware acceleration */
                    transform: translateZ(0);
                    -webkit-transform: translateZ(0);
                    will-change: position;
                    /* Smooth shadow transition */
                    transition: box-shadow 0.3s ease;
                }
                
                /* Enhanced shadow when header is actively sticking */
                .site-header.is-sticky {
                    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
                }
                
                .header-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 28px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: nowrap;
                    min-height: 72px;
                }
                
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-decoration: none;
                    padding: 14px 0;
                    flex-shrink: 0;
                    z-index: 2;
                }
                .logo-icon {
                    width: 40px;
                    height: 40px;
                    min-width: 40px;
                    background: #1e3a5f;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 800;
                    font-size: 15px;
                    box-shadow: 0 4px 8px rgba(30,58,95,0.15);
                }
                .logo-text {
                    font-weight: 700;
                    font-size: 1.4rem;
                    letter-spacing: -0.3px;
                    color: #0f2b3f;
                    white-space: nowrap;
                }
                .logo-text span {
                    font-weight: 400;
                    color: #6c7e94;
                    font-size: 1rem;
                }
                
                .nav-menu {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    flex-wrap: nowrap;
                    justify-content: flex-end;
                }
                .nav-link {
                    padding: 8px 16px;
                    font-size: 0.85rem;
                    font-weight: 500;
                    color: #2c3e50;
                    text-decoration: none;
                    border-radius: 40px;
                    transition: all 0.25s ease;
                    white-space: nowrap;
                }
                .nav-link:hover {
                    background: #eef2fa;
                    color: #1e3a5f;
                }
                .nav-link.cta {
                    background: #1e3a5f;
                    color: white;
                    margin-left: 8px;
                    padding: 8px 22px;
                    font-weight: 600;
                }
                .nav-link.cta:hover {
                    background: #0f2b48;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 14px rgba(30,58,95,0.2);
                }
                
                .dropdown {
                    position: relative;
                    display: inline-block;
                }
                .dropdown > .nav-link {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .dropdown-content {
                    display: none;
                    position: absolute;
                    background: white;
                    min-width: 240px;
                    box-shadow: 0 20px 35px -10px rgba(0,0,0,0.15);
                    border-radius: 20px;
                    z-index: 100;
                    top: 115%;
                    left: 0;
                    padding: 8px 0;
                    border: 1px solid #eef2f8;
                }
                .dropdown-content a {
                    color: #2c3e50;
                    padding: 10px 20px;
                    text-decoration: none;
                    display: block;
                    font-size: 0.8rem;
                    font-weight: 500;
                    transition: all 0.2s;
                }
                .dropdown-content a:hover {
                    background-color: #f5f9ff;
                    color: #1e3a5f;
                    padding-left: 26px;
                }
                .dropdown:hover .dropdown-content {
                    display: block;
                }
                
                /* Mobile Toggle Button */
                .mobile-toggle {
                    display: none;
                    background: #f8fafd;
                    border: 1px solid #e2edf7;
                    border-radius: 50%;
                    width: 44px;
                    height: 44px;
                    min-width: 44px;
                    font-size: 1.3rem;
                    cursor: pointer;
                    color: #1e3a5f;
                    align-items: center;
                    justify-content: center;
                    z-index: 2;
                    flex-shrink: 0;
                }
                .mobile-toggle:active {
                    background: #e8f0fe;
                }
                
                /* Mobile Navigation */
                .mobile-nav {
                    display: none;
                    background: white;
                    width: 100%;
                    max-height: 70vh;
                    overflow-y: auto;
                    border-top: 1px solid #eef2f8;
                    position: relative;
                    z-index: 999;
                    -webkit-overflow-scrolling: touch;
                }
                .mobile-nav.open {
                    display: block;
                }
                .mobile-nav-inner {
                    padding: 16px 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .mobile-nav-link {
                    padding: 14px 0;
                    font-size: 1rem;
                    font-weight: 500;
                    color: #1e2f3e;
                    text-decoration: none;
                    border-bottom: 1px solid #f0f4fa;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .mobile-nav-link i {
                    color: #8a9bb0;
                    font-size: 13px;
                }
                .mobile-nav-link.cta-mobile {
                    background: #1e3a5f;
                    color: white;
                    padding: 16px 24px;
                    border-radius: 60px;
                    text-align: center;
                    margin-top: 16px;
                    border-bottom: none;
                    justify-content: center;
                    font-weight: 600;
                    font-size: 1.05rem;
                }
                .mobile-dropdown-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 14px 0;
                    font-weight: 600;
                    color: #1e3a5f;
                    border-bottom: 1px solid #f0f4fa;
                    cursor: pointer;
                    user-select: none;
                }
                .mobile-submenu {
                    display: none;
                    padding-left: 20px;
                    background: #fafcff;
                    border-radius: 16px;
                    margin: 4px 0;
                }
                .mobile-submenu a {
                    display: block;
                    padding: 12px 8px;
                    text-decoration: none;
                    color: #4a5b6e;
                    font-size: 0.9rem;
                    font-weight: 500;
                    border-radius: 8px;
                }
                .mobile-submenu a:active {
                    background: #e8f0fe;
                }
                
                /* ========== RESPONSIVE BREAKPOINTS ========== */
                @media (max-width: 1024px) {
                    .nav-menu { display: none; }
                    .mobile-toggle { display: flex; }
                    .header-container {
                        padding: 0 20px;
                        min-height: 64px;
                    }
                    .logo-text { font-size: 1.3rem; }
                }
                
                @media (max-width: 680px) {
                    .header-container { 
                        padding: 0 16px; 
                        min-height: 60px;
                    }
                    .top-disclaimer { 
                        padding: 6px 16px; 
                        font-size: 0.7rem; 
                    }
                    .logo-text { 
                        font-size: 1.2rem; 
                    }
                    .logo-text span { 
                        font-size: 0.85rem; 
                    }
                    .logo-icon { 
                        width: 34px; 
                        height: 34px; 
                        min-width: 34px;
                        font-size: 12px; 
                    }
                    .logo { padding: 10px 0; }
                    .mobile-toggle {
                        width: 40px;
                        height: 40px;
                        min-width: 40px;
                        font-size: 1.2rem;
                    }
                }
                
                @media (max-width: 480px) {
                    .header-container { 
                        padding: 0 12px; 
                        min-height: 56px;
                    }
                    .logo-text { 
                        font-size: 1.1rem; 
                    }
                    .logo-text span { 
                        font-size: 0.8rem; 
                        display: none;
                    }
                    .logo-icon { 
                        width: 30px; 
                        height: 30px; 
                        min-width: 30px;
                        font-size: 11px; 
                        border-radius: 8px;
                    }
                    .logo { gap: 6px; padding: 8px 0; }
                    .mobile-nav-inner { padding: 12px 16px; }
                    .mobile-nav-link { font-size: 0.95rem; padding: 12px 0; }
                    .top-disclaimer { 
                        padding: 6px 12px; 
                        font-size: 0.65rem; 
                    }
                }
                
                @media (max-width: 360px) {
                    .header-container { padding: 0 8px; }
                    .logo-text { font-size: 1rem; }
                    .logo-icon { 
                        width: 28px; 
                        height: 28px; 
                        min-width: 28px;
                        font-size: 10px; 
                    }
                }
            </style>

            <!-- Top Disclaimer Bar -->
            <div class="top-disclaimer">
                <i class="fas fa-info-circle"></i> Nationalinsurancenumber.co is operated by a private company. You are able to apply directly with the JobCentre plus and HMRC where there will be no cost involved. We have no affiliations with any UK government body. For the official site please visit <a href="https://www.gov.uk" target="_blank" rel="noopener noreferrer">https://www.gov.uk</a>. <a href="#" class="disclaimer-more">Click here to find out more.</a>
            </div>

            <!-- Main Sticky Header -->
            <header class="site-header" id="stickyHeader">
                <div class="header-container">
                    <a href="index.html" class="logo" aria-label="NI NO Home">
                        <div class="logo-icon">NI</div>
                        <div class="logo-text">NI NO <span>UK</span></div>
                    </a>
                    <nav class="nav-menu" aria-label="Main navigation">
                        <a href="index.html" class="nav-link">Home</a>
                        <a href="new-application-book.html" class="nav-link">New Application</a>
                        <a href="replacement-application.html" class="nav-link">Replacement</a>
                        <a href="update-details.html" class="nav-link">Update Details</a>
                        <div class="dropdown">
                            <a href="#" class="nav-link" aria-haspopup="true">Information <i class="fas fa-chevron-down" style="font-size: 9px;"></i></a>
                            <div class="dropdown-content">
                                <a href="nino-dependants.html">NINO Dependants</a>
                                <a href="nino-for-students.html">NINO for Students</a>
                                <a href="nino-information.html">NINO Information</a>
                                <a href="nino-skilled-workers.html">NINO Skilled Workers</a>
                                <a href="processing-times.html">Processing Times</a>
                                <a href="required-documents.html">Required Documents</a>
                                <a href="first-time-nino.html">First Time NINO</a>
                                <a href="lost-nino-help.html">Lost NINO Help</a>
                            </div>
                        </div>
                        <a href="contact.html" class="nav-link">Contact</a>
                        <a href="new-application-book.html" class="nav-link cta">Apply Now</a>
                    </nav>
                    <button class="mobile-toggle" id="mobileToggleBtn" aria-label="Toggle menu" aria-expanded="false">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>

                <div class="mobile-nav" id="mobileNavMenu" role="navigation" aria-label="Mobile navigation">
                    <div class="mobile-nav-inner">
                        <a href="index.html" class="mobile-nav-link">Home <i class="fas fa-chevron-right"></i></a>
                        <a href="new-application-book.html" class="mobile-nav-link">New Application <i class="fas fa-chevron-right"></i></a>
                        <a href="replacement-application.html" class="mobile-nav-link">Replacement <i class="fas fa-chevron-right"></i></a>
                        <a href="update-details.html" class="mobile-nav-link">Update Details <i class="fas fa-chevron-right"></i></a>
                        <a href="contact.html" class="mobile-nav-link">Contact <i class="fas fa-chevron-right"></i></a>
                        <div id="mobileServicesToggleBtn" class="mobile-dropdown-header" role="button" aria-expanded="false">
                            Information <i class="fas fa-chevron-down"></i>
                        </div>
                        <div id="mobileServicesSubmenuMenu" class="mobile-submenu">
                            <a href="nino-dependants.html">NINO Dependants</a>
                            <a href="nino-for-students.html">NINO for Students</a>
                            <a href="nino-information.html">NINO Information</a>
                            <a href="nino-skilled-workers.html">NINO Skilled Workers</a>
                            <a href="processing-times.html">Processing Times</a>
                            <a href="required-documents.html">Required Documents</a>
                            <a href="first-time-nino.html">First Time NINO</a>
                            <a href="lost-nino-help.html">Lost NINO Help</a>
                        </div>
                        <a href="new-application-book.html" class="mobile-nav-link cta-mobile">Apply Now <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </header>
        `;

        headerContainer.innerHTML = headerHTML;
    } else {
        console.warn('❌ Header container not found. Add <div id="header-container"></div> to your page.');
    }

    // ========== FOOTER INJECTION ==========
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        const footerHTML = `
            <style>
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
                    background: #f0b84b;
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
                    color: #f0b84b;
                }
                .disclaimer-footer {
                    background: rgba(0, 0, 0, 0.25);
                    border-radius: 16px;
                    padding: 20px 24px;
                    margin-bottom: 40px;
                    border-left: 4px solid #f0b84b;
                    font-size: 0.75rem;
                    line-height: 1.5;
                    color: #cbd5e1;
                }
                .disclaimer-footer a {
                    color: #f0b84b;
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
                        <div class="footer-brand">
                            <div class="logo">
                                <div class="logo-icon">NI</div>
                                <div class="logo-text">NI NO <span>UK</span></div>
                            </div>
                            <p class="footer-description">Professional assistance for UK National Insurance number applications, replacements, and updates. Fast, reliable, and secure.</p>
                            <div class="social-links">
                                <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                                <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                                <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                            </div>
                        </div>
                        <div class="footer-column">
                            <h4>Quick Links</h4>
                            <ul class="footer-links">
                                <li><a href="new-application-book.html"><i class="fas fa-chevron-right"></i> New Application</a></li>
                                <li><a href="replacement-application.html"><i class="fas fa-chevron-right"></i> Replacement</a></li>
                                <li><a href="update-details.html"><i class="fas fa-chevron-right"></i> Update Details</a></li>
                                <li><a href="contact.html"><i class="fas fa-chevron-right"></i> Contact Us</a></li>
                                <li><a href="faqs.html"><i class="fas fa-chevron-right"></i> FAQs</a></li>
                            </ul>
                        </div>
                        <div class="footer-column">
                            <h4>Our Services</h4>
                            <ul class="footer-links">
                                <li><a href="nino-information.html"><i class="fas fa-chevron-right"></i> NINO Information</a></li>
                                <li><a href="nino-for-students.html"><i class="fas fa-chevron-right"></i> Students</a></li>
                                <li><a href="nino-dependants.html"><i class="fas fa-chevron-right"></i> Dependants</a></li>
                                <li><a href="nino-skilled-workers.html"><i class="fas fa-chevron-right"></i> Skilled Workers</a></li>
                                <li><a href="lost-nino-help.html"><i class="fas fa-chevron-right"></i> Lost NINO Help</a></li>
                            </ul>
                        </div>
                        <div class="footer-column">
                            <h4>Get in Touch</h4>
                            <div class="contact-info">
                                <p><i class="fas fa-envelope"></i> support@nino.co.uk</p>
                                <p><i class="fas fa-phone-alt"></i> 020 7946 0123</p>
                                <p><i class="fas fa-map-marker-alt"></i> London, UK</p>
                                <p><i class="fas fa-clock"></i> Mon - Fri: 9am - 6pm</p>
                            </div>
                        </div>
                    </div>
                    <div class="disclaimer-footer">
                        <strong><i class="fas fa-exclamation-triangle"></i> Disclaimer:</strong> You can apply directly at the DWP or contact Job Centre Plus. We have no affiliations with any UK government body. You may apply directly by phoning Jobcentre plus where there will be no fee. We cannot grant your National Insurance Number; the decision rests solely with HMRC. We submit applications on your behalf for a service fee. For free applications visit <a href="https://www.gov.uk/apply-national-insurance-number" target="_blank" rel="noopener noreferrer">gov.uk/apply-national-insurance-number</a>.
                    </div>
                    <div class="footer-bottom">
                        <div>&copy; 2026 NI NO. All rights reserved.</div>
                        <div class="footer-bottom-links">
                            <a href="privacy-policy.html">Privacy Policy</a>
                            <a href="terms-conditions.html">Terms & Conditions</a>
                            <a href="cookie-policy.html">Cookie Policy</a>
                            <a href="accessibility.html">Accessibility</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
        footerContainer.innerHTML = footerHTML;
    } else {
        console.warn('❌ Footer container not found. Add <div id="footer-container"></div> to your page.');
    }

    // ========== LOAD EXTERNAL RESOURCES ==========
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(faLink);
    }
    if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Inter"]')) {
        const gfLink = document.createElement('link');
        gfLink.href = 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;400;500;600;700;800&display=swap';
        gfLink.rel = 'stylesheet';
        document.head.appendChild(gfLink);
    }

    // ========== INITIALIZE ALL FUNCTIONALITY ==========
    function initAll() {
        const toggleBtn = document.getElementById('mobileToggleBtn');
        const mobileNav = document.getElementById('mobileNavMenu');
        const stickyHeader = document.getElementById('stickyHeader');
        let isMenuOpen = false;

        // ===== STICKY HEADER SHADOW =====
        if (stickyHeader) {
            // Use Intersection Observer for better performance
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.intersectionRatio < 1) {
                            stickyHeader.classList.add('is-sticky');
                        } else {
                            stickyHeader.classList.remove('is-sticky');
                        }
                    },
                    { threshold: [1], rootMargin: '0px 0px 0px 0px' }
                );
                
                // Create sentinel element before header
                const sentinel = document.createElement('div');
                sentinel.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:1px;pointer-events:none;';
                stickyHeader.parentNode.insertBefore(sentinel, stickyHeader);
                observer.observe(sentinel);
            } else {
                // Fallback for older browsers
                window.addEventListener('scroll', function() {
                    if (window.scrollY > 0) {
                        stickyHeader.classList.add('is-sticky');
                    } else {
                        stickyHeader.classList.remove('is-sticky');
                    }
                }, { passive: true });
            }
        }

        // ===== MOBILE MENU TOGGLE =====
        if (toggleBtn && mobileNav) {
            function openMenu() {
                isMenuOpen = true;
                mobileNav.classList.add('open');
                const icon = toggleBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
                toggleBtn.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            }
            
            function closeMenu() {
                isMenuOpen = false;
                mobileNav.classList.remove('open');
                const icon = toggleBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                toggleBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
            
            function toggleMenu() {
                if (isMenuOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }
            }

            toggleBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMenu();
            });

            // Close on link click
            mobileNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    closeMenu();
                });
            });

            // Close on outside click
            document.addEventListener('click', function(event) {
                if (isMenuOpen && !toggleBtn.contains(event.target) && !mobileNav.contains(event.target)) {
                    closeMenu();
                }
            });

            // Close on Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && isMenuOpen) {
                    closeMenu();
                }
            });
        }

        // ===== MOBILE SERVICES DROPDOWN =====
        const servicesToggleBtn = document.getElementById('mobileServicesToggleBtn');
        const servicesSubmenuMenu = document.getElementById('mobileServicesSubmenuMenu');
        if (servicesToggleBtn && servicesSubmenuMenu) {
            servicesToggleBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const isOpen = servicesSubmenuMenu.style.display === 'block';
                servicesSubmenuMenu.style.display = isOpen ? 'none' : 'block';
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-chevron-down', isOpen);
                    icon.classList.toggle('fa-chevron-up', !isOpen);
                }
                this.setAttribute('aria-expanded', !isOpen);
            });
        }

        // ===== DISCLAIMER MORE INFO =====
        const disclaimerMore = document.querySelector('.disclaimer-more');
        if (disclaimerMore) {
            disclaimerMore.addEventListener('click', function(e) {
                e.preventDefault();
                alert('✅ You can apply for a National Insurance number for FREE directly through the official GOV.UK website.\n\n📌 Visit: https://www.gov.uk/apply-national-insurance-number\n\n⚠️ We are a private service that assists with the application process for a fee.');
            });
        }

        console.log('✅ NI NO Header & Footer initialized successfully - Sticky header active on all devices');
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        setTimeout(initAll, 50);
    }
})();

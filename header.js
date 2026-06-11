// header-footer.js - Combined Professional Header and Footer
// This script injects both the header and footer into any page where it is called

(function() {
    // ========== HEADER INJECTION ==========
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        // Header HTML with top disclaimer bar, logo, navigation, and mobile menu
        const headerHTML = `
            <style>
                /* ========== TOP DISCLAIMER BAR (HEADER) ========== */
                .top-disclaimer {
                    background: #fef9e6;
                    border-bottom: 1px solid #f0d080;
                    padding: 10px 24px;
                    text-align: center;
                    font-size: 0.75rem;
                    color: #7a5a20;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                .top-disclaimer a {
                    color: #b45309;
                    text-decoration: underline;
                    font-weight: 500;
                }
                .top-disclaimer a:hover {
                    color: #1e3a5f;
                }

                /* ========== PROFESSIONAL HEADER ========== */
                .site-header {
                    background: #ffffff;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    border-bottom: 1px solid #eef2f8;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                .header-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 28px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                }
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-decoration: none;
                    padding: 18px 0;
                    flex-shrink: 0;
                }
                .logo-icon {
                    width: 40px;
                    height: 40px;
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
                }
                .logo-text span {
                    font-weight: 400;
                    color: #6c7e94;
                    font-size: 1rem;
                }
                .nav-menu {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    flex-wrap: wrap;
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
                    box-shadow: 0 20px 35px -10px rgba(0,0,0,0.12);
                    border-radius: 20px;
                    z-index: 10;
                    top: 110%;
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
                .mobile-toggle {
                    display: none;
                    background: #f8fafd;
                    border: 1px solid #e2edf7;
                    border-radius: 50%;
                    width: 44px;
                    height: 44px;
                    font-size: 1.3rem;
                    cursor: pointer;
                    color: #1e3a5f;
                }
                .mobile-nav {
                    display: none;
                    background: white;
                    width: 100%;
                    max-height: 70vh;
                    overflow-y: auto;
                    border-top: 1px solid #eef2f8;
                }
                .mobile-nav.open {
                    display: block;
                }
                .mobile-nav-inner {
                    padding: 20px 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
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
                }
                .mobile-nav-link i {
                    color: #8a9bb0;
                    font-size: 13px;
                }
                .mobile-nav-link.cta-mobile {
                    background: #1e3a5f;
                    color: white;
                    padding: 14px 20px;
                    border-radius: 60px;
                    text-align: center;
                    margin-top: 16px;
                    border-bottom: none;
                    justify-content: center;
                }
                .mobile-dropdown-header {
                    display: flex;
                    justify-content: space-between;
                    padding: 14px 0;
                    font-weight: 600;
                    color: #1e3a5f;
                    border-bottom: 1px solid #f0f4fa;
                    cursor: pointer;
                }
                .mobile-submenu {
                    display: none;
                    padding-left: 20px;
                    background: #fafcff;
                    border-radius: 20px;
                }
                .mobile-submenu a {
                    display: block;
                    padding: 12px 8px;
                    text-decoration: none;
                    color: #4a5b6e;
                    font-size: 0.85rem;
                }
                @media (max-width: 960px) {
                    .nav-menu { display: none; }
                    .mobile-toggle { display: flex; align-items: center; justify-content: center; }
                }
                @media (max-width: 680px) {
                    .header-container { padding: 0 20px; }
                    .top-disclaimer { padding: 8px 16px; font-size: 0.7rem; }
                    .logo-text { font-size: 1.2rem; }
                    .logo-text span { font-size: 0.9rem; }
                    .logo-icon { width: 34px; height: 34px; font-size: 12px; }
                }
                @media (max-width: 480px) {
                    .logo-text { font-size: 1rem; }
                    .logo-text span { font-size: 0.8rem; }
                }
            </style>

            <!-- Top Disclaimer Bar -->
            <div class="top-disclaimer">
                <i class="fas fa-info-circle"></i> Nationalinsurancenumber.co is operated by a private company. You are able to apply directly with the JobCentre plus and HMRC where there will be no cost involved. We have no affiliations with any UK government body. For the official site please visit <a href="https://www.gov.uk" target="_blank" rel="noopener noreferrer">https://www.gov.uk</a>. <a href="#" class="disclaimer-more">Click here to find out more.</a>
            </div>

            <!-- Main Header -->
            <header class="site-header">
                <div class="header-container">
                    <a href="index.html" class="logo">
                        <div class="logo-icon">NI</div>
                        <div class="logo-text">NI NO</div>
                    </a>
                    <nav class="nav-menu">
                        <a href="index.html" class="nav-link">Home</a>
                        <a href="new-application-book.html" class="nav-link">New Application</a>
                        <a href="replacement-application.html" class="nav-link">Replacement</a>
                        <a href="update-details.html" class="nav-link">Update Details</a>
                        <div class="dropdown">
                            <a href="#" class="nav-link">Information <i class="fas fa-chevron-down" style="font-size: 9px;"></i></a>
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
                    <button class="mobile-toggle" id="mobileToggleBtn" aria-label="Menu">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>                   
                 <a href="index.html" class="logo">
                    </a>

                <div class="mobile-nav" id="mobileNavMenu">
                    <div class="mobile-nav-inner">
                        <a href="index.html" class="mobile-nav-link">Home <i class="fas fa-chevron-right"></i></a>
                        <a href="new-application-book.html" class="mobile-nav-link">New Application <i class="fas fa-chevron-right"></i></a>
                        <a href="replacement-application.html" class="mobile-nav-link">Replacement <i class="fas fa-chevron-right"></i></a>
                        <a href="update-details.html" class="mobile-nav-link">Update Details <i class="fas fa-chevron-right"></i></a>
                        <a href="contact.html" class="mobile-nav-link">Contact <i class="fas fa-chevron-right"></i></a>
                        <div id="mobileServicesToggleBtn" class="mobile-dropdown-header">
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
        console.warn('Header container not found. Header will not be displayed. Add <div id="header-container"></div> to your page.');
    }

    // ========== FOOTER INJECTION ==========
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
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
                                <div class="logo-text">NI NO <span>UK</span></div>
                            </div>
                            <p class="footer-description">Professional assistance for UK National Insurance number applications, replacements, and updates. Fast, reliable, and secure.</p>
                        </div>

                        <!-- Quick Links Column -->
                        <div class="footer-column">
                            <h4>Quick Links</h4>
                            <ul class="footer-links">
                                <li><a href="/new-application.html"><i class="fas fa-chevron-right"></i> New Application</a></li>
                                <li><a href="/replacement-application.html"><i class="fas fa-chevron-right"></i> Replacement Application</a></li>
                                <li><a href="/update-details.html"><i class="fas fa-chevron-right"></i> Update Details</a></li>
                                <li><a href="/contact.html"><i class="fas fa-chevron-right"></i> Contact Us</a></li>
                                <li><a href="/faqs.html"><i class="fas fa-chevron-right"></i> FAQs</a></li>
                            </ul>
                        </div>

                        <!-- Our Services Column -->
                        <div class="footer-column">
                            <h4>Our Services</h4>
                            <ul class="footer-links">
                                <li><a href="/nino-information"><i class="fas fa-chevron-right"></i> NINO Information</a></li>
                                <li><a href="/nino-students"><i class="fas fa-chevron-right"></i> NINO for Students</a></li>
                                <li><a href="/nino-dependants"><i class="fas fa-chevron-right"></i> NINO Dependants</a></li>
                                <li><a href="/nino-skilled-workers"><i class="fas fa-chevron-right"></i> NINO Skilled Workers</a></li>
                                <li><a href="/lost-nino-help"><i class="fas fa-chevron-right"></i> Lost NINO Help</a></li>
                            </ul>
                        </div>

                        <!-- Contact Info Column -->
                        <div class="footer-column">
                            <h4>Get in Touch</h4>
                            <div class="contact-info">
                                <p><i class="fas fa-envelope"></i> support@nino.co.uk</p>
                                <p><i class="fas fa-phone-alt"></i> 020 7946 0123</p>
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
                            <a href="/privacy-policy">Privacy Policy</a>
                            <a href="/terms-conditions">Terms & Conditions</a>
                            <a href="/cookie-policy">Cookie Policy</a>
                            <a href="/accessibility">Accessibility</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;

        footerContainer.innerHTML = footerHTML;
    } else {
        console.warn('Footer container not found. Footer will not be displayed. Add <div id="footer-container"></div> to your page.');
    }

    // ========== LOAD EXTERNAL RESOURCES ==========
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

    // ========== INITIALIZE MOBILE MENU FUNCTIONALITY ==========
    setTimeout(function() {
        // Header mobile menu toggle
        const toggleBtn = document.getElementById('mobileToggleBtn');
        const mobileNav = document.getElementById('mobileNavMenu');
        let isMenuOpen = false;

        if (toggleBtn && mobileNav) {
            function toggleMenu() {
                isMenuOpen = !isMenuOpen;
                mobileNav.classList.toggle('open', isMenuOpen);
                const icon = toggleBtn.querySelector('i');
                if (isMenuOpen) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }

            toggleBtn.addEventListener('click', toggleMenu);

            // Close menu when a link is clicked
            const mobileLinks = document.querySelectorAll('.mobile-nav-link');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (isMenuOpen) toggleMenu();
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                const isClickInside = toggleBtn.contains(event.target) || mobileNav.contains(event.target);
                if (!isClickInside && isMenuOpen) {
                    toggleMenu();
                }
            });
        }

        // Mobile services dropdown toggle
        const servicesToggleBtn = document.getElementById('mobileServicesToggleBtn');
        const servicesSubmenuMenu = document.getElementById('mobileServicesSubmenuMenu');
        if (servicesToggleBtn && servicesSubmenuMenu) {
            servicesToggleBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const isOpen = servicesSubmenuMenu.style.display === 'block';
                servicesSubmenuMenu.style.display = isOpen ? 'none' : 'block';
                const icon = this.querySelector('i');
                if (isOpen) {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                } else {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            });
        }

        // Disclaimer "Click here to find out more" alert (optional)
        const disclaimerMore = document.querySelector('.disclaimer-more');
        if (disclaimerMore) {
            disclaimerMore.addEventListener('click', function(e) {
                e.preventDefault();
                alert('You can apply for a National Insurance number for free directly through the official GOV.UK website: https://www.gov.uk/apply-national-insurance-number');
            });
        }
    }, 100);
})();
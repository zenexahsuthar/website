/**
 * Zenexa Infotech - Centralized Component Loader
 * Handles reliable loading of Header, Footer, and other partials.
 */

const ComponentLoader = {
    // Base path handling to support subdirectories
    getBasePath: function () {
        const path = window.location.pathname;
        // If we are in a subdirectory (like /services/ or /resources/), we need to go up one level
        // Count slashes to determine depth, ignoring the first slash
        const depth = (path.match(/\//g) || []).length - 1;
        // If depth > 0, return '../' repeated depth times, else './'
        // Actually, simpler: check if we are in a known subdirectory
        if (path.includes('/services/') || path.includes('/resources/')) {
            return '../';
        }
        return './';
    },

    load: function (selector, file, callback) {
        const basePath = this.getBasePath();
        const fullPath = basePath + file;

        $(selector).load(fullPath, function (response, status, xhr) {
            if (status == "error") {
                console.error(`Failed to load ${file}:`, xhr.status, xhr.statusText);
                // Optional: Inject fallback content or retry
            } else {
                // console.log(`Loaded ${file} successfully`);
                if (callback) callback();
            }
        });
    },

    init: function () {
        // Load Header
        this.load("#header", "header.html", () => {
            // Re-run any header-specific scripts if needed, or rely on event delegation
            // Highlight active link based on current URL
            this.highlightActiveLink();
        });

        // Load Footer
        this.load("#footer", "footer-ultimate.html", () => {
            // Initialize footer-specific scripts if any
            if (window.MainApp && window.MainApp.refreshAOS) {
                window.MainApp.refreshAOS();
            }
        });

        // Load other common components if they exist on the page
        if ($("#live-chat").length) {
            this.load("#live-chat", "components/live-chat-widget.html");
        }
        if ($("#newsletter").length) {
            this.load("#newsletter", "components/newsletter-popup.html");
        }
        if ($("#testimonials-section").length) {
            this.load("#testimonials-section", "components/testimonials-section.html", () => {
                // Refresh AOS after testimonials load as they affect height
                if (window.MainApp && window.MainApp.refreshAOS) {
                    window.MainApp.refreshAOS();
                }
            });
        }
        if ($("#faq-section").length) {
            this.load("#faq-section", "components/faq-accordion.html", () => {
                if (window.MainApp && window.MainApp.refreshAOS) {
                    window.MainApp.refreshAOS();
                }
            });
        }
    },

    highlightActiveLink: function () {
        const currentPath = window.location.pathname;
        // Logic to add 'text-teal-600' or similar class to the active nav link
        // This might need adjustment based on exact hrefs in header.html
    }
};

$(document).ready(function () {
    ComponentLoader.init();
});

/**
 * Zenexa Infotech - Main Application Script
 * Centralizes Configuration for Tailwind, Theme, and Animations.
 */

const MainApp = {
    init: function () {
        this.initTailwind();
        this.initTheme();
        this.initAOS();
        this.handleGlobalEvents();
    },

    initTailwind: function () {
        if (typeof tailwind !== 'undefined') {
            tailwind.config = {
                darkMode: 'class',
                theme: {
                    extend: {
                        fontFamily: {
                            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                            heading: ['"Outfit"', 'sans-serif'],
                        },
                        colors: {
                            primary: "#0f766e",
                            secondary: "#0d9488",
                            accent: "#06b6d4",
                            dark: "#0f172a",
                        },
                        animation: {
                            'blob': 'blob 7s infinite',
                            'float': 'float 6s ease-in-out infinite',
                            'spin-slow': 'spin 12s linear infinite',
                            'pulse-glow': 'pulse-glow 3s infinite',
                            'marker-pulse': 'marker-pulse 2s infinite',
                        },
                        keyframes: {
                            blob: {
                                '0%': { transform: 'translate(0px, 0px) scale(1)' },
                                '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                                '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                                '100%': { transform: 'translate(0px, 0px) scale(1)' },
                            },
                            float: {
                                '0%, 100%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(-20px)' },
                            },
                            shimmer: {
                                '100%': { transform: 'translateX(100%)' }
                            },
                            'pulse-glow': {
                                '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                                '50%': { opacity: 0.8, transform: 'scale(1.05)' },
                            },
                            'marker-pulse': {
                                '0%': { boxShadow: '0 0 0 0 rgba(20, 184, 166, 0.7)' },
                                '70%': { boxShadow: '0 0 0 15px rgba(20, 184, 166, 0)' },
                                '100%': { boxShadow: '0 0 0 0 rgba(20, 184, 166, 0)' }
                            }
                        }
                    }
                }
            };
        }
    },

    initTheme: function () {
        // Check for saved theme preference or use system preference
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    },

    initAOS: function () {
        // Initialize AOS with a slight delay to allow components to load
        // Or better, rely on ComponentLoader to trigger refresh
        if (typeof AOS !== 'undefined') {
            setTimeout(() => {
                AOS.init({
                    duration: 800,
                    once: true,
                    offset: 50, // Reduced offset to help with "bottom section not loading"
                    easing: 'ease-out-cubic'
                });
            }, 500); // 500ms delay to be safe
        }
    },

    refreshAOS: function () {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    },

    handleGlobalEvents: function () {
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const headerBg = document.getElementById('header-bg');
            if (headerBg) {
                if (window.scrollY > 20) {
                    headerBg.classList.add('bg-white/95', 'shadow-xl', 'dark:bg-slate-900/95');
                    headerBg.classList.remove('bg-white/80', 'dark:bg-slate-900/80');
                } else {
                    headerBg.classList.remove('bg-white/95', 'shadow-xl', 'dark:bg-slate-900/95');
                    headerBg.classList.add('bg-white/80', 'dark:bg-slate-900/80');
                }
            }
        });
    }
};

// Initialize immediately to apply config before rendering
MainApp.init();

// Expose to window for other scripts
window.MainApp = MainApp;

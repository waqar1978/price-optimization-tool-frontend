import { createTheme } from '@mui/material/styles';

// Define the color palette based on the UI screenshots
const palette = {
    primary: {
        main: '#26a69a', // A teal/green shade for primary buttons and accents
        contrastText: '#ffffff',
    },
    secondary: {
        main: '#00e5ff', // The bright cyan for highlights and calculated values
        contrastText: '#000000',
    },
    background: {
        default: '#1a1a1a', // The darkest background color for the main view
        paper: '#2c2c2c',   // Background for components like tables, modals, and cards
    },
    text: {
        primary: '#e0e0e0',   // Light grey for primary text
        secondary: '#b0bec5', // Softer grey for secondary text
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    success: {
        main: '#66bb6a',
    },
    error: {
        main: '#f44336',
    },
};

// Create the theme instance
const theme = createTheme({
    palette: palette,
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 600,
            color: palette.text.primary,
        },
        h5: {
            fontWeight: 600,
            color: palette.text.primary,
        },
        subtitle1: {
            color: palette.text.secondary,
        },
    },
    components: {
        // Override for the main app bar
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: palette.background.paper,
                    boxShadow: 'none',
                    borderBottom: `1px solid ${palette.divider}`,
                },
            },
        },
        // Override for buttons
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Buttons in the UI don't use uppercase text
                    borderRadius: '8px',
                    fontWeight: 600,
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: '#2e7d32', // A slightly darker green for hover
                    },
                },
            },
        },
        // Overrides for Tables
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: '#3a3a3a', // Header row with a slightly lighter background
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: `1px solid ${palette.divider}`,
                    padding: '12px 16px', // Adjust padding for a cleaner look
                },
                head: {
                    color: palette.text.primary,
                    fontWeight: '600',
                },
                body: {
                    color: palette.text.secondary,
                },
            },
        },
        // Override for Paper component (used in Cards, Modals etc.)
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none', // Disables MUI's default gradient for dark mode paper
                },
            },
        },
        // Override for Dialogs/Modals
        MuiDialog: {
            styleOverrides: {
                paper: {
                    border: `1px solid ${palette.divider}`,
                    borderRadius: '12px',
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    backgroundColor: '#3a3a3a',
                    padding: '12px 24px',
                },
            },
        },
    },
});

export default theme;
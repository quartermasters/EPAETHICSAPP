# Mobile App Assets

This directory contains all the static assets for the EPA Ethics mobile application.

## Required Assets

The following assets need to be created for the app:

### App Icons
- `icon.png` - 1024x1024px app icon
- `adaptive-icon.png` - 1024x1024px Android adaptive icon
- `favicon.png` - 32x32px web favicon

### Splash Screen
- `splash.png` - 1284x2778px splash screen image

### EPA Branding
- EPA logo in various sizes
- EPA seal for official documents
- Brand colors and guidelines compliance

## Temporary Placeholder

For development purposes, you can use simple colored squares as placeholders:

```bash
# Create placeholder icons (example using ImageMagick)
convert -size 1024x1024 xc:#0066CC icon.png
convert -size 1024x1024 xc:#0066CC adaptive-icon.png
convert -size 32x32 xc:#0066CC favicon.png
convert -size 1284x2778 xc:#FFFFFF splash.png
```

## EPA Brand Guidelines

When creating final assets, ensure compliance with:
- EPA Visual Identity guidelines
- Federal accessibility requirements
- Section 508 compliance for images
- Proper alt-text and descriptions

## File Naming Convention

- Use lowercase with hyphens for multi-word files
- Include size in filename if multiple sizes exist
- Use descriptive names (e.g., `epa-logo-horizontal.png`)

## Accessibility Requirements

All images must:
- Have appropriate alt-text
- Meet contrast requirements
- Be scalable for different screen sizes
- Support high-contrast mode where applicable
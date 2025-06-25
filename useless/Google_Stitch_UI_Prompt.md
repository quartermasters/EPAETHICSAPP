# Google Stitch UI Generation Prompt
## EPA Ethics Mobile App - EthicsGo

**Project Context:** Federal mobile application for EPA ethics training and compliance, developed by St. Michael Enterprises LLC under EPA Contract 68HERD25Q0050.

---

## 🎨 CORE DESIGN PROMPT

Create a modern, accessible mobile application UI design for "EthicsGo" - EPA's federal ethics training platform. Generate comprehensive UI screens with the following specifications:

### **PRIMARY BRAND IDENTITY**
- **App Name:** EthicsGo - Federal Ethics Awareness
- **Primary Colors:** 
  - EPA Blue: #0066CC
  - St. Michael Navy: #1B365D  
  - St. Michael Burgundy: #A51C30
- **Accent Gradients:** Purple-blue gradient (#667eea to #764ba2)
- **Typography:** Modern system fonts (Inter, SF Pro, Roboto)
- **Logo:** EPA shield + "EthicsGo" wordmark

### **DESIGN SYSTEM REQUIREMENTS**

**🎯 Visual Style:**
- **Design Language:** Modern glassmorphism with Material Design 3 principles
- **Color Scheme:** Light theme with glass blur effects, gradient accents
- **Card Style:** Floating cards with subtle shadows, rounded corners (16-20px radius)
- **Spacing:** 8px grid system, generous white space
- **Elevation:** Multi-layer depth with backdrop blur and soft shadows

**📱 Screen Specifications:**
- **Viewport:** Mobile-first (375x812px iPhone 13 Pro dimensions)
- **Safe Areas:** Respect notch and home indicator areas
- **Navigation:** Bottom tab bar with 5 primary sections
- **Layout:** Single-column card-based layout with sticky header

### **SCREEN COLLECTION TO GENERATE**

**1. HOME SCREEN**
```
Hero Section:
- Glassmorphism header with EPA logo and "EthicsGo" branding
- Gradient background (#667eea to #764ba2)
- API connection status indicator with pulse animation

Main Content:
- Welcome message with federal compliance theme
- 4 primary feature cards in grid:
  * 📚 Ethics Guide (Interactive training modules)
  * 🧠 Test Your Knowledge (Quiz system)
  * 🎥 Training Videos (Whiteboard sessions)
  * 📋 Resources (FAQ, Glossary, Documents)

Footer:
- St. Michael Enterprises LLC branding
- Contract number: 68HERD25Q0050
```

**2. ETHICS GUIDE SCREEN**
```
Header: 
- Back navigation + "Ethics Guide" title
- Progress indicator for module completion

Content Grid:
- Module cards with:
  * Topic icon and title
  * Description text
  * Estimated completion time
  * Progress badge (Not Started/In Progress/Complete)
  * Difficulty level indicator

Modules to Include:
- Federal Ethics Basics
- Conflict of Interest Rules  
- Gift and Travel Restrictions
- Post-Employment Limitations
- Financial Disclosure Requirements
- Whistleblower Protections
```

**3. QUIZ SCREEN**
```
Quiz Interface:
- Question counter (1 of 15)
- Progress bar
- Question text in card format
- Multiple choice answers as interactive buttons
- Navigation: Previous/Next/Submit

Results Screen:
- Score display with circular progress
- Correct/Incorrect breakdown
- Category performance analysis
- Retry and Review options
- Certificate generation for passing scores
```

**4. VIDEO LIBRARY SCREEN**
```
Video Grid Layout:
- Search and filter bar
- Category tabs (Ethics Basics, Case Studies, Q&A Sessions)
- Video thumbnail cards with:
  * Preview image
  * Title and duration
  * Play button overlay
  * View count and rating

Video Player:
- Full-screen video player
- Playback controls
- Closed captions toggle
- Notes and bookmarks feature
```

**5. RESOURCES SCREEN**
```
Tabbed Interface:
- FAQ section with expandable Q&A cards
- Glossary with alphabetical index
- Document library with download links
- Contact information for ethics office
- External links to official EPA resources

Search Functionality:
- Global search across all content
- Filter by content type
- Recent searches history
```

### **COMPONENT SPECIFICATIONS**

**🔧 Interactive Elements:**
- **Buttons:** Rounded (12px), gradient fills, subtle shadows, hover states
- **Cards:** Glassmorphism effect, backdrop blur, border highlights
- **Forms:** Floating labels, validation states, accessibility focus rings
- **Navigation:** Bottom tab bar with active state indicators and micro-animations

**♿ Accessibility Requirements:**
- **WCAG 2.1 AA Compliance:** Minimum 4.5:1 color contrast ratios
- **Touch Targets:** Minimum 44x44px, adequate spacing
- **Focus Indicators:** Visible focus rings for keyboard navigation
- **Screen Reader:** Semantic HTML structure, ARIA labels
- **Text Scaling:** Support for 200% zoom without horizontal scrolling

**🎭 Animation Guidelines:**
- **Entrance:** Staggered fade-in animations for cards (0.1s delays)
- **Interactions:** Smooth hover states with scale transforms
- **Transitions:** 0.3s cubic-bezier(0.4, 0, 0.2, 1) easing
- **Loading:** Skeleton screens and shimmer effects
- **Micro-interactions:** Button press feedback, pull-to-refresh

### **TECHNICAL SPECIFICATIONS**

**📋 Content Requirements:**
- **Ethics Modules:** 6+ interactive training modules with federal compliance focus
- **Quiz Bank:** 50+ questions across ethics categories
- **Video Library:** 12+ whiteboard training sessions
- **Resource Center:** Comprehensive FAQ, glossary, and document collection

**🔒 Security & Compliance:**
- **FedRAMP Low:** Visual indicators for security compliance
- **Section 508:** Full accessibility compliance badges
- **Privacy:** Clear data handling and privacy policy access
- **Authentication:** Government-grade login interface (when applicable)

**📊 Status Indicators:**
- **Connection Status:** Real-time API connectivity with color-coded indicators
- **Progress Tracking:** Visual completion status across all modules
- **Performance Metrics:** User advancement and achievement badges

### **BRAND INTEGRATION**

**EPA Federal Identity:**
- Official EPA color palette integration
- Federal design standards compliance
- Government accessibility requirements
- Professional, trustworthy visual tone

**St. Michael Enterprises LLC:**
- Subtle contractor branding in footer
- Company colors as accent elements
- Professional service provider credibility

---

## 🎯 GENERATION INSTRUCTIONS

**For Google Stitch:**
1. Generate all 5 primary screens in high-fidelity mockups
2. Include hover states and interaction patterns
3. Show both light theme variations
4. Demonstrate responsive behavior at mobile viewport
5. Include accessibility annotations and focus states
6. Show loading states and empty states for each screen
7. Generate component library with reusable UI elements
8. Create style guide with colors, typography, spacing rules

**Output Format:**
- High-resolution PNG mockups (2x retina)
- Interactive prototype links
- Design system documentation
- Accessibility compliance checklist
- Technical implementation notes

**Quality Standards:**
- Production-ready visual fidelity
- Government application professional standards
- Modern mobile UI/UX best practices
- Cross-platform design consistency
- Federal accessibility compliance verification

---

*This prompt is designed to generate a complete, professional mobile application UI that meets federal standards while providing an engaging, modern user experience for EPA ethics training and compliance.*
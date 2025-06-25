
# 📝 Product Requirements Document (PRD)
**Project Title:** EPA Ethics Mobile Application  
**Solicitation:** 68HERD25Q0050  
**Client:** U.S. Environmental Protection Agency (EPA), Office of General Counsel – Ethics Office  
**NAICS Code:** 513210 – Software Publishers  
**Contract Type:** Firm-Fixed Price  
**FedRAMP Requirement:** Low (Public-facing App)  
**Period of Performance:** 1 Base Year + 2 Option Years  
**Deployment Platforms:** iOS, Android  
**Admin Portal:** Web-based SaaS (Vendor-Hosted)

## 🔍 Purpose
To provide EPA employees and former employees with real-time, mobile access to critical ethics resources, including training videos, statutory guides, FAQs, and reference tools. The app will serve both compliance and education goals in alignment with federal regulations.

## 🎯 Goals and Objectives
- Empower EPA workforce with accessible, plain-language federal ethics guidance.
- Deliver a mobile-first tool aligned with Section 508 and FedRAMP Low standards.
- Enable secure internal control by EPA administrators via a web-based portal.
- Support compliance education through multimedia content and self-assessment tools.

## 📱 Product Features

### 1. Core Mobile App Modules
| Module                    | Description |
|---------------------------|-------------|
| Ethics News               | RSS feed module for real-time ethics-related updates |
| eGuide Library            | Interactive library with collapsible sections covering EPA/federal ethics |
| PDF Library               | Access to downloadable resources and reference documents |
| Video Library             | 6 whiteboard-style videos (rebranded), hosted with captions |
| FAQ                       | EPA-curated Q&A for recurring compliance questions |
| Test Your Knowledge       | Interactive quizzes (no login required), scored locally |
| Table of Terms            | Definitions for legal/ethics terms with internal linking |
| About Us / Contact Us     | Static, branded informational module |

### 2. Admin Web Portal
- Admin login secured with MFA
- Upload/update content in HTML, PDF, and multimedia formats
- Two user accounts (equal permissions)
- Version control and publishing workflow
- Usage analytics dashboard (excluding PII)
- Audit logs for login, logout, and content changes

## 📂 Content Requirements

| Content Type         | Provided By      | Managed Through         |
|----------------------|------------------|--------------------------|
| Federal Statutes     | EPA (Attachment 3) | Structured eGuide sections |
| QuickSeries Videos   | Edited by Vendor | EPA approval required   |
| Glossary & FAQ       | EPA              | Uploaded via portal     |

> **Note:** QuickSeries videos are third-party owned and must be rebranded (logos, narration, agency references) per PWS guidance.

## 🔐 Compliance Requirements

| Compliance Area | Requirement |
|------------------|------------|
| **FedRAMP Low** | Hosting must meet FedRAMP Low SaaS controls. Tasks from Cyber Checklist (B–Z) mapped to architecture and documented. |
| **Section 508 / ADA** | Full WCAG 2.1 AA compliance: screen readers, captions, keyboard nav, color contrast |
| **Cybersecurity Tasks** | Logging, access control, MFA, encryption, and risk assessment in line with Attachment 5 |
| **ATO Documentation** | Submit System Security Plan (SSP), POA&M, PIA, and SAR starting week 2, completed by week 10. EPA templates will be used. |

## 🛠️ Technical Specifications

| Item                     | Specification |
|--------------------------|---------------|
| Platforms                | iOS 13+, Android 8+ |
| App Type                 | Hybrid-native using React Native |
| Admin Portal             | Next.js/React 18-based SaaS interface |
| Content Hosting          | Vendor SaaS on FedRAMP Low environment |
| Data Handling            | No PII stored or transmitted |
| Max Download Allowance   | 10TB/year (no expected overage) |
| Offline Access           | Select eGuide content and videos available offline |

## 📆 Timeline

| Milestone | Timeline |
|-----------|----------|
| Initial App & Admin Portal | Within 6 weeks of COR approval |
| First 2 Whiteboard Videos  | Delivered in Base Year |
| eGuide Deployment          | Within 6 weeks of EPA content approval |
| Remaining Videos           | 2/year in Option Years 1 and 2 |

## 🧪 Testing & QA Plan

| Type              | Standard |
|------------------|----------|
| Performance       | 95+ Lighthouse mobile score |
| Accessibility     | WCAG 2.1 AA – JAWS, NVDA, VoiceOver tested |
| Functionality     | All features reviewed against PWS, errors logged & resolved |
| COR Acceptance    | Formal signoff required for each module/deliverable |
| Monitoring        | Logs, crash reports, traffic analytics via dashboard |

## 📊 Analytics & Monitoring
- Monitoring uptime (target: 99.9%)
- Real-time usage dashboards (admin only)
- Traffic logs (no PII)
- Daily backups with 7-day retention
- Alerts for anomaly detection (traffic spikes, login failures)

## 🧯 Disaster Recovery & Support

| Item              | Standard |
|------------------|----------|
| Daily Backups     | Yes, 7-day retention |
| Disaster Recovery | RTO < 4 hrs, RPO < 12 hrs |
| Tech Support      | Admin support via email (48hr SLA); no end-user support required |
| Documentation     | User guides and admin manuals included |

## 📦 App Store Deployment
- Submitted to Apple App Store, Google Play Store, and EPA iPhone Marketplace
- Updated regularly based on OS version updates and EPA policy changes
- Internal testing via TestFlight and Google Play beta channels

## 🛡 Risk Management & ATO Support
- Vendor will initiate ATO documentation in collaboration with EPA CIO’s office
- RMF compliance tied to QASP and Cybersecurity Checklist
- Incident response, penetration testing, and vulnerability scanning integrated into project plan

## ✅ Success Criteria

| Area | Metric |
|------|--------|
| App Deployment | iOS & Android stores live |
| Security | FedRAMP ATO granted |
| Accessibility | 100% WCAG 2.1 AA verified |
| Admin Functionality | All upload/edit tools functional |
| Training Content | 6 videos edited and hosted |
| User Experience | Sub-3-second load time, offline support enabled |

## 📌 Summary
The EPA Ethics Mobile App will be a modern, compliant, and intuitive tool that educates and supports ethics compliance across the EPA. With structured content, accessible interfaces, and robust admin features, it aligns tightly with all requirements in PWS 68HERD25Q0050.

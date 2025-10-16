# Design Guidelines: DailyTens-Style Mobile Trivia Game

## Design Approach

**Reference-Based Approach**: Replicating DailyTens.com aesthetic - clean, minimalist trivia game design optimized for mobile gameplay. Focus on lightweight performance with clear typography and straightforward interaction patterns.

**Key Design Principles**:
- Mobile-first, performance-critical design
- Minimal visual noise - content-focused layout
- Instant feedback for game interactions
- Clean, readable typography for question legibility
- Single-purpose screens without distraction

---

## Core Design Elements

### A. Color Palette

**Primary Colors (Light Mode)**:
- Background: 0 0% 100% (pure white)
- Primary Brand: 220 70% 50% (medium blue)
- Text Primary: 220 20% 20% (dark slate)
- Text Secondary: 220 15% 45% (medium slate)

**Accent Colors**:
- Success/Correct: 142 70% 45% (green)
- Error/Incorrect: 0 70% 50% (red)
- Neutral/Pending: 220 15% 65% (light gray)

**Dark Mode**: Not required (lightweight, battery-conscious)

### B. Typography

**Font Stack**: System fonts for performance
- Primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- Question Text: 1.25rem (20px), font-weight 600, line-height 1.4
- Answer Input: 1rem (16px), font-weight 400
- UI Elements: 0.875rem (14px), font-weight 500
- Score/Progress: 0.75rem (12px), font-weight 600, uppercase tracking

### C. Layout System

**Spacing Primitives**: Tailwind units of 3, 4, 6, and 8
- Micro spacing: p-3 (12px) for tight elements
- Standard spacing: p-4, m-4 (16px) for card padding
- Section spacing: py-6 (24px) between major sections
- Large spacing: py-8 (32px) for screen top/bottom padding

**Container Strategy**:
- Max-width: max-w-md (28rem/448px) centered on mobile
- Full-width on small devices with px-4 side padding
- Vertical centering for game screens: min-h-screen flex items-center

### D. Component Library

**Core UI Elements**:

*Logo/Branding*:
- Centered header with simple text logo or icon
- Height: h-12 to h-16, subtle drop shadow
- Positioned at top with mb-8 spacing

*Question Card*:
- White background, rounded-xl borders
- Shadow: shadow-lg for depth
- Padding: p-6 on mobile, p-8 on larger screens
- Question number indicator: Small badge top-right (1/6, 2/6, etc.)

*Answer Input Field*:
- Large touch-friendly text input: h-12 minimum
- Clear borders (2px), rounded-lg corners
- Focus state: Ring effect with primary color
- Placeholder: Light gray, hint text

*Navigation/Actions*:
- Primary CTA: Full-width button, h-12, rounded-lg
- Submit answer: Primary blue background
- Next question: Success green after correct answer
- Skip option: Text button, subtle gray

*Progress Indicator*:
- Horizontal progress bar or dot indicators
- Shows 6 steps clearly
- Current step highlighted in primary color
- Completed steps in success green

*Results Screen*:
- Score display: Large typography (2rem+), centered
- Question review list: Compact cards showing Q&A pairs
- Visual indicators: ✓ for correct, ✗ for incorrect
- Share/retry buttons at bottom

**Data Display**:
- Question text: Left-aligned, readable line-length
- Answer review: Two-column layout (Your Answer | Correct Answer)
- Score summary: Bold numbers with descriptive labels

### E. Animations

**Minimal Motion** (performance-critical):
- Question transitions: Simple fade (150ms)
- Button feedback: Scale on press (100ms)
- Success/error states: Quick color flash (200ms)
- No complex animations or scroll effects

---

## Images

**No Hero Image Required**: This is a utility-focused game - launch directly into gameplay

**Optional Visual Elements**:
- Small decorative icon in logo/header
- Subtle background pattern (very light, barely visible)
- Checkmark/X icons for answer feedback (SVG icons from Heroicons)

**Icon Library**: Heroicons (via CDN) for UI elements - check, x-mark, arrow-right, play icons

---

## Mobile Optimization

**Touch Targets**: Minimum 44px height for all interactive elements
**Input Focus**: Prevent zoom on iOS (font-size: 16px minimum)
**Viewport**: meta viewport tag with width=device-width
**Performance**: Inline critical CSS, defer non-essential scripts
**Accessibility**: ARIA labels for screen readers, keyboard navigation support

**Game Flow**:
1. Landing screen with "Start" button
2. Question screens (1-6) with input field
3. Results screen with score and review
4. Retry/share options
# CLAUDE.md

# In-sait Development Guidelines

This repository contains the website and digital assets for **In-sait**, a boutique consultancy focused on Data, Analytics, Engineering and Digital Solutions.

These guidelines apply to every task unless explicitly overridden.

---

# Core Philosophy

Everything should prioritize:

1. Simplicity
2. Readability
3. Consistency
4. Maintainability
5. Accessibility
6. Performance

Avoid unnecessary complexity.

Prefer clear code over clever code.

---

# Brand Rules

The Brand Manual is the single source of truth.

Never:

- redesign the logo
- invent colors
- invent typography
- distort branding

Always use the supplied assets.

Brand assets are located inside:

/assets/brand

---

# Design Principles

The website should communicate:

- technical excellence
- trust
- precision
- premium consulting
- engineering mindset

Avoid making it feel like:

- marketing agency
- crypto startup
- NFT website
- gaming company
- flashy portfolio

Less is more.

Whitespace is intentional.

Animations are subtle.

---

# Component Philosophy

Every UI element should become a reusable component whenever possible.

Examples:

Navbar

Hero

Button

Card

Section

Container

Badge

Timeline

FAQ

Footer

Form

Never duplicate components.

Prefer composition over repetition.

---

# Styling Rules

Use TailwindCSS.

Do not write inline styles unless absolutely necessary.

Avoid arbitrary values unless required.

Use spacing scale consistently.

Prefer utility classes over custom CSS.

If custom CSS is required:

Keep it minimal.

Document why it exists.

---

# Color Usage

Use only colors defined in the Brand Manual.

Primary Accent

Pink

Primary Dark

Anthracite

Neutral Greys

White

The cyan accent should only appear when it improves visual hierarchy.

Avoid rainbow interfaces.

---

# Typography

Typography should always follow hierarchy.

One H1.

Logical H2.

Logical H3.

Comfortable line-height.

Readable paragraph width.

Never create tiny unreadable text.

---

# Layout

Maximum content width:

1280px

Content centered.

Responsive by default.

Mobile-first implementation.

Every section should breathe.

Avoid cramped layouts.

---

# Motion

Animations should improve understanding.

Never distract.

Prefer:

Fade

Slide

Opacity

Scale

Small transforms

Respect prefers-reduced-motion.

---

# Accessibility

Always write semantic HTML.

Use:

header

nav

main

section

article

footer

Buttons must be buttons.

Links must be links.

Forms require labels.

Images require alt text.

Keyboard navigation must work.

Focus states must remain visible.

Target WCAG AA.

---

# Performance

Minimize JavaScript.

Lazy-load images.

Optimize SVGs.

Use responsive images.

Avoid unnecessary dependencies.

Do not use heavy animation libraries when CSS is sufficient.

---

# React Guidelines

Use:

TypeScript

Functional Components

Hooks

Composition

Prefer server components where appropriate.

Avoid unnecessary state.

Keep components small.

Single responsibility.

---

# File Organization

Organize code clearly.

Example:

components/

ui/

layout/

sections/

cards/

charts/

icons/

lib/

hooks/

types/

styles/

public/

assets/

brand/

Avoid dumping everything into one folder.

---

# Naming Conventions

Components:

PascalCase

Example:

Hero.tsx

Navbar.tsx

ServiceCard.tsx

Hooks:

useSomething.ts

Utilities:

camelCase

Constants:

UPPER_SNAKE_CASE when appropriate.

---

# Code Style

Readable before clever.

Avoid deeply nested code.

Extract repeated logic.

Write self-documenting code.

Comment only when necessary.

Good naming is preferred over comments.

---

# Reusability

Before creating a new component, ask:

Can an existing component solve this?

Can it become configurable?

Can it be reused later?

Avoid duplicate implementations.

---

# Forms

Validate inputs.

Provide helpful error messages.

Use accessible labels.

Loading states should exist.

Buttons should indicate progress.

---

# Icons

Use Lucide icons whenever possible.

Only use custom icons when required by branding.

Keep icon sizes consistent.

---

# Images

Prefer SVG.

Optimize PNGs.

Avoid decorative images without purpose.

Never stretch images.

---

# Responsive Rules

Support:

Desktop

Laptop

Tablet

Mobile

Do not hide important functionality on mobile.

Layouts should gracefully stack.

---

# Git Philosophy

Small commits.

Descriptive commit messages.

Keep unrelated changes separate.

---

# Documentation

If a decision is not obvious, document it.

If creating reusable utilities, explain their purpose.

Keep README updated.

---

# AI Behavior

Before implementing a feature:

Understand the existing architecture.

Reuse existing components.

Maintain visual consistency.

Respect the Design Brief.

Never introduce a second design language.

When uncertain, choose the simplest solution.

---

# Quality Checklist

Before considering a task complete, verify:

✓ Responsive

✓ Accessible

✓ Brand compliant

✓ No duplicated code

✓ Reusable components

✓ Good spacing

✓ Good typography

✓ Proper semantic HTML

✓ No console errors

✓ No TypeScript errors

✓ No ESLint errors

✓ Optimized assets

✓ Consistent colors

✓ Consistent shadows

✓ Consistent border radius

✓ Smooth animations

✓ Fast loading

---

# Success Criteria

The finished product should feel comparable in quality to:

- Vercel
- Stripe
- Linear
- Supabase
- Retool
- Snowflake

It should communicate confidence, technical expertise and premium consulting without relying on exaggerated marketing language.

Every design decision should reinforce the perception that In-sait is a trusted engineering and data consulting partner for medium and large organizations.

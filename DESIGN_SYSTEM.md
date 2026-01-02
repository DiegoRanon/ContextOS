# ContextOS Design System

A comprehensive guide to the design system, color palettes, and reusable components for ContextOS.

---

## 🎨 Color Palette

### Light Mode Colors

#### Background & Surface

```css
--background: #fafbfc           /* Main background */
--surface: #ffffff              /* Card/component backgrounds */
--surface-secondary: #f5f7fa    /* Secondary surface for variety */
```

#### Text Colors

```css
--foreground: #1a1d29           /* Primary text */
--foreground-secondary: #64748b /* Secondary text */
--foreground-muted: #94a3b8     /* Muted/tertiary text */
```

#### Primary Colors (Indigo - Focus & Thinking)

```css
--primary: #6366f1              /* Primary actions, links */
--primary-hover: #4f46e5        /* Hover state */
--primary-light: #eef2ff        /* Backgrounds, highlights */
```

#### Accent Colors (Purple - Creativity)

```css
--accent: #a855f7               /* Accent actions, highlights */
--accent-hover: #9333ea         /* Hover state */
--accent-light: #faf5ff         /* Backgrounds */
```

#### Semantic Colors

```css
/* Success - Green */
--success: #10b981
--success-light: #d1fae5

/* Warning - Amber */
--warning: #f59e0b
--warning-light: #fef3c7

/* Error - Red */
--error: #ef4444
--error-light: #fee2e2
```

#### Borders

```css
--border: #e2e8f0               /* Default border */
--border-hover: #cbd5e1         /* Hover state */
```

#### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
```

### Dark Mode Colors

```css
--background: #0a0a0f           /* Main background */
--surface: #13131a              /* Card backgrounds */
--surface-secondary: #1a1a24    /* Secondary surfaces */
--foreground: #f1f5f9           /* Primary text */
--foreground-secondary: #94a3b8 /* Secondary text */
--foreground-muted: #64748b     /* Muted text */
--primary: #818cf8              /* Lighter for dark bg */
--primary-hover: #a5b4fc        /* Hover state */
--primary-light: #1e1b4b        /* Dark backgrounds */
--accent: #c084fc               /* Lighter accent */
--accent-hover: #d8b4fe         /* Hover state */
--accent-light: #2e1065         /* Dark backgrounds */
--border: #27273a               /* Borders */
--border-hover: #3f3f5e         /* Hover borders */
```

---

## 🎬 Animations

### Available Animations

#### Fade In

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* Usage: className="animate-fadeIn" */
```

#### Slide In

```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
/* Usage: className="animate-slideIn" */
```

#### Pulse Subtle

```css
@keyframes pulse-subtle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}
/* Usage: className="animate-pulse-subtle" */
```

#### Shimmer

```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
```

### Animation Delays

Use inline styles for staggered animations:

```jsx
<div className="animate-fadeIn" style={{ animationDelay: "0.1s" }}>
```

---

## 🎨 Utility Classes

### Glass Effect

```css
.glass-effect/* Creates frosted glass appearance with blur */;
```

**Usage:**

```jsx
<nav className="glass-effect">...</nav>
```

### Gradient Text

```css
.gradient-text/* Linear gradient from primary to accent */;
```

**Usage:**

```jsx
<h1>
  Focus on <span className="gradient-text">what matters</span>
</h1>
```

### Gradient Border

```css
.gradient-border/* Creates gradient border effect */;
```

**Usage:**

```jsx
<div className="gradient-border">...</div>
```

---

## 🧩 Reusable Components

### 1. Button Component

**Location:** `app/components/ui/Button.tsx`

#### Props

```typescript
interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  // ...extends HTMLButtonElement attributes
}
```

#### Variants

##### Primary (Default)

```jsx
<Button variant="primary">Click Me</Button>
```

- Background: Primary color (#6366f1)
- Text: White
- Use for: Primary actions, main CTAs

##### Secondary

```jsx
<Button variant="secondary">Secondary Action</Button>
```

- Background: Accent color (#a855f7)
- Text: White
- Use for: Secondary important actions

##### Outline

```jsx
<Button variant="outline">Outline Button</Button>
```

- Border: 2px primary color
- Text: Primary color
- Background: Transparent → primary-light on hover
- Use for: Secondary actions, alternatives

##### Ghost

```jsx
<Button variant="ghost">Ghost Button</Button>
```

- Background: Transparent → surface-secondary on hover
- Text: Foreground-secondary
- Use for: Tertiary actions, minimal emphasis

##### Danger

```jsx
<Button variant="danger">Delete</Button>
```

- Background: Error color (#ef4444)
- Text: White
- Use for: Destructive actions

#### Sizes

```jsx
<Button size="sm">Small</Button>    // px-3 py-1.5 text-sm
<Button size="md">Medium</Button>   // px-4 py-2 text-base (default)
<Button size="lg">Large</Button>    // px-6 py-3 text-lg
```

#### Loading State

```jsx
<Button isLoading={true}>Processing...</Button>
```

Shows spinner and "Loading..." text, disables interaction.

#### Examples

```jsx
// Primary CTA
<Button variant="primary" size="lg">
  Get Started Free
</Button>

// With icon
<Button variant="primary">
  <PlusIcon />
  Create Context
</Button>

// Danger with confirmation
<Button
  variant="danger"
  isLoading={isDeleting}
  onClick={handleDelete}
>
  Delete Context
</Button>
```

---

### 2. Card Components

**Location:** `app/components/ui/Card.tsx`

#### Components Available

- `Card` - Main container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardDescription` - Description text
- `CardContent` - Main content area
- `CardFooter` - Footer section

#### Card Props

```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean; // Adds hover effect
  gradient?: boolean; // Adds gradient border
}
```

#### Basic Usage

```jsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/app/components/ui/Card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Optional description text</CardDescription>
  </CardHeader>
  <CardContent>Main content goes here</CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>;
```

#### With Hover Effect

```jsx
<Card hover>{/* Content */}</Card>
```

Adds shadow, slight translation, and border color change on hover.

#### With Gradient Border

```jsx
<Card gradient>{/* Content */}</Card>
```

Adds animated gradient border effect.

#### Examples

##### Info Card

```jsx
<Card>
  <CardHeader>
    <CardTitle>Statistics</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">{/* Stats */}</div>
  </CardContent>
</Card>
```

##### Interactive Card

```jsx
<Card hover className="cursor-pointer">
  <CardHeader>
    <CardTitle>Context Title</CardTitle>
    <CardDescription>Context description</CardDescription>
  </CardHeader>
  <CardFooter>
    <Button variant="primary">Open</Button>
    <Button variant="ghost">Delete</Button>
  </CardFooter>
</Card>
```

##### Feature Card

```jsx
<Card gradient>
  <CardHeader>
    <div className="w-12 h-12 rounded-lg bg-linear-to-br from-primary to-accent">
      <Icon />
    </div>
    <CardTitle>Feature Name</CardTitle>
    <CardDescription>Feature description goes here</CardDescription>
  </CardHeader>
</Card>
```

---

### 3. Input Component

**Location:** `app/components/ui/Input.tsx`

#### Props

```typescript
interface InputProps extends HTMLInputElement {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  // ...all standard input props
}
```

#### Basic Usage

```jsx
import Input from "@/app/components/ui/Input";

<Input
  name="email"
  type="email"
  label="Email Address"
  placeholder="you@example.com"
  required
/>;
```

#### With Icon

```jsx
<Input
  name="email"
  type="email"
  label="Email"
  placeholder="you@example.com"
  icon={
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
      />
    </svg>
  }
/>
```

#### With Helper Text

```jsx
<Input
  name="password"
  type="password"
  label="Password"
  helperText="At least 8 characters"
  placeholder="••••••••"
/>
```

#### With Error State

```jsx
<Input
  name="email"
  type="email"
  label="Email"
  error="Invalid email address"
  value={email}
/>
```

Shows red border, error icon, and error message.

#### Examples

##### Login Form

```jsx
<form className="flex flex-col gap-5">
  <Input
    name="email"
    type="email"
    label="Email"
    placeholder="you@example.com"
    required
    icon={<EmailIcon />}
  />

  <Input
    name="password"
    type="password"
    label="Password"
    placeholder="••••••••"
    required
    icon={<LockIcon />}
  />

  <Button type="submit" variant="primary" size="lg">
    Sign In
  </Button>
</form>
```

##### With Validation

```jsx
const [email, setEmail] = useState("");
const [error, setError] = useState("");

<Input
  name="email"
  type="email"
  label="Email"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    if (!e.target.value.includes("@")) {
      setError("Please enter a valid email");
    } else {
      setError("");
    }
  }}
  error={error}
  icon={<EmailIcon />}
/>;
```

---

### 4. Badge Component

**Location:** `app/components/ui/Badge.tsx`

#### Props

```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "error";
  className?: string;
}
```

#### Variants

##### Default

```jsx
<Badge variant="default">Default</Badge>
```

- Background: surface-secondary
- Text: foreground-secondary

##### Primary

```jsx
<Badge variant="primary">Active</Badge>
```

- Background: primary-light
- Text: primary

##### Success

```jsx
<Badge variant="success">Completed</Badge>
```

- Background: success-light
- Text: success

##### Warning

```jsx
<Badge variant="warning">Pending</Badge>
```

- Background: warning-light
- Text: warning

##### Error

```jsx
<Badge variant="error">Failed</Badge>
```

- Background: error-light
- Text: error

#### Examples

##### Status Indicators

```jsx
<Badge variant="primary">Active</Badge>
<Badge variant="success">Completed</Badge>
<Badge variant="warning">In Progress</Badge>
<Badge variant="error">Failed</Badge>
```

##### With Icons

```jsx
<Badge variant="success">
  <CheckIcon className="w-3 h-3" />
  Verified
</Badge>
```

##### In Context

```jsx
<div className="flex items-center gap-2">
  <h3>Project Title</h3>
  <Badge variant="primary">Active</Badge>
</div>
```

---

## 📐 Layout Patterns

### Page Container

```jsx
<div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">{/* Content */}</div>
</div>
```

### Form Container

```jsx
<div className="w-full max-w-md mx-auto">
  <div className="bg-surface rounded-2xl shadow-xl border border-border p-8">
    <form className="flex flex-col gap-5">{/* Form fields */}</form>
  </div>
</div>
```

### Card Grid

```jsx
<div className="grid md:grid-cols-3 gap-8">
  <Card>{/* Card 1 */}</Card>
  <Card>{/* Card 2 */}</Card>
  <Card>{/* Card 3 */}</Card>
</div>
```

### Two-Column Layout

```jsx
<div className="grid lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">{/* Main content */}</div>
  <div>{/* Sidebar */}</div>
</div>
```

---

## 🎯 Common Patterns

### Loading Button

```jsx
const [isLoading, setIsLoading] = useState(false);

<Button
  isLoading={isLoading}
  onClick={async () => {
    setIsLoading(true);
    await performAction();
    setIsLoading(false);
  }}
>
  Submit
</Button>;
```

### Error Display

```jsx
{
  error && (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-error-light border border-error/20 animate-fadeIn">
      <svg
        className="w-5 h-5 text-error flex-shrink-0 mt-0.5"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
      <div>
        <p className="text-sm font-medium text-error">{error}</p>
      </div>
    </div>
  );
}
```

### Empty State

```jsx
<div className="flex flex-col items-center justify-center py-12 px-4">
  <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-primary-light to-accent-light flex items-center justify-center mb-6">
    <Icon className="w-10 h-10 text-primary" />
  </div>
  <h3 className="text-2xl font-bold text-foreground mb-3">No items yet</h3>
  <p className="text-foreground-secondary text-center max-w-md mb-6">
    Get started by creating your first item.
  </p>
  <Button variant="primary">
    <PlusIcon />
    Create Item
  </Button>
</div>
```

### Staggered Animations

```jsx
{
  items.map((item, index) => (
    <div
      key={item.id}
      className="animate-fadeIn"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <Card>{/* Content */}</Card>
    </div>
  ));
}
```

---

## 🔤 Typography Scale

### Headings

```jsx
<h1 className="text-4xl sm:text-5xl font-bold text-foreground">
  Main Heading
</h1>

<h2 className="text-3xl sm:text-4xl font-bold text-foreground">
  Section Heading
</h2>

<h3 className="text-2xl font-bold text-foreground">
  Subsection Heading
</h3>

<h4 className="text-xl font-semibold text-foreground">
  Card Title
</h4>
```

### Body Text

```jsx
<p className="text-lg text-foreground-secondary">
  Large body text
</p>

<p className="text-base text-foreground">
  Regular body text
</p>

<p className="text-sm text-foreground-secondary">
  Small body text
</p>

<p className="text-xs text-foreground-muted">
  Extra small text
</p>
```

---

## 🎨 Icon Guidelines

### Size Classes

- `w-4 h-4` - Small icons (16px)
- `w-5 h-5` - Regular icons (20px)
- `w-6 h-6` - Medium icons (24px)
- `w-8 h-8` - Large icons (32px)

### Icon with Text

```jsx
<div className="flex items-center gap-2">
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    {/* Icon path */}
  </svg>
  <span>Text Label</span>
</div>
```

### Icon Button

```jsx
<button className="p-2 rounded-lg hover:bg-surface-secondary transition-colors">
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    {/* Icon path */}
  </svg>
</button>
```

---

## 🌓 Dark Mode Support

All components automatically support dark mode through CSS variables. The system respects the user's `prefers-color-scheme` preference.

### Testing Dark Mode

```css
/* Manually set in browser DevTools or CSS */
@media (prefers-color-scheme: dark) {
  /* Dark mode colors apply */
}
```

---

## ♿ Accessibility

### Focus States

All interactive elements have visible focus states:

```css
*:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Button States

- `:hover` - Visual feedback
- `:active` - Scale effect (0.98)
- `:disabled` - 50% opacity, no pointer events
- `:focus-visible` - Outline ring

### Form Labels

Always include labels for inputs:

```jsx
<Input
  label="Email Address" // Visible label
  name="email"
  type="email"
  required
/>
```

---

## 📱 Responsive Breakpoints

Using Tailwind's default breakpoints:

```css
/* Mobile first approach */
.class                 /* 0px+ (mobile) */
sm:class              /* 640px+ (tablet) */
md:class              /* 768px+ (landscape tablet) */
lg:class              /* 1024px+ (desktop) */
xl:class              /* 1280px+ (large desktop) */
```

### Common Responsive Patterns

#### Responsive Grid

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

#### Responsive Text

```jsx
<h1 className="text-4xl sm:text-5xl lg:text-6xl">
```

#### Responsive Flex

```jsx
<div className="flex flex-col sm:flex-row gap-4">
```

---

## 🚀 Performance Tips

1. **Use CSS Variables**: All colors use CSS variables for consistency and easy theming
2. **Minimize Re-renders**: Components are optimized with minimal state
3. **CSS Animations**: Hardware-accelerated CSS animations instead of JS
4. **Lazy Loading**: Use Next.js dynamic imports for heavy components
5. **Image Optimization**: Use Next.js Image component

---

## 📋 Component Checklist

When creating new components:

- [ ] Use design system colors (CSS variables)
- [ ] Include hover/active states
- [ ] Add focus-visible styles
- [ ] Support dark mode
- [ ] Make it responsive
- [ ] Add loading states (if applicable)
- [ ] Include error states (if applicable)
- [ ] Add TypeScript types
- [ ] Test accessibility (keyboard navigation)
- [ ] Document props and usage

---

## 🎨 Design Philosophy

**ContextOS follows these principles:**

1. **Clarity over Decoration** - Every visual element serves a purpose
2. **Consistency is Key** - Reuse components and patterns
3. **Feedback Matters** - Users should know what's happening (loading, errors, success)
4. **Accessibility First** - Design for everyone
5. **Performance Aware** - Fast, smooth, delightful
6. **Progressive Enhancement** - Works without JS, better with it

---

_Last updated: January 2026_
_Design System Version: 1.0_

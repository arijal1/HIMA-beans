import React, { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ============================================================
   Types
   ============================================================ */

export type ButtonVariant = 'primary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children' | 'ref'> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Show loading spinner and disable interactions */
  loading?: boolean;
  /** Optional icon rendered after the label */
  icon?: React.ReactNode;
  /** Show default arrow icon (ignored when `icon` is provided) */
  showArrow?: boolean;
  children: React.ReactNode;
  className?: string;
}

/* ============================================================
   Style maps
   ============================================================ */

const variantClasses: Record<ButtonVariant, string> = {
  /**
   * Solid Muted Gold background, Warm Cream text.
   * The flagship CTA button.
   */
  primary: [
    'bg-[#7B5920] text-[#F3EFE6]',
    'border border-[#7B5920]',
    'hover:bg-[#967033] hover:border-[#967033]',
    'focus-visible:ring-[#7B5920] focus-visible:ring-offset-[#F3EFE6]',
  ].join(' '),

  /**
   * Transparent background with Cream border and Cream text.
   * Used on dark sections or as a secondary action.
   */
  outline: [
    'bg-transparent text-[#F3EFE6]',
    'border border-[#F3EFE6]/70',
    'hover:bg-[#F3EFE6]/8 hover:border-[#F3EFE6]',
    'focus-visible:ring-[#F3EFE6] focus-visible:ring-offset-[#182118]',
  ].join(' '),

  /**
   * Text-only button with an animated arrow; no border or background.
   * Used for tertiary actions like "Learn more".
   */
  ghost: [
    'bg-transparent text-[#7B5920]',
    'border border-transparent',
    'hover:text-[#967033]',
    'focus-visible:ring-[#7B5920] focus-visible:ring-offset-transparent',
    'underline-offset-4',
  ].join(' '),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-[10px] tracking-[0.2em] gap-2',
  md: 'px-7 py-3.5 text-[11px] tracking-[0.22em] gap-2.5',
  lg: 'px-9 py-4.5 text-[12px] tracking-[0.24em] gap-3',
};

const iconSizes: Record<ButtonSize, number> = {
  sm: 12,
  md: 13,
  lg: 15,
};

/* ============================================================
   Framer Motion press animation
   ============================================================ */

const tapAnimation = { scale: 0.965 };
const hoverAnimation = { scale: 1.02 };

/* ============================================================
   Button component
   ============================================================ */

/**
 * HIMA BEANS reusable button.
 *
 * ```tsx
 * <Button variant="primary" size="md">Shop Now</Button>
 * <Button variant="outline" size="lg" showArrow>Learn More</Button>
 * <Button variant="ghost" size="sm">Explore Journal</Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    showArrow = false,
    children,
    className,
    disabled,
    whileHover,
    whileTap,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;
  const iconSize = iconSizes[size];

  /* For ghost variant, never scale on hover — keep it text-only */
  const resolvedHoverAnim =
    variant === 'ghost' ? undefined : (whileHover ?? hoverAnimation);
  const resolvedTapAnim = whileTap ?? tapAnimation;

  const resolvedIcon = icon ?? (showArrow || variant === 'ghost' ? (
    <ArrowRight
      size={iconSize}
      strokeWidth={1.5}
      className={[
        'transition-transform duration-200',
        variant === 'ghost'
          ? 'group-hover:translate-x-1'
          : '',
      ].join(' ')}
      aria-hidden="true"
    />
  ) : null);

  return (
    <motion.button
      ref={ref}
      whileHover={isDisabled ? undefined : resolvedHoverAnim}
      whileTap={isDisabled ? undefined : resolvedTapAnim}
      transition={{ type: 'spring', stiffness: 360, damping: 26, mass: 0.6 }}
      disabled={isDisabled}
      className={cn(
        /* Base */
        'group relative inline-flex items-center justify-center',
        'font-sans font-medium uppercase tracking-widest',
        'transition-colors duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        /* Variant */
        variantClasses[variant],
        /* Size */
        sizeClasses[size],
        /* Disabled / loading */
        isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        /* Consumer overrides */
        className,
      )}
      aria-busy={loading ? true : undefined}
      aria-disabled={isDisabled}
      {...rest}
    >
      {/* Loading spinner (replaces content) */}
      {loading ? (
        <>
          <Loader2
            size={iconSize + 2}
            className="animate-spin"
            aria-hidden="true"
          />
          <span className="sr-only">Loading…</span>
        </>
      ) : (
        <>
          {children}
          {resolvedIcon}
        </>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;

'use client'

import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
}

const sizeStyles = {
  sm:  'px-4 py-2 text-sm',
  md:  'px-6 py-3 text-sm',
  lg:  'px-8 py-4 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-lg font-medium tracking-wide transition-all duration-200 cursor-pointer select-none'

  const variants = {
    primary: `
      btn-primary
    `,
    secondary: `
      btn-secondary
    `,
    ghost: `
      btn-ghost
    `,
  }

  const styles = `${base} ${sizeStyles[size]} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  )
}

import React from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export function Card({
  children,
  className = "",
  hover = false,
  gradient = false,
}: CardProps) {
  const baseStyles =
    "bg-surface rounded-xl border border-border p-6 transition-all duration-300";
  const hoverStyles = hover
    ? "hover:shadow-lg hover:border-border-hover hover:-translate-y-1 cursor-pointer"
    : "";
  const gradientStyles = gradient ? "gradient-border" : "";

  return (
    <div className={`${baseStyles} ${hoverStyles} ${gradientStyles} ${className}`}>
      {children}
    </div>
  );
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className = "" }: CardTitleProps) {
  return (
    <h3 className={`text-xl font-semibold text-foreground ${className}`}>
      {children}
    </h3>
  );
}

export interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({
  children,
  className = "",
}: CardDescriptionProps) {
  return (
    <p className={`text-sm text-foreground-secondary mt-1 ${className}`}>
      {children}
    </p>
  );
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={className}>{children}</div>;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={`mt-4 flex items-center gap-2 ${className}`}>
      {children}
    </div>
  );
}


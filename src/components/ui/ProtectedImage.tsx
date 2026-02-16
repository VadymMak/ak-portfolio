'use client';

import { ReactNode, DragEvent, MouseEvent } from 'react';
import styles from './ProtectedImage.module.css';

/**
 * ProtectedImage — wraps any <img> with anti-theft protection:
 * - Disables right-click context menu
 * - Disables drag-and-drop
 * - Transparent overlay prevents "Save Image As"
 * - Invisible watermark (visible only when contrast is increased)
 * - CSS user-select: none
 *
 * className is applied to the <img> tag (not the wrapper)
 * so section-specific styles like object-fit work correctly.
 */

interface ProtectedImageProps {
  children?: ReactNode;
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  [key: string]: unknown;
}

export default function ProtectedImage({
  children,
  src,
  alt = '',
  className = '',
  style = {},
  loading = 'lazy',
  ...imgProps
}: ProtectedImageProps) {
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const handleDragStart = (e: DragEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <div
      className={styles.wrapper}
      style={style}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
    >
      {children ? (
        children
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          draggable="false"
          loading={loading}
          className={`${styles.image} ${className}`}
          {...imgProps}
        />
      )}
      {/* Transparent overlay - "Save Image As" saves this, not the image */}
      <div className={styles.overlay} aria-hidden="true" />
      {/* Invisible watermark - visible only when contrast is increased */}
      <div className={styles.watermark} aria-hidden="true">
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <span key={i} className={styles.watermarkText}>
              &copy; Anastasiia Kolisnyk
            </span>
          ))}
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { getModelIconPath, getModelIconPathFromDisplayName } from '@/lib/modelIcons';

interface ModelLogoProps {
  modelId?: string;
  displayName?: string;
  size?: number;
  className?: string;
  alt?: string;
}

/**
 * ModelLogo - Reusable component for displaying model logos with consistent dark-mode styling
 * 
 * Ensures all model logos are clearly visible on dark backgrounds with:
 * - Consistent 44px × 44px rounded square container
 * - Subtle white background for contrast
 * - Border for definition
 * - Proper padding to prevent edge touching
 */
export default function ModelLogo({ 
  modelId, 
  displayName, 
  size = 44,
  className = '',
  alt 
}: ModelLogoProps) {
  // Get icon path from either modelId or displayName
  const iconPath = modelId 
    ? getModelIconPath(modelId)
    : displayName 
      ? getModelIconPathFromDisplayName(displayName)
      : '/models/OpenAI.png'; // fallback

  const displayAlt = alt || displayName || 'Model logo';

  return (
    <div 
      className={`rounded-lg flex items-center justify-center overflow-hidden ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        padding: '6px'
      }}
    >
      <Image
        src={iconPath}
        alt={displayAlt}
        width={size - 12} // Account for padding (6px on each side = 12px total)
        height={size - 12}
        className="w-full h-full object-contain"
      />
    </div>
  );
}


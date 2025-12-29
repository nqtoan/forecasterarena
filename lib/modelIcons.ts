/**
 * Model Icon Mapping
 * Maps model IDs to their corresponding icon files in /public/models/
 */

import { ModelId, MODELS } from './constants';

/**
 * Get the icon path for a model by its ID
 * Icons are located in /public/models/ directory
 */
export function getModelIconPath(modelId: ModelId | string): string {
  const iconMap: Record<string, string> = {
    'gpt-5.1': '/models/GPT.png',
    'gemini-2.5-flash': '/models/Gemini-logo.webp',
    'grok-4': '/models/Grok logo.svg',
    'claude-opus-4.5': '/models/claude-opus-4-5.png',
    'deepseek-v3.1': '/models/deepseek.webp',
    'kimi-k2': '/models/KIMI.png',
    'qwen-3-next': '/models/qwen-logo.webp',
  };

  return iconMap[modelId] || '/models/OpenAI.png'; // fallback
}

/**
 * Get model ID from display name
 */
export function getModelIdFromDisplayName(displayName: string): ModelId | string | null {
  const model = MODELS.find(m => m.displayName === displayName);
  return model?.id || null;
}

/**
 * Get icon path from display name
 */
export function getModelIconPathFromDisplayName(displayName: string): string {
  const modelId = getModelIdFromDisplayName(displayName);
  if (modelId) {
    return getModelIconPath(modelId);
  }
  return '/models/OpenAI.png'; // fallback
}

/**
 * Model Icon Component Props
 */
export interface ModelIconProps {
  modelId: ModelId | string;
  size?: number;
  className?: string;
  alt?: string;
}


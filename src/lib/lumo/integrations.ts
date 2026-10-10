/** Native/API adapters are injected by the host. No adapter means unavailable. */
export interface LumoIntegrations {
  authenticate?: (signal: AbortSignal) => Promise<{ verified: boolean }>;
  recoverIdentity?: (email: string, signal: AbortSignal) => Promise<void>;
  chat?: (messages: Array<{ role: 'user' | 'assistant'; content: string }>, signal: AbortSignal) => Promise<string>;
  analyzeImage?: (image: Blob, signal: AbortSignal) => Promise<string>;
}
export function getIntegrations(): LumoIntegrations {
  if (typeof window === 'undefined') return {};
  return (window as Window & { lumoIntegrations?: LumoIntegrations }).lumoIntegrations ?? {};
}

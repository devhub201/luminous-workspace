/** Native/API adapters are injected by the host. No adapter means unavailable. */
export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  artworkUrl?: string;
  durationMs: number;
}
export interface MusicState {
  track: MusicTrack;
  positionMs: number;
  isPlaying: boolean;
  shuffle: boolean;
  repeat: boolean;
  queue: MusicTrack[];
}
export type MusicAction = 'toggle' | 'next' | 'previous' | 'shuffle' | 'repeat' | 'seek' | 'select';
/** Implement with the Spotify Web API / SDK. Every call returns the real player state. */
export interface LumoMusicAdapter {
  play: (query: string, signal: AbortSignal) => Promise<MusicState>;
  control: (action: MusicAction, value?: number | string) => Promise<MusicState>;
  /** Optional push updates from the player; returns an unsubscribe function. */
  subscribe?: (listener: (state: MusicState) => void) => () => void;
}
export interface LumoIntegrations {
  authenticate?: (signal: AbortSignal) => Promise<{ verified: boolean }>;
  recoverIdentity?: (email: string, signal: AbortSignal) => Promise<void>;
  chat?: (messages: Array<{ role: 'user' | 'assistant'; content: string }>, signal: AbortSignal) => Promise<string>;
  analyzeImage?: (image: Blob, signal: AbortSignal) => Promise<string>;
  music?: LumoMusicAdapter;
}
export function getIntegrations(): LumoIntegrations {
  if (typeof window === 'undefined') return {};
  return (window as Window & { lumoIntegrations?: LumoIntegrations }).lumoIntegrations ?? {};
}
/** Recognises "play …" style requests until the AI provider can call a music tool itself. */
export function parseMusicRequest(text: string): string | null {
  const match = text.trim().match(/^(?:hey lumo,?\s*)?(?:please\s+)?(?:play|put on|start playing|listen to)\s+(.+?)[.!?]*$/i);
  return match?.[1]?.trim() || null;
}

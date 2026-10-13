import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Globe, RotateCw, ShieldAlert, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, WorkspaceHeader } from './workspaces';

export function normalizeUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;
  const candidate = /^https?:\/\//i.test(value) ? value : /^[\w-]+(\.[\w-]+)+(:\d+)?(\/.*)?$/.test(value) ? `https://${value}` : null;
  if (!candidate) return null;
  try { const url = new URL(candidate); return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null; } catch { return null; }
}

export function BrowserWorkspace() {
  const [history, setHistory] = useState<string[]>([]);
  const [index, setIndex] = useState(-1);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reload, setReload] = useState(0);
  const [online, setOnline] = useState(true);
  const current = history[index];

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener('online', update); window.addEventListener('offline', update);
    return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update); };
  }, []);
  useEffect(() => { if (current) setInput(current); }, [current]);

  const go = (raw: string) => {
    const url = normalizeUrl(raw);
    if (!url) { setError('Enter a full web address, such as example.com or https://wikipedia.org.'); return; }
    setError(''); setLoading(true);
    const next = [...history.slice(0, index + 1), url];
    setHistory(next); setIndex(next.length - 1);
  };
  const move = (delta: number) => { const i = index + delta; if (i < 0 || i >= history.length) return; setLoading(true); setIndex(i); };

  return (
    <div className="ws-page browser-ws">
      <WorkspaceHeader eyebrow="Workspace" title="Browser" />
      <form className="browser-bar" onSubmit={(e) => { e.preventDefault(); go(input); }}>
        <Button type="button" variant="ghost" size="icon" aria-label="Back" title="Back" disabled={index <= 0} onClick={() => move(-1)}><ArrowLeft /></Button>
        <Button type="button" variant="ghost" size="icon" aria-label="Forward" title="Forward" disabled={index >= history.length - 1} onClick={() => move(1)}><ArrowRight /></Button>
        <Button type="button" variant="ghost" size="icon" aria-label="Reload" title="Reload" disabled={!current} onClick={() => { setLoading(true); setReload((r) => r + 1); }}><RotateCw className={loading ? 'spin-slow' : ''} /></Button>
        <div className="browser-url"><Globe size={14} /><input aria-label="Web address" inputMode="url" placeholder="Enter a web address" value={input} onChange={(e) => setInput(e.target.value)} /></div>
        <Button type="submit" size="sm">Go</Button>
        <Button asChild={!!current} type="button" variant="ghost" size="icon" aria-label="Open in new tab" title="Open in new tab" disabled={!current}>
          {current ? <a href={current} target="_blank" rel="noopener noreferrer"><ExternalLink /></a> : <ExternalLink />}
        </Button>
      </form>
      {error && <p className="field-error ws-inline-error" role="alert">{error}</p>}
      <div className="browser-viewport">
        {!online ? (
          <EmptyState icon={<WifiOff />} title="You're offline">Browser access is unavailable until your connection returns.</EmptyState>
        ) : !current ? (
          <EmptyState icon={<Globe />} title="Where to?">Enter a web address above. Pages load directly from the site — LUMO doesn't read or change them.</EmptyState>
        ) : (
          <>
            {loading && <div className="browser-loading" role="status" aria-label="Loading page"><Skeleton className="h-4 w-1/3" /><Skeleton className="h-3 w-3/4" /><Skeleton className="h-3 w-2/3" /><Skeleton className="h-40 w-full" /></div>}
            <iframe key={`${index}-${reload}`} title="Web content" src={current} sandbox="allow-scripts allow-forms allow-same-origin allow-popups" referrerPolicy="no-referrer" onLoad={() => setLoading(false)} className={loading ? 'is-loading' : ''} />
          </>
        )}
      </div>
      {current && <p className="ws-caption"><ShieldAlert size={12} /> Many sites (Google, GitHub, banks) block being shown inside other apps. If the page stays blank, open it in a new tab.</p>}
    </div>
  );
}

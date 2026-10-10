import { createFileRoute } from '@tanstack/react-router';
import { AuthScreen } from '@/components/lumo/auth';
export const Route = createFileRoute('/auth')({
  
  head: () => ({ meta: [{ title: 'Identity verification — LUMO' }, { name: 'description', content: 'The LUMO identity interface for connected authentication providers.' }, { property: 'og:title', content: 'Identity verification — LUMO' }, { property: 'og:description', content: 'The LUMO identity interface for connected authentication providers.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: AuthScreen,
});

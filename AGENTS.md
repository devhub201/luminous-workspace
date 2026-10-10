<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep LUMO screens in dedicated browser-safe components and expose each screen through a leaf TanStack route; shared chrome lives around the root Outlet so navigation and metadata remain consistent.
- Use the typed host-injected LumoIntegrations boundary for future identity, AI, and vision providers; missing adapters must show unavailable states rather than fabricate results.
- Save only device appearance preferences in local browser storage; conversations and captures remain in memory for this visit to avoid implying cloud persistence.
- Render the signature core with a depth-layered, frame-limited Canvas animation; this avoids a WebGL dependency and keeps Android WebView integration lightweight.

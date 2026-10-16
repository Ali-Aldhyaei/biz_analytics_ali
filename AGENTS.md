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

- Keep Tableau's external embed in its own browser-initialized component on a fixed desktop canvas, scaling its outer frame to prevent Tableau from switching to an excessively tall mobile layout.
- Keep JobBasket's image presentation in its dedicated portfolio component, independent of dashboard embed framing, so its proportions and full-size link remain intact.
- Bundle site images as real files in src/assets (plain Vite imports), not .asset.json CDN pointers — the site is also self-hosted on Cloudflare, where Lovable's /__l5e asset URLs don't exist.

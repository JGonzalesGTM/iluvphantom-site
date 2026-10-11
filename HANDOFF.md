# PHANTOM lifestyle site

Juan requested an immersive, user-friendly site for iluvphantom.com. His clarification: it used to be photography; now it is more of a lifestyle.

Canonical local source: `C:/Users/juan/Documents/Codex/2026-10-10/h/outputs/iluvphantom/dist/`, containing index.html, style.css, and script.js. This source is not in vulcani-n8n-automation and has not been pushed to a remote repository. Claude Code on Juan's local machine should open this exact folder. A cloud checkout must receive the actual files from iluvphantom-site.zip before continuing; transferring the draft into an agreed dedicated repository is valid, not a request to rebuild it. Do not recreate it from this description or put website source into the unrelated automation repo by default. This is a new local draft; no existing PHANTOM source was found in the shared project inventory. No domain, DNS, hosting, or mail changes have been made.

Hosting target: Juan's VPS. Serve the dist contents using the VPS's existing static web server (for example Nginx, Caddy, or Apache). No build step, Node process, database, or Sites hosting is required. Before generating server configuration, inspect the existing VPS hosting layout and determine the correct domain web root, reverse proxy, and TLS setup. Exact server configuration remains pending. Juan has stated the hosting destination; the draft has not been deployed.

Design: charcoal, acid green, oversized typography, original procedural light-field artwork, responsive sections, visual-journal and connection links. Artwork is abstract design, not a representation of Juan's photography. Instagram @iluvphantom was supported by existing local memory, but should be confirmed with Juan before launch. Facebook and other URLs remain pending; do not guess them. No invented merchandise, testimonials, events, or photo portfolio.

Preview: from this folder run `python -m http.server 4173 --bind 127.0.0.1 --directory dist`, then open http://127.0.0.1:4173. No build or installation required. Google Fonts is optional; local sans-serif fallback works if unavailable.

Checks: JavaScript syntax passed with node --check; HTTP response 200; narrow browser viewport inspected; motion toggle visibly changed on to off. Desktop and additional mobile device QA still needed. Reduced-motion preference is implemented, alongside skip link, visible keyboard focus, and semantic navigation.

Before final deployment: confirm lifestyle themes, exact socials, preferred contact channel, and select personal imagery. Review desktop/mobile layout and keyboard navigation. Upload dist contents to the confirmed site's public web root or static host. Inspect existing hosting and take a backup first. Domain is used for Microsoft 365 mail according to existing memory: preserve MX and mail-related DNS. No deployment is authorized by this handoff alone; follow Juan's current instructions when deploying.

Next content pass should replace generic lifestyle wording with Juan's voice and actual interests. The draft deliberately routes contact to Instagram rather than pretending a contact form sends messages.

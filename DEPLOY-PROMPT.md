Deploy the PHANTOM static site to Juan's VPS at iluvphantom.com.

Juan asked for this deploy. Read your own VPS-DEPLOY-GUIDE.md first and follow its rules (section 6 especially). Never paste secrets. Don't use the root password file. Don't restart Traefik or touch other /docker/* folders. Never grep/find from `/`.

SOURCE
- Repo: https://github.com/JGonzalesGTM/iluvphantom-site, branch `main` (commit 1b5c9af or later). Private repo; clone with your existing GitHub access.
- Static site in `dist/` (index.html, style.css, script.js). No build step.
- Ready-made deploy files in `deploy/`: docker-compose.yml (Traefik labels for iluvphantom.com + www redirect), nginx/default.conf (headers + CSP; already tested with no violations), install-static.sh (dated release + atomic `current` symlink, prints previous release), make-bundle.sh (builds iluvphantom-bundle.tar.gz).
- The docker-compose.yml and nginx conf are untested on the real box, so read an existing site (e.g. /docker/baseline) and compare before using them.

STEPS (stop and report if any step surprises you)
1. SSH test: `ssh -o BatchMode=yes root@187.124.241.71 'hostname; docker ps --format "{{.Names}}" | wc -l'`.
2. Conflict check: `ls -d /docker/iluvphantom*` and a scoped `grep -rn 'iluvphantom' /docker --include=*.yml`. If anything already serves this domain, stop and report.
3. Clone the repo locally, run `bash deploy/make-bundle.sh`, scp the tarball to /root/iluvphantom-bundle/, verify the checksum, extract.
4. Create /docker/iluvphantom/{nginx,site}; copy deploy/docker-compose.yml to /docker/iluvphantom/ and deploy/nginx/default.conf to /docker/iluvphantom/nginx/.
5. Run `bash deploy/install-static.sh /docker/iluvphantom/site` from the extracted bundle root. Note the printed release id and previous release.
6. `cd /docker/iluvphantom && docker compose up -d`. Test BEFORE DNS: `curl -sk --resolve iluvphantom.com:443:127.0.0.1 https://iluvphantom.com/` should return the PHANTOM page; also check the `www` redirect (308), a missing path (404), a dotfile (403), and the security headers.
7. DNS (GoDaddy, nameservers ns11/ns12.domaincontrol.com), only after step 6 works:
   - FIRST record the current values of every record for the domain (apex A, www, MX, TXT, CNAMEs).
   - Change ONLY the apex A record to 187.124.241.71 and make www a CNAME to the apex (or confirm it already is). Replace any old website A record rather than adding one.
   - The domain's email is Microsoft 365: DO NOT change or delete any MX, TXT (SPF/verification), autodiscover CNAME, or other mail-related record.
   - Use Juan's signed-in Chrome with the Claude-in-Chrome tools. If asked to sign in or complete a challenge, stop and have Juan do it.
   - Verify with `nslookup -type=A iluvphantom.com ns11.domaincontrol.com` and `nslookup -type=A iluvphantom.com 8.8.8.8`. Close any browser tabs you opened.
8. Certificate: Traefik requests it automatically. If the first order failed because DNS wasn't pointed yet, apply the guide's fix (change router labels, `docker compose up -d --force-recreate` in /docker/iluvphantom only). Confirm the issuer is Let's Encrypt for iluvphantom.com and www.
9. Verify: HTTPS 200 on the apex; http:// and www 308 to https://iluvphantom.com; headers present; a real browser pass with a clean console (the page loads Google Fonts via style.css, which the CSP allows). Click the "Send a DM on Instagram" button and confirm https://ig.me/m/iluvphantom opens. Spot-check 3-4 other sites still return 200. Check `ps -eo pid,etimes,pcpu,comm --sort=-pcpu | head` for stragglers you started.

CONTENT NOTES (do not change the site in this session)
- San Diego was deliberately removed from the copy pending Juan's confirmation.
- The story says PHANTOM "started with photography"; Juan hasn't confirmed that wording. Mention it in your report so he can check.

REPORT BACK
Live URL, release id + previous release, files created, DNS records changed with original values, cert status, verification results, and the rollback commands (repoint `current` to the previous release; `docker compose down` in /docker/iluvphantom; restore DNS to the recorded values).

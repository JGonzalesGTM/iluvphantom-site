#!/usr/bin/env bash
# Usage (on the VPS, from the extracted bundle root): bash deploy/install-static.sh /docker/iluvphantom/site
# Installs ./dist as a dated release and atomically repoints `current`. Never deletes old releases.
set -euo pipefail
TARGET="${1:?usage: install-static.sh <site-dir>}"
SRC="$(cd "$(dirname "$0")/.." && pwd)/dist"
[ -f "$SRC/index.html" ] || { echo "no dist/index.html in bundle" >&2; exit 1; }
mkdir -p "$TARGET/releases"
if [ -e "$TARGET/current" ] && [ ! -L "$TARGET/current" ]; then
  echo "refusing: $TARGET/current exists and is not a symlink" >&2; exit 1
fi
PREV=""; [ -L "$TARGET/current" ] && PREV="$(readlink "$TARGET/current")"
REL="$TARGET/releases/$(date -u +%Y%m%dT%H%M%SZ)-$$"
mkdir "$REL" && cp -r "$SRC"/. "$REL"/ && chmod -R a+rX "$REL"
ln -s "$REL" "$TARGET/.cur" && mv -Tf "$TARGET/.cur" "$TARGET/current"
echo "Release: $REL"
echo "Previous release: ${PREV:-none}"

#!/usr/bin/env bash
# Run from repo root: builds iluvphantom-bundle.tar.gz (tar, not zip: the VPS has no unzip).
set -euo pipefail
cd "$(dirname "$0")/.."
( cd dist && find . -type f ! -name SHA256SUMS -print0 | sort -z | xargs -0 sha256sum > ../SHA256SUMS )
tar -czf iluvphantom-bundle.tar.gz dist deploy SHA256SUMS
sha256sum iluvphantom-bundle.tar.gz

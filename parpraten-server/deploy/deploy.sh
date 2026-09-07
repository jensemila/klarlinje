#!/usr/bin/env bash
# Ruller ut Parpraten. Kjøres fra din Mac, fra rota av prosjektet:
#   ./deploy/deploy.sh
set -euo pipefail

HOST="${PARPRATEN_HOST:-root@167.233.142.138}"
KEY="${PARPRATEN_KEY:-$HOME/.ssh/mediemonitor_hetzner}"
REMOTE=/srv/parpraten
SSH="ssh -i $KEY"

cd "$(dirname "$0")/.."

echo "==> 1/4  Bygger pakken lokalt"
npm install --omit=dev

echo "==> 2/4  rsync til $HOST:$REMOTE"
rsync -az --delete -e "$SSH" \
  server.js package.json public node_modules \
  "$HOST:$REMOTE/"

echo "==> 3/4  nginx"
HAS_TLS=$($SSH "$HOST" 'grep -q ssl_certificate /etc/nginx/sites-available/parpraten.conf 2>/dev/null && echo ja || echo nei')
if [ "$HAS_TLS" = "ja" ]; then
  echo "    nginx-konfig har TLS, rører den ikke (certbot sin blokk bevares)"
else
  rsync -az -e "$SSH" deploy/nginx/parpraten.conf "$HOST:/etc/nginx/sites-available/parpraten.conf"
  $SSH "$HOST" 'ln -sf /etc/nginx/sites-available/parpraten.conf /etc/nginx/sites-enabled/parpraten.conf'
fi
$SSH "$HOST" 'nginx -t && systemctl reload nginx'

echo "==> 4/4  systemd"
rsync -az -e "$SSH" deploy/parpraten.service "$HOST:/etc/systemd/system/parpraten.service"
$SSH "$HOST" 'chown -R parpraten:parpraten /srv/parpraten && systemctl daemon-reload && systemctl restart parpraten && systemctl --no-pager --lines=5 status parpraten'

echo
echo "==> Ferdig. https://parpraten.no"

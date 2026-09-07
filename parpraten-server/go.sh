#!/usr/bin/env bash
# Setter Parpraten online. Kjøres som root PÅ SERVEREN, fra den utpakkede mappa:
#   bash go.sh
set -euo pipefail

DOMAIN=parpraten.no
PORT=3001
APP=/srv/parpraten
ENVD=/etc/parpraten
SRC="$(cd "$(dirname "$0")" && pwd)"
IP=167.233.142.138

[ "$(id -u)" -eq 0 ] || { echo "Kjør som root."; exit 1; }
command -v node >/dev/null || { echo "Node mangler. Installer det først."; exit 1; }
echo "Node: $(node -v)"

echo "==> Bruker og mapper"
useradd --system --no-create-home --shell /usr/sbin/nologin parpraten 2>/dev/null || true
mkdir -p "$APP" "$ENVD" /var/lib/parpraten/sessions
chown -R parpraten:parpraten /var/lib/parpraten
chmod 700 /var/lib/parpraten

echo "==> Kopierer appen til $APP"
rm -rf "$APP"/node_modules
cp -r "$SRC"/server.js "$SRC"/package.json "$SRC"/public "$SRC"/node_modules "$APP"/
chown -R parpraten:parpraten "$APP"

if [ ! -s "$ENVD/env" ]; then
  echo
  echo "==> Lim inn Anthropic API-nøkkelen (vises ikke på skjermen):"
  read -r -s KEY
  [ -n "$KEY" ] || { echo "Tom nøkkel. Avbryter."; exit 1; }
  printf 'ANTHROPIC_API_KEY=%s\n' "$KEY" > "$ENVD/env"
  chmod 600 "$ENVD/env"
  echo "    Lagret i $ENVD/env"
else
  echo "==> $ENVD/env finnes, lar den være."
fi

echo "==> systemd"
cat > /etc/systemd/system/parpraten.service <<EOF
[Unit]
Description=Parpraten
After=network.target

[Service]
Type=simple
User=parpraten
WorkingDirectory=$APP
EnvironmentFile=$ENVD/env
Environment=PORT=$PORT
StateDirectory=parpraten
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=3
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable --now parpraten
sleep 2
systemctl is-active --quiet parpraten && echo "    Tjenesten kjører." || {
  echo "    Tjenesten startet IKKE. Siste logg:"; journalctl -u parpraten -n 25 --no-pager; exit 1; }

echo "==> Lokal test"
curl -sf "http://127.0.0.1:$PORT" >/dev/null && echo "    Svarer på port $PORT." || { echo "    Svarer ikke."; exit 1; }

NGINXCONF=/etc/nginx/sites-available/parpraten.conf
echo "==> nginx"
if [ -f "$NGINXCONF" ] && grep -q "ssl_certificate" "$NGINXCONF"; then
  echo "    Konfigen finnes med TLS fra før. Rører den IKKE."
  echo "    (Å skrive over den ville fjernet HTTPS og sendt parpraten.no til en annen side.)"
  nginx -t && systemctl reload nginx
  HAR_TLS=ja
else
  cat > "$NGINXCONF" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;
    client_max_body_size 2m;

    location / {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Host              \$host;
        proxy_set_header X-Real-IP         \$remote_addr;
        proxy_set_header X-Forwarded-For   \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }
}
EOF
  ln -sf "$NGINXCONF" /etc/nginx/sites-enabled/parpraten.conf
  nginx -t && systemctl reload nginx
  echo "    Ny konfig skrevet og nginx lastet."
  HAR_TLS=nei
fi

if [ "${HAR_TLS:-nei}" = "ja" ]; then
  echo
  echo "==> FERDIG. https://$DOMAIN (TLS var allerede på plass)"
  exit 0
fi

echo "==> Sjekker DNS"
RESOLVED="$(getent hosts $DOMAIN | awk '{print $1}' | head -1 || true)"
if [ "$RESOLVED" = "$IP" ]; then
  echo "    $DOMAIN peker hit. Henter TLS-sertifikat."
  certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --redirect \
      --register-unsafely-without-email 2>/dev/null \
    || certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN"
  echo
  echo "==> FERDIG. https://$DOMAIN"
else
  echo "    $DOMAIN peker på '${RESOLVED:-ingenting}', ikke $IP."
  echo "    Appen kjører, men uten TLS. Sett A-oppføringen, og kjør så:"
  echo "      certbot --nginx -d $DOMAIN -d www.$DOMAIN"
  echo
  echo "==> Appen er oppe på http://$IP (nginx svarer på domenenavnet når DNS er klart)."
fi

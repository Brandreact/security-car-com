# security-car-com

Modernes Website-Relaunch für **Valentin Tusch GmbH** – Spezialist für gepanzerte Fahrzeuge, Kärnten.

## 🌐 URLs

| Umgebung | URL |
|----------|-----|
| **Live (Azure SWA)** | https://agreeable-sand-0876f2003.1.azurestaticapps.net |
| **GitHub Repo** | https://github.com/Brandreact/security-car-com |
| **Original-Website** | https://security-car.com |

---

## 🚀 Deployment

Jeder Push auf `main` löst automatisch ein Deployment via GitHub Actions aus:

```bash
git add .
git commit -m "Änderung beschreiben"
git push origin main
# → Azure SWA wird automatisch aktualisiert (~1 min)
```

CI/CD Pipeline: `.github/workflows/azure-static-web-apps.yml`

---

## 🛠️ Lokale Entwicklung

```bash
# Python HTTP Server starten (Port 3457)
cd projects/security-car-modern
python3 -m http.server 3457

# Im Browser öffnen
open http://127.0.0.1:3457
```

---

## 📁 Projektstruktur

```
security-car-modern/
├── index.html                  # Startseite
├── unternehmen.html            # Über uns
├── impressum.html
├── datenschutz.html
├── site.js                     # Shared Nav + Footer (alle Seiten)
├── staticwebapp.config.json    # Azure SWA Routing-Konfiguration
│
├── security-car/               # 17 Fahrzeug-Detailseiten
│   ├── mercedes-benz-g-modell.html
│   ├── mercedes-v-klasse.html
│   └── ...
│
├── fahrzeugtechnik/            # Kategorie: Fahrzeugtechnik
│   ├── index.html
│   ├── kettenfahrzeuge-panzer.html
│   ├── schwere-nutzfahrzeuge.html
│   └── sonderumbauten-formenbau.html
│
├── flugzeugtechnik/
│   └── index.html
│
├── personenausruestung/
│   └── index.html
│
├── images/                     # Alle Bilder
│   ├── vehicles/               # Fahrzeugfotos
│   ├── flugzeugtechnik/
│   ├── personenausruestung/
│   └── schwere-nutzfahrzeuge/
│
└── .github/workflows/
    └── azure-static-web-apps.yml
```

---

## ✏️ Seiten anpassen

Alle Seiten nutzen `site.js` für Navigation und Footer. Änderungen an Nav/Footer nur einmal in `site.js` nötig.

```bash
# Alle Unterseiten neu generieren (nach Änderung an generate.js)
node generate.js
```

> `generate.js` ist in `.gitignore` – nicht im Repo enthalten, liegt lokal im Projektordner.

---

## ☁️ Azure

```bash
# SWA Status prüfen
az staticwebapp show \
  --name "security-car-com" \
  --resource-group "vibe-coding-websites-rg" \
  --query "{url: defaultHostname, state: repositoryUrl}" -o table

# Manuell deployen (ohne Git Push)
DEPLOY_TOKEN=$(az staticwebapp secrets list \
  --name "security-car-com" \
  --resource-group "vibe-coding-websites-rg" \
  --query "properties.apiKey" -o tsv)

swa deploy . --deployment-token "$DEPLOY_TOKEN" --env production
```

---

## 🎨 Design System

| Variable | Wert |
|----------|------|
| Hintergrund | `#0a0a0a` |
| Card-BG | `#111111` |
| Border | `#1e1e1e` |
| Gold (Akzent) | `#F9C349` |
| Gold Dark | `#D4A017` |
| Text Muted | `#F0EFEC` |
| Font | Karla (Google Fonts) |

---

## 📸 Screenshots für Kundenpräsentation

Screenshots liegen in `customer_screens/` (nicht im Repo).

```bash
# Neuen Screenshot erstellen (Python Server muss laufen)
npx playwright screenshot "http://127.0.0.1:3457/?screenshot=1" \
  --viewport-size=1200,700 \
  --output="customer_screens/desktop.png"
```

Der URL-Parameter `?screenshot=1` deaktiviert Animationen für saubere Screenshots.

# 🐍 Snake Static Site – AWS CDK Deployment Guide

Willkommen zum Deployment der statischen Snake-Website mit AWS CDK v2.  
Dieses Setup deployt eine vollständige S3 + CloudFront + Route53 + ACM Infrastruktur für deine statische Website unter `https://snake.emirhan-igci.me`.

---

## 🧰 Voraussetzungen

### 1. Node.js installieren (≥ v18 empfohlen)

Installiere [Node.js](https://nodejs.org/) (Empfohlen: LTS-Version `20.x`)

```bash
node -v
npm -v
```

### 2. AWS CLI installieren

Download & Installation: [AWS CLI Docs](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

```bash
aws --version
```

---

## 🔐 AWS SSO Zugriff einrichten

> Du benötigst Zugriff über **AWS IAM Identity Center (SSO)**  
> Ein Benutzerkonto wird dir von einem Admin zugewiesen.

### 1. AWS CLI konfigurieren

Füge in deiner Datei `~/.aws/config` (oder `%USERPROFILE%\.aws\config` auf Windows) folgendes hinzu:

```ini
[profile emirhan]
sso_start_url = https://d-XXXXXXXXXX.awsapps.com/start
sso_region = eu-central-1
sso_account_id = 123456789012
sso_role_name = CDK-Deploy
region = eu-central-1
output = json
```

Ersetze:
- `d-XXXXXXXXXX` mit deiner SSO-Start-URL
- `123456789012` mit der Account-ID
- `CDK-Deploy` mit dem dir zugewiesenen Permission-Set

> ✅ Der `default`-Eintrag ist optional – du kannst immer mit `--profile emirhan` arbeiten.

### 2. Anmelden via AWS SSO

```bash
aws sso login --profile emirhan
```

Ein Browserfenster öffnet sich → melde dich mit deinem Unternehmens-Account an.

Zum überprüfen kann folgendes ausgeführt werden

```bash
aws sts get-caller-identity --profile emirhan
```

---

## 💻 Projekt vorbereiten

### 1. Repository klonen

```bash
git clone https://github.com/dein-org/snake-static-site.git
cd snake-static-site
```

### 2. Abhängigkeiten installieren

```bash
npm install
```

### 3. Projekt kompilieren (TypeScript → JS)

```bash
npm run build
```

---

## 🚀 Deployment mit CDK

### 1. Bootstrap (einmalig pro Region & Account)

```bash
npx cdk bootstrap --profile emirhan
```

### 2. Deploy ausführen

```bash
npx cdk deploy --profile emirhan
```

Am Ende wird dir die Auslieferungs-URL angezeigt, z. B.:

```txt
Outputs:
SnakeSiteStack.SiteURL = https://snake.emirhan-igci.me
```

---

## 📂 Statisches Frontend anpassen

Alle statischen Dateien (HTML, CSS, JS) liegen unter:

```
website/
├─ index.html
├─ style.css
└─ script.js
```

> Änderungen im Ordner `website/` werden automatisch bei jedem Deploy hochgeladen & in CloudFront invalidiert.

---

## 🧼 Aufräumen (optional)

```bash
npx cdk destroy --profile emirhan
```

---

## ❓ FAQ

**💡 Ich bekomme `No access / Forbidden` beim Login?**  
→ Stelle sicher, dass dir ein gültiger SSO-Benutzer + Permission-Set zugewiesen wurde.

**💡 Mein `aws sso login` öffnet kein Browserfenster?**  
→ Verwende `--no-browser` oder setze `AWS_PROFILE=emirhan` und versuche erneut.

**💡 Ich möchte meine eigene Subdomain deployen**  
→ Passe `domainName`, `subdomain`, `siteSourcePath` im `bin/snake_site.ts` an.

---

## 🛡️ Sicherheitshinweis

- Es werden **keine permanenten AWS-Zugangsschlüssel** verwendet (nur temporäre Token via SSO).
- Das Zertifikat wird automatisch via DNS validiert.
- Der S3-Bucket ist **nicht öffentlich** – Zugriff nur über CloudFront.

---

📣 Bei Fragen: melde dich bei `@emirhan` oder einem Mitglied des DevOps-Teams.

# 💰 Kostenprognose – Snake Static Site (CDK Deployment)

Diese Übersicht zeigt die monatlich zu erwartenden AWS-Kosten für dein statisches Hosting-Projekt mit CDK.

---

## 📦 Enthaltene Ressourcen

- ✅ S3-Bucket (privat)
- ✅ CloudFront Distribution
- ✅ Route 53 Zone + A-Record
- ✅ ACM-Zertifikat (TLS, us-east-1)
- ✅ IAM Identity Center (SSO Zugriff)

---

## 💰 Fixe Kosten (pro Monat)

| Ressource               | Einheit                | Kosten       | Kommentar                              |
|------------------------|------------------------|--------------|----------------------------------------|
| **S3-Bucket**          | 0 GB, keine Requests    | 0.00 USD     | Keine Fixkosten                        |
| **CloudFront aktiv**   | ohne Traffic            | 0.00 USD     | Nur nutzungsbasiert                    |
| **Route 53 Zone**      | 1 Domain (z. B. emirhan-igci.me) | 0.50 USD     | Pro gehosteter Zone                    |
| **ACM Zertifikat**     | DNS-validiert in us-east-1 | 0.00 USD     | Kostenlos über AWS ACM                 |
| **IAM Identity Center**| < 50 Benutzer           | 0.00 USD     | Kostenlos                              |

👉 **Fixkosten gesamt: ~ 0.50 USD / Monat**

---

## 💸 Variable Kosten (nutzungsabhängig)

### 📤 CloudFront

| Einheit                | Preis (eu-central-1)    |
|------------------------|-------------------------|
| Daten Outbound         | ~0.085 USD / GB         |
| HTTPS-Requests         | ~0.0075 USD / 10.000    |

**Beispiel:**
- 10 GB Traffic/Monat = ~ 0.85 USD
- 100 GB Traffic/Monat = ~ 8.50 USD

---

### 📂 S3

| Aktion             | Preis                     |
|--------------------|---------------------------|
| Speicher           | ~0.0245 USD / GB / Monat  |
| GET-Requests       | ~0.0004 USD / 1.000       |
| PUT-Requests       | ~0.005 USD / 1.000        |

> Deploy verursacht ein paar PUTs → kaum messbar.

---

## 🔐 Optional (Backend-Erweiterung)

| Dienst         | Preis                             |
|----------------|------------------------------------|
| Lambda         | 1 Mio Aufrufe frei (dann ~0.20 USD) |
| API Gateway    | 1 Mio Aufrufe frei (dann ~1.00 USD) |
| DynamoDB       | je nach Kapazität                 |

---

## 🧮 Beispiel-Gesamtkosten

| Nutzungsszenario                  | Monatliche Kosten |
|----------------------------------|-------------------|
| 🔹 Testbetrieb (kein Traffic)     | ~ 0.50 USD        |
| 🔸 10 GB CDN-Traffic              | ~ 1.50 USD        |
| 🔶 100 GB CDN-Traffic             | ~ 9.00–10.00 USD  |
| 🔺 API-/Lambda-Last + Traffic     | ~ 15 USD+         |

---

## ✅ Fazit

- Fixkosten = **minimal (0.50 USD)** durch Route 53
- Alle anderen Kosten entstehen **nur bei aktiver Nutzung**
- Ideal für günstiges, produktionsfähiges Hosting


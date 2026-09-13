
# 🛡️ UPI Shield

### AI-Powered UPI Fraud Detection & Scam Prevention Platform

UPI Shield is a cybersecurity-focused web application designed to help users identify potential UPI fraud, suspicious payment requests, fake merchant identities, scam messages, and malicious QR-based payment attempts before making a transaction.

The platform combines **AI-based analysis, threat intelligence, pattern detection, and security awareness** to provide users with understandable risk assessments and recommendations.

---

## 🎯 Project Objective

The objective of UPI Shield is to improve digital payment security by helping users recognize common UPI scams and identify suspicious payment-related information before making a transaction.

---

## 🚀 Key Features

### 🔍 UPI ID Analyzer
- Validates UPI ID formats
- Identifies suspicious naming patterns
- Detects potential impersonation and typo-squatting
- Provides a risk classification and confidence score

### 📱 QR Code Security Scanner
- Upload and analyze QR codes
- Extract UPI payment information
- Analyze merchant information and payment details
- Identify potentially suspicious payment requests

### 🤖 AI Scam Analyzer
Analyze suspicious:
- SMS messages
- WhatsApp messages
- Payment requests
- Email messages
- Payment links

Detect common scam patterns such as:
- KYC scams
- Refund scams
- Fake rewards
- Lottery scams
- Job scams
- Urgency-based social engineering
- UPI collect-request scams

### 🏪 Fake Merchant Detection
Identifies potential:
- Brand impersonation
- Typo-squatting
- Lookalike merchant names
- Social engineering patterns

### ⚠️ Risk Assessment
Provides a security classification:

- 🟢 Safe
- 🔵 Low Risk
- 🟡 Medium Risk
- 🟠 High Risk
- 🔴 Critical

### 📊 Security Dashboard
Displays:
- UPI IDs analyzed
- Potential fraudulent IDs
- Scam reports
- Active threats
- Recent threat trends

### 📝 Scam Reporting
Users can report:
- Fraudulent UPI IDs
- Fake merchants
- Suspicious QR codes
- Fraudulent payment requests

### 🌐 Community Threat Database
Provides a searchable collection of reported threats, including:
- UPI IDs
- Merchant names
- Scam indicators
- Number of reports
- Risk levels

### 📚 Security Education Center
Provides awareness resources covering:
- UPI fraud
- QR code scams
- KYC scams
- Refund scams
- Screen-sharing scams
- Fake customer-care scams

### 🔐 Admin Panel
Provides functionality for:
- Scam report moderation
- Threat database management
- Analytics
- Content management

---

## 🧠 AI & Security Analysis

UPI Shield uses AI-assisted analysis to identify suspicious patterns in payment-related information.

The analysis considers indicators such as:

- Suspicious keywords
- Urgency tactics
- Impersonation patterns
- Typo-squatting
- Scam-related language
- Merchant naming patterns
- Reported threat information

The system provides human-readable explanations instead of presenting only a numerical score.

---

## 🛠️ Technology Stack

### Frontend
- React
- TypeScript
- Next.js
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL


### Security
- HTTPS
- Input validation
- Rate limiting
- CAPTCHA
- OWASP security practices

---

## 🏗️ Application Architecture

```text
                 UPI Shield
                     │
          ┌──────────┴──────────┐
          │                     │
       Frontend              Backend
   React / Next.js          Node / Express
          │                     │
          └──────────┬──────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
      AI Analysis          PostgreSQL
      Gemini API            Database
          │
          ↓
    Risk Assessment
          │
          ↓
   Security Recommendation

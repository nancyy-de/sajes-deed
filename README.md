# Sales Deed PDF Generator

This Node.js application generates a downloadable PDF sale deed based on user input.

## ✨ Features

- HTML form with 5 fields:
  - Full Name
  - Father’s Name
  - Property Size
  - Sale Amount
  - Date
- Handlebars template engine to fill the sale deed
- PDF generation using Puppeteer
- Download the generated PDF directly in browser

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

```bash
npm install
```

### Run the App

```bash
npm start
```

Then visit: [http://localhost:3000](http://localhost:3000)

## 📝 Project Structure

```
.
├── index.js               # Express server
├── deed-template.html     # Handlebars PDF template
├── public/
│   └── form.html          # Form UI
└── package.json           # Node dependencies
```

## 📦 Dependencies

- express
- body-parser
- handlebars
- puppeteer

---

> Built for document automation with 💼📄

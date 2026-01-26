# 💰 Finance Tracker v1.0

A simple, elegant, and functional finance manager designed to track incomes and expenses with full multi-language support.

## 🚀 Features

- **Total Control:** Add incomes and expenses with descriptions and values.
- **Real-Time Calculation:** Automatically updated balance with dynamic visual feedback (color coding for positive and negative balances).
- **Internationalization (i18n):** Full support for **English (USA)** and **Portuguese (Brazil)**, including:
  - Translation of text, labels, and placeholders.
  - Dynamic currency symbol switching (`US$` and `R$`).
  - Translated accessibility attributes (`aria-labels` and `titles`).
- **Data Persistence:** Transactions and language preferences are saved in the browser's `LocalStorage`, ensuring no data is lost when refreshing the page.
- **Responsive Design:** Clean interface that adapts to different screen sizes.

## ♿ Accessibility (A11y)

In this project, special attention was given to web accessibility standards to ensure a better experience for all users:

- **Semantic HTML:** Used proper tags to help assistive technologies understand the page structure.
- **Dynamic Language Support:** The `lang` attribute of the `<html>` tag updates automatically (e.g., `pt-BR` or `en`) so screen readers use the correct pronunciation and accent.
- **ARIA Labels:** Interactive elements like the delete button use `aria-label` and `title` attributes, ensuring that users with visual impairments understand the action even when only an icon is displayed.
- **Visual Feedback:** High-contrast colors and focus indicators were considered for better readability and navigation.
- **Live Regions:** The balance display uses `aria-live="polite"` to notify screen reader users of real-time financial updates.


## 🛠️ Tech Stack

This project was built "Vanilla Style" (no frameworks), focusing on direct DOM manipulation and pure programming logic:

- **HTML5:** Semantic structure and `data-*` attributes for translation logic.
- **CSS3:** Flexbox for layout, custom variables, and transition effects.
- **JavaScript (ES6+):** 
  - Array manipulation (`filter`, `forEach`, `push`).
  - Persistence via `Web Storage API`.
  - DOM manipulation and Event Listeners.
  - Internationalization logic and global attribute management (`html lang`).


## 🔗 Live Demo

You can test the application live here:  
👉 **[Launch Finance Tracker](https://seu-usuario.github.io)**

## 📦 How to Run Locally

If you want to run this project on your machine:
1. Download or clone this repository.
2. Open `index.html` in your browser.

---
Developed by **Raphael Almeida** as part of a learning challenge in programming logic and Web Development in 2026. 🚀

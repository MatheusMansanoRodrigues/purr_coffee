# Purr'Coffee

A web interface for a fictional coffee shop featuring a cozy visual identity, a complete ordering flow, and PIX support integration. The project was developed as a **pure front-end application**, with no build tools or backend dependencies, prioritizing deployment simplicity and a consistent visual experience.

---

## Overview

**Purr'Coffee** simulates the experience of a coffee shop application: users can browse the menu, build their cart, choose a delivery method, and place orders. Data is persisted locally through `localStorage`, allowing the entire workflow to function without a server.

In addition to the ordering system, the project includes authentication screens (login and registration), a home dashboard, order history, partners, settings pages, and a **Buy Me a Coffee** modal featuring PIX QR Code generation and copy-and-paste payment support.

---

## Features

| Module                         | Description                                                                             |
| ------------------------------ | --------------------------------------------------------------------------------------- |
| **Menu** (`index.html`)        | Menu browsing with categories, search, size selection, quantity controls, and side cart |
| **Home** (`home.html`)         | Dashboard with shortcuts, featured items, and promotional coupon                        |
| **Orders** (`orders.html`)     | Active cart, ongoing orders, order history, and statistics                              |
| **History** (`history.html`)   | Previous order records                                                                  |
| **Partners** (`partners.html`) | Brand partner showcase                                                                  |
| **Settings** (`settings.html`) | User preferences and settings                                                           |
| **Login / Register**           | Authentication flow with client-side validation                                         |
| **PIX Support**                | Donation modal with suggested amounts, QR Code, and copy-and-paste PIX payload          |

### Cart and Ordering Details

* Products organized into **Coffee**, **Non Coffee**, **Food**, **Snack**, and **Dessert**
* Dynamic pricing based on size selection (Small / Large)
* Delivery methods: Delivery, Dine-In, and Takeaway
* Automatic delivery fee calculation when Delivery is selected
* Quantity badge synchronized across pages
* Toast notifications for user feedback

### PIX Integration

The `js/pix-support.js` module implements PIX payload generation following the official **EMVCo (BR Code)** specification, including:

* TLV (Tag-Length-Value) field construction
* **CRC16-CCITT** checksum calculation
* Character normalization and compliance with Brazilian Central Bank requirements
* QR Code rendering and clipboard copy functionality

---

## Technology Stack

| Layer       | Technology                                                   |
| ----------- | ------------------------------------------------------------ |
| Markup      | Semantic HTML5                                               |
| Styling     | CSS3 with custom properties and responsive layouts           |
| Logic       | Vanilla JavaScript (ES6+)                                    |
| Icons       | [Phosphor Icons](https://phosphoricons.com/)                 |
| Typography  | Google Fonts — Nunito and Inter                              |
| Images      | Unsplash (product images) + local assets (`imgs/`)           |
| Persistence | `localStorage`                                               |
| QR Code     | [QRCode.js](https://github.com/davidshimjs/qrcodejs) via CDN |

No bundler, framework, or database is required. The project can be served by any static web server or opened directly in a browser.

---

## Project Structure

```text
teste/
├── index.html          # Main menu and cart
├── home.html           # Dashboard
├── orders.html         # Orders and detailed history
├── history.html        # Purchase history
├── partners.html       # Partners page
├── settings.html       # Settings page
├── login.html          # Login screen
├── register.html       # Registration screen
├── script.js           # Menu, cart, and ordering logic
├── js/
│   └── pix-support.js  # PIX modal and payload generation
├── css/
│   ├── style.css       # Global styles and layout
│   ├── shared.css      # Shared components
│   ├── pix-modal.css   # PIX modal styling
│   └── *.css           # Page-specific styles
└── imgs/               # Logo, mascot, and decorative assets
```

---

## Running the Project

1. Clone or download the repository.
2. Open any `.html` file in your browser **or** serve the project through a local server:

```bash
# Python example
python -m http.server 8080

# Node example
npx serve .
```

3. Access `http://localhost:8080/login.html` or `index.html`.

> **Recommendation:** Use a local web server instead of opening files through `file://`, especially when relying on external resources such as icon libraries and QR Code dependencies.

---

## PIX Configuration

Before publishing, edit `js/pix-support.js`:

```javascript
const PIX_CONFIG = {
  key: "your-key@email.com",
  recipientName: "PURR COFFEE",
  city: "SAO PAULO",
  description: "Support Purr Coffee",
};
```

Suggested contribution amounts can be adjusted in `PIX_AMOUNTS`.

---

## Challenges and Lessons Learned

During development, several aspects required investigation and iteration. Below are the most relevant ones.

### 1. PIX QR Code Generation — CDN Availability Issue

The initial implementation attempted to load the `qrcode` package via jsDelivr:

```text
https://cdn.jsdelivr.net/npm/qrcode@1.5.4/build/qrcode.min.js
```

This file returns **404**, as recent npm releases no longer include a browser bundle at that path. The issue was misleading because the interface displayed *"Error generating QR Code. Check your connection"* even though the real problem was the missing dependency.

**Solution:** Migrated to **QRCode.js** (davidshimjs) hosted on cdnjs and adapted the implementation from `QRCode.toCanvas()` to `new QRCode(element, options)`.

**Lesson learned:** Generic error messages make troubleshooting difficult. Validating CDN URLs and testing external dependencies should be part of the QA process.

---

### 2. PIX Payload Implementation (EMVCo)

Generating a valid PIX QR Code involves much more than encoding an arbitrary string. The payload follows the Brazilian Central Bank's **BR Code** standard, including:

* Numeric tag-based fields (e.g., `26` for merchant account information)
* Length-prefixed values using the TLV format
* Character normalization and strict size limits
* **CRC16** checksum calculation

Implementing this manually in JavaScript requires careful attention to detail—an extra character or an incorrect CRC value can invalidate the payment code in banking applications.

**Lesson learned:** Financial integrations require strict compliance with specifications. Testing with real banking apps (Nubank, Inter, etc.) is essential before considering the feature production-ready.

---

### 3. Multi-Page Architecture Without a Framework

The project uses multiple independent HTML pages instead of a SPA architecture. While simple, this approach introduces some challenges:

* Sidebar and navigation duplicated across pages
* Cart-related logic shared between `script.js` and `orders.html`
* State synchronization relying entirely on `localStorage`

Any navigation or data structure change requires updates in multiple files.

**Lesson learned:** For larger projects, extracting shared components (Web Components, partial templates, or a framework migration) would be beneficial. For a static prototype, the current approach remains practical but requires maintenance discipline.

---

### 4. Visual Consistency

Maintaining a consistent visual language across the application was an important design goal. The interface relies on a unified icon system based on **Phosphor Icons**, ensuring consistent rendering, alignment, and styling throughout the user experience.

**Lesson learned:** Establishing a single visual system early in the project helps maintain consistency, reduces design debt, and simplifies future UI updates.

---

### 5. External Resource Dependencies

Fonts (Google Fonts), icons (unpkg), images (Unsplash), and QR Code generation (cdnjs) all depend on internet connectivity. In offline, corporate, or restricted-network environments, parts of the interface may fail silently.

**Potential improvement:** Vendor critical libraries locally and provide fallbacks for images and icon assets.

---

## Known Limitations

* Authentication is simulated; no real credential validation or JWT implementation
* Data is stored only in the local browser (no cross-device synchronization)
* Advanced product filtering is not yet implemented
* Password recovery and social login are placeholders
* PIX key is exposed on the client side (acceptable for donations, unsuitable for commercial checkout)

---

## Support the Developer

If you find this project useful or enjoyed exploring it, you can support its development through the built-in PIX contribution feature available in the application.

The support modal generates a PIX QR Code and a copy-and-paste payment code following the official BR Code (EMVCo) specification.

Contributions are entirely optional and help support future improvements and new projects.

---

## Suggested Future Improvements

* [ ] Vendor QRCode.js and Phosphor Icons for offline support
* [ ] Extract shared navigation and common scripts to reduce duplication
* [ ] Integrate a backend for authentication and order persistence
* [ ] Add automated tests for `buildPixPayload()` and CRC16 calculations
* [ ] Implement internationalization (i18n), as the interface currently mixes English and Portuguese

---

## License

Educational and demonstration project. Third-party assets (Unsplash, Google Fonts, Phosphor Icons, and other external resources) remain subject to their respective licenses.

---

Developed by the Purr'Coffee team.

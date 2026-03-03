# UI Automation — Playwright (JavaScript)

This repository is a **sample UI automation framework** built with Playwright and
JavaScript for **VRQA Labs**, a freelance automation consultancy. It
showcases how we structure tests, utilities and configuration, and demonstrates
one realistic end-to-end scenario on practice app.

> 🎯 If you're a potential client, think of this as a proof‑of‑concept. We can
> extend the same architecture to dozens of tests, multiple applications, and
> integrate with CI/CD for a complete automated delivery pipeline.

---

## 1. Prerequisites

Before running anything, make sure you have the following installed on your
machine:

- [Node.js 18+](https://nodejs.org/) (with `npm` or `yarn` available)
- Git (for cloning the repository)
- Optional: a modern browser if you want to run headed tests (Chrome/Firefox).

The project uses only dev‑dependencies, so nothing is required server‑side.

## 2. Local setup

```bash
# clone the repo
git clone https://github.com/vrqalabs/ui-automation-playwright.git vrqalabs-playwrightui-automation-playwright
cd vrqalabs-playwrightui-automation-playwright

# install dependencies
npm install

# install Playwright browsers (required for first run)
npx playwright install

# run the example test in headless mode
npm test

# or run headed for debugging
npm run test:headed
```

Environment variables and CLI flags control which environment and browser are
used. See below for details.

## 3. Project structure

```
.
├── config/               # environment definitions and helpers
│   ├── environments.js   # urls, test data, app binaries per env
│   └── envConfig.js      # helper to pick env/browser and build paths
├── pages/                # page object classes
│   ├── HomePage.js
│   └── CartPage.js
├── reports/              # HTML reports, videos, traces
├── tests/
│   ├── e2e/              # end-to-end test specs
│   │   └── testone.spec.js
│   └── fixtures/         # JSON test data files (stage/dev)
├── playwright.config.js  # Playwright global configuration
├── package.json
└── README.md
```

The framework follows the **page object model**, making the tests readable and
maintainable. New pages or components are added under `pages/` and used in
specs via simple imports.

## 4. Application & test information

The example application under test is the sample e-commerce application. It exposes a
simple shopping flow where users can search for items, add quantities to the
cart, and view/remove items.

The repository currently contains one automated test (`testone.spec.js`) which:

1. Searches for **Cucumber** and adds three units to the cart.
2. Searches for **Tomato** and adds two units.
3. Verifies the cart preview shows correct quantities and total price.
4. Removes both items and checks that the cart is empty (including the
   "You cart is empty!" message).

Although only one test is present, the framework is easily extended; VRQA Labs
can quickly build dozens of such scenarios, integrate data‑driven testing, and
apply advanced Playwright features (videos/traces, parallelism, CI/CD).

## 5. Why VRQA Labs?

This sample repo reflects how VRQA Labs approaches automation projects:

- **Modular structure** separating configuration, page objects, tests and data.
- **Environment flexibility** – run against different URLs/browsers via flags.
- **Scalable design** – add new tests or apps with minimal friction.
- **Professional reports** – HTML reports, videos, and traces for every run.

If your team needs a robust Playwright framework (or migration from Selenium
or Cypress), VRQA Labs offers full-service implementation, training and
maintenance. Contact us at [connect.vrqalabs@outlook.com]  to discuss your automation needs.
# HI-5 கருப்பு கடை – Boutique Website

React + Vite + Tailwind CSS storefront for HI-5 Karuppu Kadai, Gandhi Street, RS Mangalam.
Customers browse dresses/footwear and order directly through WhatsApp.

## Run in VS Code

1. Install [Node.js 18+](https://nodejs.org) and [VS Code](https://code.visualstudio.com).
2. Unzip this folder, then in VS Code: **File → Open Folder → hi5-karuppu-kadai**.
3. Open the terminal (**Ctrl + `**) and run:

```bash
npm install
npm run dev
```

4. Open http://localhost:5173

## Build for hosting

```bash
npm run build     # creates /dist
npm run preview   # test the production build
```
Upload the `dist` folder to Netlify, Vercel, or any static host.

## Deploy to Render

The `render.yaml` Blueprint configures this project as a Render static site.
Connect the GitHub repository to Render and create a new Blueprint instance.
Render will build the app and publish the generated `dist` directory.

## Project structure

```
hi5-karuppu-kadai/
├── .vscode/              # recommended extensions + editor settings
├── public/               # put your own images here (e.g. public/images/saree1.jpg)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # top menu + mobile menu
│   │   ├── ProductCard.jsx   # product tile
│   │   ├── ProductModal.jsx  # size picker + WhatsApp order popup
│   │   └── Footer.jsx
│   ├── data/
│   │   ├── products.js       # <-- EDIT: add/change dresses & footwear
│   │   └── shop.js           # <-- EDIT: phone numbers, address, map, menu
│   ├── utils/
│   │   └── whatsapp.js       # builds the WhatsApp order message link
│   ├── App.jsx           # page layout & navigation logic
│   ├── main.jsx          # entry point
│   └── index.css         # Tailwind imports
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Common edits

- **Add a product:** copy an entry in `src/data/products.js`, change id/name/image.
- **Use your own photos:** save in `public/images/` and set `image: '/images/saree1.jpg'`.
- **Change phone/address:** `src/data/shop.js`.

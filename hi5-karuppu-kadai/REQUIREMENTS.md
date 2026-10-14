# HI-5 கருப்பு கடை — Project Requirements

## 1. Project overview

Build and maintain a responsive storefront website for HI-5 கருப்பு கடை, a family boutique in RS Mangalam, Ramanathapuram. The site presents boutique products and lets customers contact the store or begin an order through WhatsApp.

## 2. Functional requirements

### 2.1 Storefront and navigation

- Display the HI-5 கருப்பு கடை brand, boutique location, and promotional hero content.
- Provide navigation to the home page, product categories, location, and direct WhatsApp ordering.
- Keep navigation usable on both desktop and mobile, including a collapsible mobile menu.
- Include links to the boutique's Instagram profiles and phone contact options.

### 2.2 Product catalog

- Organize products into these categories: Sarees, Ladies Dress, Kids Dress, Group Dress, Trending Models, Footwears, and Kids Footwear.
- Show featured collections and new arrivals on the home page.
- Provide category and product search/filter views.
- Show product images, names, category, description, available colors/sizes when provided, and availability/price inquiry guidance.
- Provide product detail views and a WhatsApp inquiry action for individual products and categories.
- Keep product data and image paths maintainable in the product data source; product images are served from `public/images`.

### 2.3 Contact and ordering

- Provide a contact form with required Customer Name, Mobile Number, Category, and Inquiry Details fields.
- Validate required fields before submitting.
- Include the entered contact and inquiry details in the WhatsApp message sent to the boutique's primary WhatsApp number.
- Offer a direct WhatsApp send action from the completed contact form.
- Offer direct ordering via both store WhatsApp numbers.
- Show a submission confirmation after a form submission.

### 2.4 Store information

- Display the store address, opening hours, contact phone numbers, and Instagram profiles.
- Embed the store location map and provide a directions link.
- Keep store details in a shared configuration source so the displayed contact information and links stay consistent.

## 3. User interface and accessibility

- Support phone, tablet, and desktop viewport sizes without horizontal overflow.
- Use the existing dark storefront styling with red and amber accents.
- Make controls usable by touch and keyboard, with visible focus states and accessible names for icon-only controls.
- Respect the user's reduced-motion preference.
- Provide descriptive alternative text for meaningful images; decorative images should not create redundant announcements.

## 4. Technical requirements

- Front end: React 18 with JSX.
- Build and development server: Vite 5.
- Styling: Tailwind CSS 3 with project-specific CSS in `src/index.css`.
- Icons: `lucide-react`.
- Use npm and the existing `package.json` / `package-lock.json` to install and lock JavaScript dependencies. This project does not use Python `requirements.txt`.
- The application must build successfully with `npm run build`.
- Development command: `npm run dev`.
- Production preview command: `npm run preview`.

## 5. External services and assets

- WhatsApp links use `wa.me` and launch the customer's WhatsApp client or web experience.
- Store location and directions rely on Google Maps.
- Google Fonts are loaded for the selected English and Tamil typefaces.
- Product photography, logo, and promotional media are local files under `public/images`.

## 6. Out of scope

- Online payment processing, customer accounts, order persistence, and inventory management are not currently specified or implemented.
- The contact form hands the inquiry off to WhatsApp; it does not submit to a server-side database or email service.

# Energy Fitness Equipment Catalog Chat Agent

## Deployment & Implementation Guide

### Overview
The **EnergyFit Chat Agent** is an interactive AI-powered chatbot designed to assist Energy Fitness customers in exploring their equipment catalog, finding products, comparing specifications, and accessing direct links to the Energy Fitness website.

---

## Features

### 1. **Product Information Lookup**
- Search equipment by name, type, or brand
- Display complete specifications and features
- Show dimensions, weight capacity, and technical details
- Provide direct links to Energy Fitness catalog

### 2. **Equipment Comparison**
- Compare 2-3 products side-by-side
- Display specifications in comparison table format
- Highlight key differences and advantages
- Provide price range comparisons
- Generate comprehensive comparison reports

### 3. **Category & Brand Navigation**
- Browse by brand: HOIST, FreeMotion, Tunturi, Concept2, Energie Fitness
- Filter by equipment type: Strength, Cardio, Accessories, Commercial, Domestic
- View all products within selected category

### 4. **Smart Recommendations**
- Equipment recommendations based on use case
- Gym setup guidance (home vs commercial)
- Budget-based suggestions
- Fitness goal alignment

### 5. **Interactive Chat Interface**
- Conversational query handling
- Context-aware responses
- Quick action buttons for common queries
- Message history for reference

---

## Equipment Catalog Database

### Brands Included

#### **HOIST Fitness** (USA)
- ROC-IT® Selectorized Machines
- ROC-IT® Plate Loaded Equipment
- Mi5, Mi6, Mi7 Functional Trainers
- Multi-Stack Stations
- Smith Machines
- Home & Commercial Gyms

#### **FreeMotion Cardio** (USA)
- Treadmills: t22.9, t10.9, t8.9 Series
- Exercise Bikes: Coach, Upright, Recumbent
- Ellipticals: e22.9, e10.9, e8.9 Series
- Incline Trainers
- Advanced iFIT Integration

#### **Tunturi Fitness** (Netherlands)
- Cardio Fit Series
- T90 Motorised Treadmill
- Cardio 2020/2022 Series
- Strength & Accessories

#### **Concept2** (USA)
- RowErg Indoor Rower
- Standard & Tall Leg Options
- PM5 Monitor

#### **Energie Fitness** (India)
- ETB-17 Functional Trainer
- PRO Series (001-014)
- Single Station Machines
- Commercial Equipment

#### **Vector X Sports** (India)
- Exercise Wheels
- Yoga Equipment
- Sports Accessories

---

## How to Use the Chat Agent

### Getting Started
1. Open the EnergyFit Chat Agent application
2. Read the welcome message
3. Choose from quick action buttons or type your query

### Query Examples

**Finding Product Information:**
- "Tell me about the FreeMotion t22.9 treadmill"
- "What is the Hoist Mi6 Functional Trainer?"
- "Show me Tunturi cardio equipment"

**Comparing Equipment:**
- "Compare FreeMotion t22.9 vs Tunturi T90 treadmill"
- "Which is better: Hoist Mi6 or Mi7?"
- "Compare PRO-009 leg press with Hoist leg press"

**Browsing by Category:**
- "Show me all cardio equipment"
- "List strength training machines"
- "What commercial equipment do you have?"
- "Show HOIST products"

**Getting Recommendations:**
- "I want to set up a home gym under ₹2 lakhs"
- "What's the best treadmill for small spaces?"
- "Equipment for commercial gym setup"
- "Low-impact cardio options"

**Special Queries:**
- "What's the price range of FreeMotion bikes?"
- "Which equipment has heart rate monitoring?"
- "Do you have foldable treadmills?"

---

## Quick Action Buttons

The chatbot includes pre-configured buttons for common queries:

1. **Browse Strength Equipment** - View all strength training machines
2. **Browse Cardio Equipment** - View all cardiovascular machines
3. **View All Brands** - List all available brands
4. **Get Price Estimates** - Equipment by budget tier
5. **Schedule Demo** - Contact Energy Fitness for equipment demo

---

## Integration with Energy Fitness Website

### Direct Links
The chatbot provides direct links to:
- **Main Catalog**: energyfitness.in/e-catalogue
- **Specific Products**: energyfitness.in/products/[equipment-name]
- **Commercial Products**: energyfitness.in/commercial
- **Domestic Products**: energyfitness.in/domestic

### Contact Integration
- "Contact Energy Fitness" button links to website
- Email contact available
- Phone number provided in chat
- Demo request option

---

## Deployment to Vercel

### Prerequisites
- Vercel account (free or paid)
- Git repository with application files
- GitHub account (optional but recommended)

### Deployment Steps

#### **Method 1: Direct Upload to Vercel**

1. **Access Vercel Dashboard**
   - Go to vercel.com
   - Sign in with GitHub/GitLab/Bitbucket or email

2. **Create New Project**
   - Click "Add New" → "Project"
   - Import Git repository or upload files

3. **Upload Files**
   - Upload index.html, CSS, JavaScript files
   - Ensure all files are in correct folder structure

4. **Configure Project**
   - Project name: "energyfit-chat"
   - Framework: Static Site
   - Root directory: "./" (current directory)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Get live URL (e.g., energyfit-chat.vercel.app)

#### **Method 2: GitHub Integration**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: EnergyFit Chat Agent"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit vercel.com → Import Project
   - Select GitHub repository
   - Authorize Vercel

3. **Configure & Deploy**
   - Select repository
   - Configure build settings
   - Click "Deploy"

### Environment Configuration
No environment variables required for basic deployment.

### Custom Domain Setup
1. In Vercel Dashboard → Project Settings
2. Go to "Domains"
3. Add custom domain (e.g., chat.energyfitness.in)
4. Update DNS records as instructed

### Post-Deployment
- Test all chat functions on live URL
- Verify links work correctly
- Test comparison features
- Check mobile responsiveness
- Monitor performance

## Recommended repository structure for Vercel

I reorganized the project into a simple static-site layout that Vercel can deploy easily.

Root now contains:
- `package.json` — minimal scripts for local dev
- `vercel.json` — simple static build config
- `public/` — static site files served by Vercel

Public folder contents:
- `public/index.html` — main HTML (moved from project root)
- `public/app.js` — client-side JS (moved from project root)

Keep any data-generation or helper scripts (e.g., `script.py`) in the repo root if you want to update the catalog offline.

---

## API Integration (Optional)

### To Connect to Energy Fitness Backend

#### **1. Database Integration**
```javascript
// Fetch real product data from Energy Fitness API
fetch('/api/products')
  .then(response => response.json())
  .then(data => updateCatalog(data))
```

#### **2. Real-time Pricing**
```javascript
// Get current prices from backend
fetch('/api/pricing/' + productId)
  .then(response => response.json())
  .then(price => displayPrice(price))
```

#### **3. Link Generation**
```javascript
// Dynamically create links based on product ID
const productLink = `${WEBSITE_URL}/products/${productId}`;
```

---

## Performance Optimization

### For Faster Loading
- Minify CSS and JavaScript files
- Enable Gzip compression on Vercel
- Optimize image sizes
- Use lazy loading for product images

### Vercel Optimizations
- Enable analytics (automatic)
- Configure caching headers
- Use edge middleware if needed
- Enable serverless functions for backend calls

---

## Features & Capabilities Summary

| Feature | Status | Details |
|---------|--------|---------|
| Product Search | ✅ Active | Search by name, type, brand |
| Comparison Tool | ✅ Active | Compare 2-3 products with specs |
| Category Browsing | ✅ Active | Browse by type and brand |
| Direct Links | ✅ Active | Links to Energy Fitness catalog |
| Recommendations | ✅ Active | Based on use case and budget |
| Price Information | ✅ Active | Budget tiers included |
| Specifications | ✅ Active | Full specs and features |
| Chat History | ✅ Active | Maintains context (5-10 messages) |
| Mobile Responsive | ✅ Active | Works on all devices |
| Real-time Updates | 🔄 Optional | Requires API integration |

---

## Troubleshooting

### Issue: Links not working
- Verify Energy Fitness website URLs are correct
- Check if website structure matches expected URLs
- Test links manually on browser

### Issue: Chat not responding
- Check browser console for errors
- Verify JavaScript is enabled
- Clear browser cache and reload

### Issue: Mobile display issues
- Check viewport meta tag in HTML
- Verify CSS media queries
- Test on multiple devices

### Issue: Slow loading
- Optimize image sizes
- Minify CSS/JavaScript
- Enable caching in Vercel

---

## Support & Maintenance

### Regular Updates
- Update product catalog monthly
- Review and fix user feedback
- Add new product models
- Improve chat responses

### Analytics
- Monitor chat interactions (Vercel Analytics)
- Track most searched products
- Identify common queries
- Improve chatbot responses

### Content Updates
- Add new brands and products
- Update specifications
- Refresh pricing information
- Improve comparison data

---

## Future Enhancements

1. **AI Integration** - Use OpenAI API for more natural responses
2. **Real-time Chat** - Add live agent support option
3. **Video Integration** - Product demo videos
4. **PDF Export** - Generate comparison reports as PDF
5. **User Accounts** - Save favorite products and comparisons
6. **Mobile App** - Native iOS/Android applications
7. **Multi-language** - Support for multiple languages
8. **Voice Assistant** - Voice query support

## How to deploy to Vercel (quick)

1. Install Vercel CLI (optional for local dev):

```powershell
npm i -g vercel
```

2. Login and deploy (one-time):

```powershell
vercel login
vercel --prod
```

If you prefer using the Vercel dashboard, point Vercel to this Git repository and it will auto-deploy the `public/` folder as a static site.

---

Files moved into `public/` to make the static site layout clear. If you'd like an API (serverless) for dynamic data, I can add an `api/` folder with serverless functions and example endpoints.

---

## Contact Information

**Energy Fitness**
- Website: energyfitness.in
- Email: support@energyfitness.in
- Phone: [Contact Number]
- Catalog: energyfitness.in/e-catalogue

---

## License & Usage

This chat agent is designed for Energy Fitness customer service and support. All product information is sourced from the official Energy Fitness catalog and website.

**Last Updated**: November 2025
**Version**: 1.0
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea
} from '@mui/material';
import PropTypes from 'prop-types';

import blog1 from '../../../../assets/Images/Webbuilder/blog1.jpg';
import blog2 from '../../../../assets/Images/Webbuilder/blog2.jpg'; 
import blog3 from '../../../../assets/Images/Webbuilder/blog3.jpg';
import ecommerce1 from '../../../../assets/Images/Webbuilder/ecommerce.jpg';
import landing1 from '../../../../assets/Images/Webbuilder/landing1.jpg';
import landing2 from '../../../../assets/Images/Webbuilder/landing2.jpg';
import portfolio1 from '../../../../assets/Images/Webbuilder/portfolio1.jpg';
import portfolio2 from '../../../../assets/Images/Webbuilder/portfolio2.jpg';
import portfolio3 from '../../../../assets/Images/Webbuilder/portfolio3.jpg';

/**
 * Final premium templates pack
 * - 2 Landing
 * - 3 Portfolio
 * - 1 Ecommerce
 * - 3 Blog
 *
 * Format per-template: { id, name, category, thumbnail, html, css }
 * (keeps same format your loader expects: html + css)
 *
 * Images use small placeholder URLs for fast loading (you or users can replace later)
 */

const TEMPLATES = {
  landing: [
    {
      id: 'landing-startup-hero',
      name: 'Startup — Hero & Features',
      category: 'Landing Page',
      thumbnail: landing1,
      html: `
        <!-- Bootstrap 5 CDN -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <section class="py-6 bg-white">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6">
                <h1 class="display-5 fw-bold mb-3">Build polished products, faster.</h1>
                <p class="lead text-muted mb-4">Drag & drop editor, components, hosting and team workflows — everything you need to ship beautiful websites.</p>
                <div class="d-flex gap-2">
                  <a href="#" class="btn btn-primary btn-lg">Get Started</a>
                  <a href="#" class="btn btn-outline-secondary btn-lg">View Demo</a>
                </div>
                <ul class="list-unstyled mt-4 d-flex gap-4">
                  <li><strong>99.9%</strong> uptime</li>
                  <li><strong>Global</strong> CDN</li>
                </ul>
              </div>
              <div class="col-lg-6 text-center">
                <img src="https://via.placeholder.com/900x540.png?text=Hero+Preview" alt="Hero" class="img-fluid rounded shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        <section class="py-5 bg-light">
          <div class="container">
            <div class="row g-4">
              <div class="col-md-4">
                <div class="p-4 bg-white rounded shadow-sm h-100">
                  <h5 class="mb-2">Design System</h5>
                  <p class="mb-0 text-muted">Maintain consistent styles and components across your sites.</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="p-4 bg-white rounded shadow-sm h-100">
                  <h5 class="mb-2">Team Collaboration</h5>
                  <p class="mb-0 text-muted">Invite teammates, comment and iterate together.</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="p-4 bg-white rounded shadow-sm h-100">
                  <h5 class="mb-2">Fast Publishing</h5>
                  <p class="mb-0 text-muted">Publish to your domain or subdomain with one click.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer class="py-4 text-center">
          <div class="container">
            <small class="text-muted">© 2025 YourCompany — Built for creators</small>
          </div>
        </footer>
      `,
      css: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        body { font-family: 'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, Arial; margin: 0; }
        .lead { font-size: 1.05rem; }
      `
    },

    {
      id: 'landing-product-showcase',
      name: 'Product — Showcase & CTA',
      category: 'Landing Page',
      thumbnail: landing2,
      html: `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <section class="py-6" style="background: linear-gradient(180deg,#f8fafc,#fff);">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6 order-lg-2 text-center">
                <img src="https://via.placeholder.com/700x420.png?text=Product+Image" alt="Product" class="img-fluid rounded shadow" />
              </div>
              <div class="col-lg-6 order-lg-1">
                <h1 class="display-6 fw-bold">The Nova Gadget — Smart & Sleek</h1>
                <p class="text-muted mb-4">A high performance device for modern lifestyles. Elegant materials, thoughtful features, excellent battery life.</p>
                <div class="d-flex gap-2">
                  <a href="#" class="btn btn-dark btn-lg">Pre-order</a>
                  <a href="#" class="btn btn-outline-secondary btn-lg">Learn More</a>
                </div>
                <div class="mt-4">
                  <small class="text-muted">Free shipping • 30-day returns • 1 year warranty</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="py-5 bg-white">
          <div class="container">
            <h3 class="mb-3 text-center">Key features</h3>
            <div class="row g-4">
              <div class="col-md-4">
                <div class="p-3 text-center">
                  <h5>Performance</h5>
                  <p class="text-muted">Smooth, power-efficient components.</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="p-3 text-center">
                  <h5>Design</h5>
                  <p class="text-muted">Premium build & finishes.</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="p-3 text-center">
                  <h5>Battery</h5>
                  <p class="text-muted">All-day battery with fast charging.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer class="py-4 text-center bg-light">
          <div class="container">
            <small class="text-muted">© 2025 YourCompany — Designed with care</small>
          </div>
        </footer>
      `,
      css: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        body { font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, Arial; margin:0 }
      `
    }
  ],

  portfolio: [
    {
      id: 'portfolio-creative-grid',
      name: 'Portfolio — Creative Grid',
      category: 'Portfolio',
      thumbnail: portfolio1,
      html: `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <header class="py-5 text-center bg-white">
          <div class="container">
            <h1 class="fw-bold">Evelyn Park</h1>
            <p class="text-muted mb-0">Designer & Art Director</p>
          </div>
        </header>

        <section class="py-5 bg-light">
          <div class="container">
            <div class="row g-4">
              <div class="col-md-4">
                <div class="card border-0 shadow-sm">
                  <img src="https://via.placeholder.com/640x420.png?text=Project+1" class="card-img-top" alt="Project 1" />
                  <div class="card-body">
                    <h5 class="card-title mb-1">Brand Identity</h5>
                    <p class="text-muted mb-0">Full identity system for a boutique agency.</p>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="card border-0 shadow-sm">
                  <img src="https://via.placeholder.com/640x420.png?text=Project+2" class="card-img-top" alt="Project 2" />
                  <div class="card-body">
                    <h5 class="card-title mb-1">Web Redesign</h5>
                    <p class="text-muted mb-0">Landing focused on conversions.</p>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="card border-0 shadow-sm">
                  <img src="https://via.placeholder.com/640x420.png?text=Project+3" class="card-img-top" alt="Project 3" />
                  <div class="card-body">
                    <h5 class="card-title mb-1">Editorial</h5>
                    <p class="text-muted mb-0">Photography-driven longform layouts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer class="py-4 text-center bg-white">
          <div class="container"><small class="text-muted">© 2025 YourCompany</small></div>
        </footer>
      `,
      css: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        body{margin:0;}
      `
    },

    {
      id: 'portfolio-minimal-onepage',
      name: 'Portfolio — Minimal One Page',
      category: 'Portfolio',
      thumbnail: portfolio2,
      html: `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <header class="py-6 text-center bg-white">
          <div class="container">
            <h1 class="display-6 fw-bold">Noah Reed</h1>
            <p class="text-muted">Frontend Engineer & Product Designer</p>
          </div>
        </header>

        <section class="py-5 bg-light">
          <div class="container">
            <h3>About</h3>
            <p class="text-muted">I build accessible interfaces and design systems for scale. I enjoy turning complex problems into simple, human-first solutions.</p>

            <h3 class="mt-4">Selected Work</h3>
            <div class="row g-4 mt-2">
              <div class="col-md-6">
                <div class="card border-0 shadow-sm">
                  <img src="https://via.placeholder.com/700x420.png?text=Work+A" class="card-img-top" alt="Work A" />
                  <div class="card-body">
                    <h5 class="card-title">Design System</h5>
                    <p class="text-muted mb-0">Reusable components for product teams.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card border-0 shadow-sm">
                  <img src="https://via.placeholder.com/700x420.png?text=Work+B" class="card-img-top" alt="Work B" />
                  <div class="card-body">
                    <h5 class="card-title">Mobile UI</h5>
                    <p class="text-muted mb-0">Onboarding flows & interaction design.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer class="py-4 text-center bg-white">
          <div class="container"><small class="text-muted">© 2025 YourCompany</small></div>
        </footer>
      `,
      css: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        body{margin:0;}
      `
    },

    {
      id: 'portfolio-agency',
      name: 'Portfolio — Agency Showcase',
      category: 'Portfolio',
      thumbnail: portfolio3,
      html: `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <header class="py-5 bg-white text-center">
          <div class="container">
            <h1 class="fw-bold">Studio & Co</h1>
            <p class="text-muted">Brand, product and digital experience studio</p>
          </div>
        </header>

        <section class="py-5 bg-light">
          <div class="container">
            <div class="row g-4 mb-4">
              <div class="col-md-4">
                <div class="p-4 bg-white rounded shadow-sm h-100">
                  <h5>Strategy</h5>
                  <p class="text-muted">Research-led roadmaps and positioning.</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="p-4 bg-white rounded shadow-sm h-100">
                  <h5>Design</h5>
                  <p class="text-muted">User-first design systems and interfaces.</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="p-4 bg-white rounded shadow-sm h-100">
                  <h5>Engineering</h5>
                  <p class="text-muted">Robust frontend & backend for scale.</p>
                </div>
              </div>
            </div>

            <div class="row g-4">
              <div class="col-md-4">
                <div class="card border-0 shadow-sm">
                  <img src="https://via.placeholder.com/640x420.png?text=Work+1" class="card-img-top" alt="Work 1" />
                  <div class="card-body">
                    <h5>Work 1</h5>
                    <p class="text-muted mb-0">Brand & product design</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card border-0 shadow-sm">
                  <img src="https://via.placeholder.com/640x420.png?text=Work+2" class="card-img-top" alt="Work 2" />
                  <div class="card-body">
                    <h5>Work 2</h5>
                    <p class="text-muted mb-0">Ecommerce redesign</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card border-0 shadow-sm">
                  <img src="https://via.placeholder.com/640x420.png?text=Work+3" class="card-img-top" alt="Work 3" />
                  <div class="card-body">
                    <h5>Work 3</h5>
                    <p class="text-muted mb-0">Mobile UI & interactions</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <footer class="py-4 text-center bg-white">
          <div class="container"><small class="text-muted">© 2025 YourCompany</small></div>
        </footer>
      `,
      css: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        body{margin:0;}
      `
    }
  ],

  ecommerce: [
    {
      id: 'ecommerce-modern-store',
      name: 'Ecommerce — Modern Storefront',
      category: 'Ecommerce',
      thumbnail: ecommerce1,
      html: `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <header class="py-4 bg-white text-center">
          <div class="container">
            <h1 class="fw-bold">MarketHouse</h1>
            <p class="text-muted mb-0">Curated goods for modern living</p>
          </div>
        </header>

        <section class="py-5 bg-light">
          <div class="container">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 class="h4 mb-0">Featured Collections</h2>
                <small class="text-muted">Editor picks</small>
              </div>
              <a href="#" class="btn btn-dark">Shop All</a>
            </div>

            <div class="row g-4">
              <div class="col-md-4">
                <div class="card border-0 shadow-sm text-center p-3">
                  <img src="https://via.placeholder.com/400x300.png?text=Item+1" class="card-img-top rounded mb-3" alt="Item 1" />
                  <h5>Classic Watch</h5>
                  <p class="text-muted mb-2">$139.00</p>
                  <a href="#" class="btn btn-outline-dark">Buy</a>
                </div>
              </div>

              <div class="col-md-4">
                <div class="card border-0 shadow-sm text-center p-3">
                  <img src="https://via.placeholder.com/400x300.png?text=Item+2" class="card-img-top rounded mb-3" alt="Item 2" />
                  <h5>Wireless Earbuds</h5>
                  <p class="text-muted mb-2">$79.00</p>
                  <a href="#" class="btn btn-outline-dark">Buy</a>
                </div>
              </div>

              <div class="col-md-4">
                <div class="card border-0 shadow-sm text-center p-3">
                  <img src="https://via.placeholder.com/400x300.png?text=Item+3" class="card-img-top rounded mb-3" alt="Item 3" />
                  <h5>Desk Lamp</h5>
                  <p class="text-muted mb-2">$39.00</p>
                  <a href="#" class="btn btn-outline-dark">Buy</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer class="py-4 text-center bg-white">
          <div class="container"><small class="text-muted">© 2025 YourCompany</small></div>
        </footer>
      `,
      css: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        body{margin:0;}
      `
    }
  ],

  blog: [
    {
      id: 'blog-modern-magazine',
      name: 'Blog — Modern Magazine',
      category: 'Blog',
      thumbnail: blog1,
      html: `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <header class="py-5 bg-white text-center">
          <div class="container">
            <h1 class="fw-bold">Modern Living</h1>
            <p class="text-muted">Features on travel, design & culture</p>
          </div>
        </header>

        <section class="py-5 bg-light">
          <div class="container">
            <div class="row g-4">
              <div class="col-lg-8">
                <article class="bg-white p-4 rounded shadow-sm mb-4">
                  <img src="https://via.placeholder.com/900x420.png?text=Featured+Story" alt="featured" class="img-fluid rounded mb-3" />
                  <h2>10 Hidden Gems to Visit in 2025</h2>
                  <p class="text-muted">A curated list of unique travel experiences you shouldn't miss.</p>
                </article>

                <article class="bg-white p-4 rounded shadow-sm">
                  <h4>Minimal Living Tips</h4>
                  <p class="text-muted">Create a calm, focused home with a few simple changes.</p>
                </article>
              </div>

              <aside class="col-lg-4">
                <div class="p-4 bg-white rounded shadow-sm">
                  <h5>Popular Tags</h5>
                  <div class="d-flex flex-wrap gap-2 mt-2">
                    <span class="badge bg-light text-dark">Travel</span>
                    <span class="badge bg-light text-dark">Design</span>
                    <span class="badge bg-light text-dark">Wellness</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <footer class="py-4 text-center bg-white">
          <div class="container"><small class="text-muted">© 2025 Modern Living</small></div>
        </footer>
      `,
      css: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        body{margin:0;}
      `
    },

    {
      id: 'blog-personal-journal',
      name: 'Blog — Personal Journal',
      category: 'Blog',
      thumbnail: blog2,
      html: `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <header class="py-5 bg-white text-center">
          <div class="container">
            <h1 class="fw-bold">Notes from the Road</h1>
            <p class="text-muted">Personal essays on design, travel & craft</p>
          </div>
        </header>

        <section class="py-5 bg-light">
          <div class="container">
            <div class="row g-4">
              <div class="col-md-8">
                <article class="bg-white p-4 rounded shadow-sm mb-4">
                  <h2>Why I Choose Slow Travel</h2>
                  <p class="text-muted">Slower travel creates deeper memories and stronger creative inspiration.</p>
                </article>

                <article class="bg-white p-4 rounded shadow-sm">
                  <h4>On Crafting Interfaces</h4>
                  <p class="text-muted">Small details that make the experience delightful for users.</p>
                </article>
              </div>

              <aside class="col-md-4">
                <div class="p-4 bg-white rounded shadow-sm">
                  <h5>About</h5>
                  <p class="text-muted">Short author bio and subscription link.</p>
                  <a href="#" class="btn btn-sm btn-dark">Subscribe</a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <footer class="py-4 text-center bg-white">
          <div class="container"><small class="text-muted">© 2025 Notes from the Road</small></div>
        </footer>
      `,
      css: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        body{margin:0;}
      `
    },

    {
      id: 'blog-featured-grid',
      name: 'Blog — Featured Grid',
      category: 'Blog',
      thumbnail: blog3,
      html: `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <header class="py-5 bg-white text-center">
          <div class="container">
            <h1 class="fw-bold">Featured Reads</h1>
            <p class="text-muted">Curated stories on product, design & culture</p>
          </div>
        </header>

        <section class="py-5 bg-light">
          <div class="container">
            <div class="row g-4">
              <div class="col-md-4">
                <article class="bg-white p-3 rounded shadow-sm">
                  <img src="https://via.placeholder.com/640x420.png?text=Post+1" class="img-fluid rounded mb-2" alt="p1" />
                  <h5>Design Systems in 2025</h5>
                  <p class="text-muted">How teams successfully scale design.</p>
                </article>
              </div>
              <div class="col-md-4">
                <article class="bg-white p-3 rounded shadow-sm">
                  <img src="https://via.placeholder.com/640x420.png?text=Post+2" class="img-fluid rounded mb-2" alt="p2" />
                  <h5>The Art of Onboarding</h5>
                  <p class="text-muted">Small flows that boost activation.</p>
                </article>
              </div>
              <div class="col-md-4">
                <article class="bg-white p-3 rounded shadow-sm">
                  <img src="https://via.placeholder.com/640x420.png?text=Post+3" class="img-fluid rounded mb-2" alt="p3" />
                  <h5>Product Discovery Techniques</h5>
                  <p class="text-muted">Validate ideas faster with low-cost experiments.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <footer class="py-4 text-center bg-white">
          <div class="container"><small class="text-muted">© 2025 Featured Reads</small></div>
        </footer>
      `,
      css: `
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
        body{margin:0;}
      `
    }
  ]
};

/* ---------------------------
   Template Picker UI (MUI)
   --------------------------- */

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`template-tabpanel-${index}`}
      aria-labelledby={`template-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `template-tab-${index}`,
    'aria-controls': `template-tabpanel-${index}`
  };
}

const TemplatePicker = ({ open, onClose, onSelect }) => {
  const [tabValue, setTabValue] = React.useState(0);
  const categories = Object.keys(TEMPLATES);

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const handleTemplateSelect = (template) => {
    // passes the full template object (html + css) back to parent
    onSelect(template);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth aria-labelledby="template-picker-dialog">
      <DialogTitle>Choose a Template</DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            {categories.map((category, index) => (
              <Tab key={category} label={category.charAt(0).toUpperCase() + category.slice(1)} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Box>

        {categories.map((category, index) => (
          <TabPanel key={category} value={tabValue} index={index}>
            {TEMPLATES[category].map((template) => (
              <Grid item xs={12} sm={6} md={4} key={template.id}>
                <Card
                  sx={{
                    boxShadow: 3,
                    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                    '&:hover': { transform: 'translateY(-6px)', boxShadow: 8 }
                  }}
                >
                  <CardActionArea onClick={() => handleTemplateSelect(template)}>
                    <CardMedia component="img" height="180" image={template.thumbnail} alt={template.name} />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {template.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {template.category}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </TabPanel>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

TemplatePicker.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default TemplatePicker;

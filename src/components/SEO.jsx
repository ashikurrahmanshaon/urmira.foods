import { useEffect } from 'react';

const DEFAULT_TITLE = 'URMIRA - 100% Pure & Organic Foods | খাঁটি গাওয়া ঘি ও খেজুর পাওয়ার বোম্ব';
const DEFAULT_DESCRIPTION = 'উর্মিরা ফুডস - ১০০% প্রাকৃতিক ও নির্ভেজাল গাওয়া ঘি এবং প্রিমিয়াম খেজুরের পাওয়ার বোম্ব। খামারিদের খাঁটি মাখনে প্রস্তুত, কোনো কেমিক্যাল নেই। সারাদেশে ক্যাশ অন ডেলিভারি।';
const DEFAULT_KEYWORDS = 'গাওয়া ঘি, খাঁটি গাওয়া ঘি, pure cow ghee bd, gawa ghee price in bangladesh, buy organic cow ghee, pure ghee online, খাঁটি ঘি চেনার উপায়, খেজুরের পাওয়ার বোম্ব, khurjur power bomb, dry fruits honey, organic food bangladesh, urmira foods';
const SITE_URL = 'https://urmira.com';
const DEFAULT_IMAGE = 'https://urmira.com/images/ghee-1.jpg';

function updateMetaTag(attrName, attrValue, content) {
  if (!content) return;
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateCanonical(url) {
  let link = document.querySelector("link[rel='canonical']");
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function updateStructuredData(schemaData) {
  const existingScript = document.getElementById('urmira-jsonld-schema');
  if (existingScript) {
    existingScript.remove();
  }

  if (schemaData) {
    const script = document.createElement('script');
    script.id = 'urmira-jsonld-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);
  }
}

function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalPath = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  schema = null
}) {
  const fullTitle = title 
    ? `${title} | URMIRA - 100% Pure Organic Foods` 
    : DEFAULT_TITLE;

  const canonicalUrl = `${SITE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
  const fullImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  useEffect(() => {
    // 1. Title Tag
    document.title = fullTitle;

    // 2. Standard Meta Tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('name', 'author', 'URMIRA Organic Foods');

    // 3. Canonical Link
    updateCanonical(canonicalUrl);

    // 4. OpenGraph Tags (Facebook, WhatsApp, LinkedIn)
    updateMetaTag('property', 'og:title', fullTitle);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', fullImageUrl);
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:site_name', 'URMIRA Organic Foods');
    updateMetaTag('property', 'og:locale', 'bn_BD');

    // 5. Twitter Card Tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', fullTitle);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', fullImageUrl);

    // 6. JSON-LD Structured Data for Google Search
    updateStructuredData(schema);

    return () => {
      // Optional cleanup on unmount if needed
    };
  }, [fullTitle, description, keywords, canonicalUrl, fullImageUrl, type, schema]);

  return null;
}

export default SEO;

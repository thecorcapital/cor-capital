import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogType?: string;
  schema?: object;
}

const DEFAULT_TITLE = 'Cor Capital | Global Asset Management & Alternative Investment Hedge Fund';
const DEFAULT_DESCRIPTION = 'Cor Capital Management LLC is an alternative asset management firm and multi-strategy hedge fund founded by Michael A. Corvin, focused on long/short equity, global macro, real estate, and arbitrage strategies.';
const BASE_URL = 'https://thecorcapital.com';

export function SEOHead({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonicalPath,
  ogType = 'website',
  schema,
}: SEOHeadProps) {
  const location = useLocation();
  const currentPath = canonicalPath || location.pathname;
  const canonicalUrl = `${BASE_URL}${currentPath === '/' ? '' : currentPath}`;

  useEffect(() => {
    // 1. Update document title
    document.title = title;

    // Helper to update or create meta tags
    const setMetaTag = (nameAttr: string, nameValue: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${nameValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, nameValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'title', title);

    // 3. Open Graph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:url', canonicalUrl);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 6. Dynamic JSON-LD for breadcrumb and specific page
    const scriptId = 'dynamic-page-schema';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': currentPath === '/' ? [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://thecorcapital.com/'
        }
      ] : [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://thecorcapital.com/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': title.split('|')[0].trim(),
          'item': canonicalUrl
        }
      ]
    };

    const combinedSchema = schema ? [breadcrumbSchema, schema] : [breadcrumbSchema];
    scriptTag.textContent = JSON.stringify(combinedSchema);

    // Scroll smoothly to top on page navigation for consistent indexing and UX
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [title, description, canonicalUrl, ogType, schema, currentPath]);

  return null;
}

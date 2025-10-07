import { useEffect } from 'react';

interface GTMScriptProps {
  gtmId?: string;
}

export default function GTMScript({ gtmId = 'GTM-567XZCDX' }: GTMScriptProps) {
  useEffect(() => {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // Delay GTM loading to improve initial page performance
    const loadGTM = () => {
      // GTM initialization
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });

      // Load GTM script with performance optimizations
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
      script.onload = () => {
        console.log('GTM loaded successfully');
      };
      document.head.appendChild(script);
    };

    // Delay GTM loading until page is more stable
    const timer = setTimeout(loadGTM, 3000);

    // Push initial data
    window.dataLayer.push({
      event: 'gtm_loaded',
      page_type: 'landing_page',
      product_category: 'agricultural_education',
      traffic_source: document.referrer || 'direct',
      timestamp: new Date().toISOString(),
    });

    return () => {
      // Cleanup timer and script if needed
      clearTimeout(timer);
      const existingScript = document.querySelector(`script[src*="${gtmId}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [gtmId]);

  return (
    <>
      {/* GTM noscript fallback */}
      <noscript>
        <iframe 
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0" 
          width="0" 
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}

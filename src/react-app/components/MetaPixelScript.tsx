import { useEffect } from 'react';

interface MetaPixelScriptProps {
  pixelId?: string;
}

export default function MetaPixelScript({ pixelId = '714277868320104' }: MetaPixelScriptProps) {
  useEffect(() => {
    const loadFacebookPixel = () => {
      // Initialize Facebook Pixel with performance optimizations
      (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ?
            n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.defer = !0;
        t.src = v;
        t.onload = () => {
          console.log('Facebook Pixel loaded successfully');
        };
        s = b.getElementsByTagName(e)[0];
        if (s && s.parentNode) {
          s.parentNode.insertBefore(t, s);
        }
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      // Initialize the pixel
      window.fbq('init', pixelId);
    };

    // Delay Facebook Pixel loading to improve initial page performance
    const timer = setTimeout(loadFacebookPixel, 2500);
    
    // PageView will be tracked by usePageTracking hook to avoid duplication

    return () => {
      // Cleanup timer if needed
      clearTimeout(timer);
    };
  }, [pixelId]);

  return (
    <>
      {/* Meta Pixel noscript fallback */}
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

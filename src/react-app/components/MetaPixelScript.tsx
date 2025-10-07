import { useEffect } from 'react';

interface MetaPixelScriptProps {
  pixelId?: string;
}

export default function MetaPixelScript({ pixelId = '714277868320104' }: MetaPixelScriptProps) {
  useEffect(() => {
    // Initialize Facebook Pixel
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
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      if (s && s.parentNode) {
        s.parentNode.insertBefore(t, s);
      }
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    // Initialize the pixel
    window.fbq('init', pixelId);
    
    // PageView will be tracked by usePageTracking hook to avoid duplication

    return () => {
      // Cleanup if needed - no specific tracking on unload
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

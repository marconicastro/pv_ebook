import { useEffect, useState } from 'react';

interface OptimizedScriptsProps {
  children: React.ReactNode;
}

export default function OptimizedScripts({ children }: OptimizedScriptsProps) {
  const [isPageStable, setIsPageStable] = useState(false);

  useEffect(() => {
    // Wait for page to be more stable before loading heavy scripts
    const loadTimer = setTimeout(() => {
      setIsPageStable(true);
    }, 1000);

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      const quickTimer = setTimeout(() => {
        setIsPageStable(true);
      }, 500);
      
      return () => {
        clearTimeout(loadTimer);
        clearTimeout(quickTimer);
      };
    }

    return () => {
      clearTimeout(loadTimer);
    };
  }, []);

  // Only render scripts after page is stable
  return isPageStable ? <>{children}</> : null;
}

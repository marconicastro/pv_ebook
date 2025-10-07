// GTM Data Layer Tracking Utils and Meta Pixel Integration
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined' && !window.dataLayer) {
  window.dataLayer = [];
}

// GTM Event Types
export interface GTMEvent {
  event: string;
  [key: string]: any;
}

// Push event to dataLayer and Meta Pixel
export const pushToDataLayer = (eventData: GTMEvent) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(eventData);
    console.log('GTM Event:', eventData);
  }
};

// Push event to Meta Pixel
export const pushToMetaPixel = (eventName: string, parameters?: any) => {
  if (typeof window !== 'undefined' && window.fbq) {
    if (eventName === 'PageView' || eventName === 'Purchase' || eventName === 'Lead' || eventName === 'CompleteRegistration' || eventName === 'InitiateCheckout' || eventName === 'ViewContent') {
      window.fbq('track', eventName, parameters);
    } else {
      window.fbq('trackCustom', eventName, parameters);
    }
    console.log('Meta Pixel Event:', eventName, parameters);
  }
};

// Page View Event
export const trackPageView = (pageName: string, pageUrl?: string) => {
  const eventData = {
    event: 'page_view',
    page_name: pageName,
    page_url: pageUrl || window.location.href,
    page_title: document.title,
    timestamp: new Date().toISOString(),
  };
  
  pushToDataLayer(eventData);
  pushToMetaPixel('PageView', {
    page_name: pageName,
    page_url: pageUrl || window.location.href,
  });
};



// Checkout Events
export const trackCheckoutStart = (product: string, price: number, currency: string = 'BRL') => {
  const eventData = {
    event: 'begin_checkout',
    product_name: product,
    price: price,
    currency: currency,
    timestamp: new Date().toISOString(),
  };
  
  pushToDataLayer(eventData);
  pushToMetaPixel('InitiateCheckout', {
    content_name: product,
    value: price,
    currency: currency,
  });
};

export const trackPurchaseClick = (product: string, price: number, currency: string = 'BRL') => {
  const eventData = {
    event: 'purchase_click',
    product_name: product,
    price: price,
    currency: currency,
    checkout_url: 'https://go.allpes.com.br/r1wl4qyyfv',
    timestamp: new Date().toISOString(),
  };
  
  pushToDataLayer(eventData);
};

// Scroll Events
export const trackScrolled = (percentage: number) => {
  const eventData = {
    event: 'scroll',
    scroll_percentage: percentage,
    timestamp: new Date().toISOString(),
  };
  
  pushToDataLayer(eventData);
  pushToMetaPixel('ScrollMilestone', {
    scroll_percentage: percentage,
  });
};

// Section View Events
export const trackSectionView = (sectionName: string) => {
  // Add 3 second delay for ViewContent events
  setTimeout(() => {
    const eventData = {
      event: 'section_view',
      section_name: sectionName,
      timestamp: new Date().toISOString(),
    };
    
    pushToDataLayer(eventData);
    pushToMetaPixel('ViewContent', {
      content_name: sectionName,
      content_type: 'section',
    });
  }, 3000);
};

// Timer Events
export const trackTimerExpiry = (timerName: string) => {
  pushToDataLayer({
    event: 'timer_expiry',
    timer_name: timerName,
    timestamp: new Date().toISOString(),
  });
};

// User Engagement Events
export const trackUserEngagement = (engagementType: string, value?: any) => {
  pushToDataLayer({
    event: 'user_engagement',
    engagement_type: engagementType,
    engagement_value: value,
    timestamp: new Date().toISOString(),
  });
};

// Lead Events
export const trackLeadEvent = (leadType: string, source: string) => {
  const eventData = {
    event: 'generate_lead',
    lead_type: leadType,
    lead_source: source,
    timestamp: new Date().toISOString(),
  };
  
  pushToDataLayer(eventData);
  pushToMetaPixel('Lead', {
    content_name: leadType,
    source: source,
  });
};

// Custom Event
export const trackCustomEvent = (eventName: string, eventData: Record<string, any> = {}) => {
  const fullEventData = {
    event: eventName,
    ...eventData,
    timestamp: new Date().toISOString(),
  };
  
  pushToDataLayer(fullEventData);
  pushToMetaPixel(eventName, eventData);
};

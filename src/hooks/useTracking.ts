// A placeholder for the GA4 tracking hook.
// This will be implemented to send events to Google Analytics.

declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
    }
}

type GTagEvent = {
    action: string;
    category?: string;
    label?: string;
    value?: number;
    [key: string]: unknown;
};

export const useTracking = () => {
    const trackEvent = (event: GTagEvent) => {
        const { action, ...params } = event;
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', action, params);
        } else {
            console.log(`GA4 Event (gtag not found): ${action}`, params);
        }
    };

    const trackPageView = (url: string) => {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
                page_path: url,
            });
        } else {
            console.log(`GA4 PageView (gtag not found): ${url}`);
        }
    };

    return { trackEvent, trackPageView };
};

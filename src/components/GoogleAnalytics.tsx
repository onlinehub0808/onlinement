import React from "react";
import Script, { ScriptProps } from "next/script";
import { usePageViews } from "../hooks";

type GoogleAnalyticsProps = {
  gaMeasurementId?: string; // Optional Google Analytics Measurement ID
  gtagUrl?: string; // Optional URL for the Google Tag Manager script
  strategy?: ScriptProps["strategy"]; // Optional loading strategy for the script
  debugMode?: boolean; // Optional flag to enable debug mode
  defaultConsent?: "granted" | "denied"; // Optional default consent status
  nonce?: string; // Optional nonce for inline script security
};

type WithPageView = GoogleAnalyticsProps & {
  trackPageViews?: boolean; // Optional flag to enable page view tracking
};

type WithIgnoreHashChange = GoogleAnalyticsProps & {
  trackPageViews?: {
    ignoreHashChange: boolean; // Optional flag to ignore hash changes in URLs
  };
};

// Main Google Analytics component
export function GoogleAnalytics({
  debugMode = false, // Default to false for debug mode
  gaMeasurementId, // Optional Google Analytics Measurement ID
  gtagUrl = "https://www.googletagmanager.com/gtag/js", // Default URL for GTM script
  strategy = "afterInteractive", // Default loading strategy for the script
  defaultConsent = "granted", // Default consent status is granted
  trackPageViews, // Optional page view tracking configuration
  nonce, // Optional nonce for inline script
}: WithPageView | WithIgnoreHashChange): JSX.Element | null {
  
  // Use environment variable or prop for GA Measurement ID
  const _gaMeasurementId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? gaMeasurementId;

  // Hook to track page views with optional hash change ignoring
  usePageViews({
    gaMeasurementId: _gaMeasurementId,
    ignoreHashChange:
      typeof trackPageViews === "object"
        ? trackPageViews?.ignoreHashChange // Ignore hash change if specified
        : false,
    disabled: !trackPageViews, // Disable tracking if not specified
  });

  // Return null if GA Measurement ID is not provided
  if (!_gaMeasurementId) {
    return null;
  }

  // Return script elements for Google Analytics
  return (
    <>
      {/* Load Google Tag Manager script */}
      <Script src={`${gtagUrl}?id=${_gaMeasurementId}`} strategy={strategy} />
      
      {/* Inline script to configure Google Analytics */}
      <Script id="nextjs-google-analytics" nonce={nonce}>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${
              defaultConsent === "denied" ?
              `gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });` : ``
            }
            gtag('config', '${_gaMeasurementId}', {
              page_path: window.location.pathname,
              ${debugMode ? `debug_mode: ${debugMode},` : ""}
            });
          `}
      </Script>
    </>
  );
}
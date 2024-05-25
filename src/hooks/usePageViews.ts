// Importing necessary hooks and modules from react and next/router
import { useEffect } from "react";
import { Router } from "next/router";
import { pageView } from "../interactions";

// Interface describing the shape of the options object for the usePageViews hook
export interface UsePageViewsOptions {
  gaMeasurementId?: string; // The Google Analytics Measurement ID. Falls back to the value from the environment variables.
  ignoreHashChange?: boolean; // If set to true, the hook will not track hash change events.
  disabled?: boolean; // If set to true, disables the hook entirely. Useful for disabling tracking during development or testing.
}

// Function usePageViews - A custom React hook for tracking page views in a Next.js app
export function usePageViews({
  gaMeasurementId,
  ignoreHashChange,
  disabled,
}: UsePageViewsOptions = {}): void {
  
  // useEffect hook to manage setup and cleanup for page view tracking
  useEffect(() => {
    // If the disabled option is true, do nothing and return from the useEffect hook
    if (disabled) {
      return;
    }

    // Function to handle routing events, sending a page view interaction to Google Analytics
    const handleRouteChange = (url: URL): void => {
      // Retrieve the GA Measurement ID from environment variables or from passed in options
      const _gaMeasurementId =
        process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? gaMeasurementId;

      // Create the page view interaction
      pageView({ path: url.toString() }, _gaMeasurementId);
    };

    // Attach the handleRouteChange function to routeChangeComplete event
    Router.events.on("routeChangeComplete", handleRouteChange);
    
    // If the ignoreHashChange option is not set to true, attach the handleRouteChange function to the hashChangeComplete event
    if (!ignoreHashChange) {
      Router.events.on("hashChangeComplete", handleRouteChange);
    }

    // Return a cleanup function to remove the event handlers when the component unmounts
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);

      if (!ignoreHashChange) {
        Router.events.off("hashChangeComplete", handleRouteChange);
      }
    };
  // Adding necessary dependencies for the useEffect hook
  }, [Router.events, gaMeasurementId, ignoreHashChange]);
}
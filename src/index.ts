// Exporting the GoogleAnalytics component from the components directory
export { GoogleAnalytics } from "./components";

// Exporting hooks related to page views from the hooks directory
// usePagesViews: Custom hook to track multiple page views
// usePageViews: Custom hook to track single page views
// UsePageViewsOptions: Type or interface for the options used in the usePageViews hook
export { usePagesViews, usePageViews, UsePageViewsOptions } from "./hooks";

// Exporting functions related to user interactions from the interactions directory
// pageView: Function to log a page view event
// event: Function to log a custom event
// consent: Function to handle user consent for tracking
export { pageView, event, consent } from "./interactions";
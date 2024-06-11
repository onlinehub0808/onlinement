import { usePageViews, UsePageViewsOptions } from "./usePageViews";

/**
 * A deprecated hook for tracking page views.
 * 
 * @deprecated Use the `usePageViews` hook instead.
 * @param {UsePageViewsOptions} [options] - Optional configuration for the hook.
 */
export function usePagesViews(options?: UsePageViewsOptions): void {
  // Log a warning message to the console indicating the deprecation of this hook.
  console.warn(
    "Nextjs Google Analytics: The 'usePagesViews' hook is deprecated. Please use 'usePageViews' hook instead. https://github.com/MauricioRobayo/nextjs-google-analytics#readme"
  );
  
  // Call the new `usePageViews` hook with the provided options.
  usePageViews(options);
}
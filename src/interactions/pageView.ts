// Define the type for PageView options
type PageViewOptions = {
  title?: string;          // Optional title of the page
  location?: string;       // Optional location URL of the page
  path?: string;           // Optional path of the page
  sendPageView?: boolean;  // Optional flag to send page view
  userId?: string;         // Optional user ID
};

// Function to track page views
export function pageView(
  { title, location, path, sendPageView, userId }: PageViewOptions = {}, // Destructure options with default empty object
  measurementId?: string // Optional measurement ID parameter
): void {
  // Get the Google Analytics Measurement ID either from environment variables or the passed measurementId
  const gaMeasurementId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? measurementId;

  // If the Measurement ID or the global gtag function isn't available, exit the function
  if (!gaMeasurementId || !window.gtag) {
    return;
  }

  // Initialize an object to hold the page view options for gtag
  const pageViewOptions: {
    page_title?: string;
    page_location?: string;
    page_path?: string;
    send_page_view?: boolean;
    user_id?: string;
  } = {};

  // Conditionally add properties to the pageViewOptions object if they are provided
  if (title !== undefined) {
    pageViewOptions.page_title = title; // Set the page title
  }

  if (location !== undefined) {
    pageViewOptions.page_location = location; // Set the page location URL
  }

  if (path !== undefined) {
    pageViewOptions.page_path = path; // Set the page path
  }

  if (sendPageView !== undefined) {
    pageViewOptions.send_page_view = sendPageView; // Set the send page view flag
  }

  if (userId !== undefined) {
    pageViewOptions.user_id = userId; // Set the user ID
  }

  // Send the page view event to Google Analytics using the gtag function
  window.gtag("config", gaMeasurementId, pageViewOptions);
}
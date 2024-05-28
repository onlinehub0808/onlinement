// This is a type definition for the options that are required for the consent function.
// The options are expected to maintain the structure specified by the ConsentOptions interface.
type ConsentOptions = {
  arg: Gtag.ConsentArg;    // The argument for the Google Tag 'consent' command.
  params: Gtag.ConsentParams; // The parameters for the Google Tag 'consent' command.
}

// This function is used to modify user consent settings for a website using Google Analytics.
// The function consumes ConsentOptions as its argument.
export function consent({ arg, params }: ConsentOptions): void {
  
  // Checks if Google Analytics 'gtag' is available in the global scope.
  // If not, the function will return and do nothing.
  if (!window.gtag) {
    return;
  }

  // If 'gtag' is available, it sends a 'consent' command with argument and parameters
  // This can be used to tell Google Analytics about a user's consent choices on the website.
  window.gtag('consent', arg, params);
}
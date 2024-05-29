// Begin type definitions.
// Type definition for the options of Event.
// Any key-value can be added to EventOptions due to the use of Record<string, any>. 
// Additionally, there are some keys with specific types.
type EventOptions = Record<string, any> & {
  category?: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  userId?: string;
};

// Define the function "event", which sends events to Google Analytics.
// "action" parameter is a string that defines the event action.
// "EventOptions" is an optional parameter. It defaults to an empty object if not provided.
export function event(
  action: string,
  { category, label, value, nonInteraction, userId, ...otherOptions }: EventOptions = {},
): void {
  
  // If the gtag function does not exist in the current window, exit the function early.
  if (!window.gtag) {
    return;
  }

  // A new object is created based on the otherOptions object, which contains all properties of the EventOptions 
  // object not already destructured, including any user-added ones.
  const eventOptions: Record<string, any> & {
    event_category?: string;
    event_label?: string;
    value?: number;
    non_interaction?: boolean;
    user_id?: string;
  } = { ...otherOptions };

  // Check if category value exists and if so assign it to the event_category key in eventOptions.
  if (category !== undefined) {
    eventOptions.event_category = category;
  }

  // Check if label value exists and if so assign it to the event_label key in eventOptions.
  if (label !== undefined) {
    eventOptions.event_label = label;
  }

  // Check if value is defined and if so assign it to the value key in eventOptions.
  if (value !== undefined) {
    eventOptions.value = value;
  }

  // Check if nonInteraction is defined and if so assign it to the non_interaction key in eventOptions.
  if (nonInteraction !== undefined) {
    eventOptions.non_interaction = nonInteraction;
  }
  
  // Check if userId exists and if so assign it to the user_id key in eventOptions.
  if (userId !== undefined) {
    eventOptions.user_id = userId;
  }

  // Make call to Google Analytics' gtag function with event action and event options.
  window.gtag("event", action, eventOptions);
}
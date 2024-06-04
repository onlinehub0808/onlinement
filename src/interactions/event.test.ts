import { event } from "./event"; // Import the event function from the event module

// Save the current environment variables for later restoration
const OLD_ENV = process.env;

beforeEach(() => {
  // Mock console.warn to avoid real console warnings during tests
  console.warn = jest.fn();
  // Mock the window.gtag function to avoid real analytics calls during tests
  window.gtag = jest.fn();
  // Reset all loaded modules to ensure a clean slate for each test
  jest.resetModules();
  // Clear all mocks to reset their states
  jest.clearAllMocks();
  // Reset all mocks to their initial state
  jest.resetAllMocks();
  // Restore process.env to its original state before each test
  process.env = { ...OLD_ENV };
});

afterAll(() => {
  // Restore the original environment variables after all tests have run
  process.env = OLD_ENV;
});

// Define mock data for the tests
const mockEvent = "mock event";
const mockCategory = "mock category";
const mockLabel = "mock label";
const mockValue = 1;
const mockNonInteraction = true;
const mockUserId = "mock user id";

describe("options", () => {
  // Test case to ensure gtag is called with all provided options
  it("should call gtag with all the options", () => {
    event(mockEvent, {
      category: mockCategory,
      label: mockLabel,
      value: mockValue,
      nonInteraction: mockNonInteraction,
      userId: mockUserId,
    });

    // Check that window.gtag was called exactly once
    expect(window.gtag).toBeCalledTimes(1);
    // Check that window.gtag was called with the correct parameters
    expect(window.gtag).toHaveBeenCalledWith("event", mockEvent, {
      event_category: mockCategory,
      event_label: mockLabel,
      value: mockValue,
      non_interaction: mockNonInteraction,
      user_id: mockUserId,
    });
  });

  // Test case to ensure gtag is called with an empty object when no options are provided
  it("should call gtag with {} when no options given", () => {
    event(mockEvent);

    // Check that window.gtag was called exactly once
    expect(window.gtag).toBeCalledTimes(1);
    // Check that window.gtag was called with the correct parameters
    expect(window.gtag).toHaveBeenCalledWith("event", mockEvent, {});
  });

  // Test case to ensure gtag is called with the event category when only category is provided
  it("should call gtag with event_category when category given", () => {
    event(mockEvent, {
      category: mockCategory,
    });

    // Check that window.gtag was called exactly once
    expect(window.gtag).toBeCalledTimes(1);
    // Check that window.gtag was called with the correct parameters
    expect(window.gtag).toHaveBeenCalledWith("event", mockEvent, {
      event_category: mockCategory,
    });
  });

  // Test case to ensure gtag is called with the event label when only label is provided
  it("should call gtag with event_label when event_label given", () => {
    event(mockEvent, {
      label: mockLabel,
    });

    // Check that window.gtag was called exactly once
    expect(window.gtag).toBeCalledTimes(1);
    // Check that window.gtag was called with the correct parameters
    expect(window.gtag).toHaveBeenCalledWith("event", mockEvent, {
      event_label: mockLabel,
    });
  });

  // Test case to ensure gtag is called with the value when only value is provided
  it("should call gtag with value when value given", () => {
    event(mockEvent, {
      value: mockValue,
    });

    // Check that window.gtag was called exactly once
    expect(window.gtag).toBeCalledTimes(1);
    // Check that window.gtag was called with the correct parameters
    expect(window.gtag).toHaveBeenCalledWith("event", mockEvent, {
      value: mockValue,
    });
  });

  // Test case to ensure gtag is called with the user ID when only user ID is provided
  it("should call gtag with user_id when user_id given", () => {
    event(mockEvent, {
      userId: mockUserId,
    });

    // Check that window.gtag was called exactly once
    expect(window.gtag).toBeCalledTimes(1);
    // Check that window.gtag was called with the correct parameters
    expect(window.gtag).toHaveBeenCalledWith("event", mockEvent, {
      user_id: mockUserId,
    });
  });
});
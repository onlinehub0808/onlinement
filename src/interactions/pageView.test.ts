import { pageView } from "./pageView";

const OLD_ENV = process.env; // Store the original environment variables.
const mockGaMeasurementId = "mock"; // Define a mock Google Analytics Measurement ID.

beforeEach(() => {
  console.warn = jest.fn(); // Mock console.warn to prevent actual warnings during tests.
  window.gtag = jest.fn(); // Mock the global gtag function used for Google Analytics.
  jest.resetModules(); // Clear the module registry to ensure a fresh state.
  jest.clearAllMocks(); // Clear any mocked calls, instances, and results.
  jest.resetAllMocks(); // Reset all mocks to their initial state.
  process.env = { ...OLD_ENV }; // Reset process.env to the original environment variables.
});

afterAll(() => {
  process.env = OLD_ENV; // Restore the original environment variables after all tests.
});

describe("pageView", () => {
  const mockTitle = "mock title";
  const mockLocation = "mock location";
  const mockPath = "mock category";
  const mockSendPageView = true;
  const mockUserId = "mock user id";

  it("should not call gtag if measurement id is not set", () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = undefined;

    pageView();

    expect(window.gtag).not.toBeCalled();
  });

  describe("options", () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = mockGaMeasurementId;

    it("should call gtag with all the options", () => {
      pageView({
        title: mockTitle,
        location: mockLocation,
        path: mockPath,
        sendPageView: mockSendPageView,
        userId: mockUserId,
      });

      expect(window.gtag).toBeCalledTimes(1);
      expect(window.gtag).toHaveBeenCalledWith("config", mockGaMeasurementId, {
        page_title: mockTitle,
        page_location: mockLocation,
        page_path: mockPath,
        send_page_view: mockSendPageView,
        user_id: mockUserId,
      });
    });

    it("should call gtag without options", () => {
      pageView();

      expect(window.gtag).toBeCalledTimes(1);
      expect(window.gtag).toHaveBeenCalledWith(
        "config",
        mockGaMeasurementId,
        {}
      );
    });

    it("should call gtag with page_title when title given", () => {
      pageView({
        title: mockTitle,
      });

      expect(window.gtag).toBeCalledTimes(1);
      expect(window.gtag).toHaveBeenCalledWith("config", mockGaMeasurementId, {
        page_title: mockTitle,
      });
    });

    it("should call gtag with page_location when location given", () => {
      pageView({
        location: mockLocation,
      });

      expect(window.gtag).toBeCalledTimes(1);
      expect(window.gtag).toHaveBeenCalledWith("config", mockGaMeasurementId, {
        page_location: mockLocation,
      });
    });

    it("should call gtag with page_path when path given", () => {
      pageView({
        path: mockPath,
      });

      expect(window.gtag).toBeCalledTimes(1);
      expect(window.gtag).toHaveBeenCalledWith("config", mockGaMeasurementId, {
        page_path: mockPath,
      });
    });

    it("should call gtag with send_page_view when SendPageView", () => {
      pageView({
        sendPageView: mockSendPageView,
      });

      expect(window.gtag).toBeCalledTimes(1);
      expect(window.gtag).toHaveBeenCalledWith("config", mockGaMeasurementId, {
        send_page_view: mockSendPageView,
      });
    });

    it("should call gtag with user_id when userId", () => {
      pageView({
        userId: mockUserId,
      });

      expect(window.gtag).toBeCalledTimes(1);
      expect(window.gtag).toHaveBeenCalledWith("config", mockGaMeasurementId, {
        user_id: mockUserId,
      });
    });
  });
});

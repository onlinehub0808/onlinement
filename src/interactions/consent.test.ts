// Importing the "consent" function from the consent module
import { consent } from './consent'

// Defining mocked arguments for gtag function
const mockArg: Gtag.ConsentArg = 'default'
const mockParams: Gtag.ConsentParams = { ad_storage: 'denied', analytics_storage: 'denied' }

// Describing the test suite for the "consent" function
describe("consent", () => {
  // It checks if the "consent" function does not throw an error when gtag is not defined in the window object
  it("should not throw an error if gtag is not defined", () => {
    // Creating an action that will call "consent" function with a default argument and an empty parameters object.
    const action = () => consent({ arg: 'default', params: {} });
    // Expecting that the action does not throw any errors.
    expect(action).not.toThrow();
  });

  // It checks if the gtag function is being called properly from inside the "consent" function
  it("should call gtag with all the options", () => {
    // Mocking window.gtag function so its calls can be observed and asserted.
    window.gtag = jest.fn();
    // Calling "consent" function with mocked parameters.
    consent({ arg: mockArg, params: mockParams });
    // Expecting that window.gtag has been called once.
    expect(window.gtag).toBeCalledTimes(1);
    // Expecting that window.gtag has been called with the 'consent', mockArg, and mockParams.
    expect(window.gtag).toBeCalledWith('consent', mockArg, mockParams);
  });
})
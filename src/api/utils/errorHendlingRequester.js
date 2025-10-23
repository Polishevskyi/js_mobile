import Requester from './requester.js';
import ApiConstants from './constants.js';

export default class ErrorHandlingRequester {
  constructor() {
    this.requester = new Requester();
  }

  async requestExpectingError(
    endpointKey,
    { data = null, config = {}, expectedError }
  ) {
    try {
      await this.requester.request(endpointKey, { data, config });
    } catch (error) {
      const actualStatus = error.response?.status;
      const actualMessage = error.response?.data?.[expectedError.errorKey];

      if (actualStatus !== expectedError.statusCode) {
        throw new Error(
          ApiConstants.ERROR_MESSAGES.EXPECTED_STATUS_MISMATCH.replace(
            '{expected}',
            expectedError.statusCode
          ).replace('{actual}', actualStatus)
        );
      }

      if (actualMessage !== expectedError.errorMessage) {
        throw new Error(
          ApiConstants.ERROR_MESSAGES.EXPECTED_MESSAGE_MISMATCH.replace(
            '{expected}',
            expectedError.errorMessage
          ).replace('{actual}', actualMessage)
        );
      }
    }
  }
}

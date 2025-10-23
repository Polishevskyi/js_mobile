export default class ApiConstants {
  static HEADERS = {
    CONTENT_TYPE: 'application/json',
    ACCEPT: 'application/json',
  };

  static DATA_RANGES = {
    PET_ID: {
      MIN: 1,
      MAX: 999999,
    },
    CATEGORY_ID: {
      MIN: 1,
      MAX: 100,
    },
    NEGATIVE_ID: {
      MIN: -100,
      MAX: -1,
    },
  };

  static STRING_LENGTHS = {
    VERY_LONG_NAME: 20,
    VERY_LONG_CATEGORY_NAME: 15,
  };

  static ERROR_MESSAGES = {
    INVALID_INPUT: 'Invalid input',
    ENDPOINT_NOT_FOUND: 'Endpoint "{endpointKey}" not found',
    REQUEST_FAILED: 'Request failed with status {status}',
    EXPECTED_STATUS_MISMATCH: 'Expected status {expected}, but got {actual}',
    EXPECTED_MESSAGE_MISMATCH:
      'Expected message "{expected}", but got "{actual}"',
  };

  static DEFAULT_HTTP_METHOD = 'post';

  static NEGATIVE_TEST_KEYS = {
    EMPTY_NAME: 'emptyName',
    EMPTY_PHOTO_URLS: 'emptyPhotoUrls',
    INVALID_STATUS: 'invalidStatus',
    TOO_LONG_NAME: 'tooLongName',
    TOO_LONG_CATEGORY_NAME: 'tooLongCategoryName',
    MULTIPLE_VALIDATION_ERRORS: 'multipleValidationErrors',
    MISSING_NAME: 'missingName',
    MISSING_PHOTO_URLS: 'missingPhotoUrls',
  };
}

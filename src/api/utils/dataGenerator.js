import { faker } from '@faker-js/faker';
import ApiConstants from './constants.js';

class DataGenerator {
  static generatePet() {
    return {
      id: faker.number.int({
        min: ApiConstants.DATA_RANGES.PET_ID.MIN,
        max: ApiConstants.DATA_RANGES.PET_ID.MAX,
      }),
      name: faker.animal.dog(),
      status: faker.helpers.arrayElement(['available', 'pending', 'sold']),
    };
  }

  static generatePetUpdateData() {
    return {
      name: faker.animal.dog(),
      status: faker.helpers.arrayElement(['available', 'pending', 'sold']),
    };
  }

  static generateInvalidPetData() {
    return {
      [ApiConstants.NEGATIVE_TEST_KEYS.EMPTY_NAME]: () => ({
        id: faker.number.int({
          min: ApiConstants.DATA_RANGES.PET_ID.MIN,
          max: ApiConstants.DATA_RANGES.PET_ID.MAX,
        }),
        name: '',
        category: {
          id: faker.number.int({
            min: ApiConstants.DATA_RANGES.CATEGORY_ID.MIN,
            max: ApiConstants.DATA_RANGES.CATEGORY_ID.MAX,
          }),
          name: faker.animal.type(),
        },
        photoUrls: [faker.image.url()],
        status: faker.helpers.arrayElement(['available', 'pending', 'sold']),
      }),

      [ApiConstants.NEGATIVE_TEST_KEYS.EMPTY_PHOTO_URLS]: () => ({
        id: faker.number.int({
          min: ApiConstants.DATA_RANGES.PET_ID.MIN,
          max: ApiConstants.DATA_RANGES.PET_ID.MAX,
        }),
        name: faker.animal.dog(),
        category: {
          id: faker.number.int({
            min: ApiConstants.DATA_RANGES.CATEGORY_ID.MIN,
            max: ApiConstants.DATA_RANGES.CATEGORY_ID.MAX,
          }),
          name: faker.animal.type(),
        },
        photoUrls: [],
        status: faker.helpers.arrayElement(['available', 'pending', 'sold']),
      }),

      [ApiConstants.NEGATIVE_TEST_KEYS.INVALID_STATUS]: () => ({
        id: faker.number.int({
          min: ApiConstants.DATA_RANGES.PET_ID.MIN,
          max: ApiConstants.DATA_RANGES.PET_ID.MAX,
        }),
        name: faker.animal.dog(),
        category: {
          id: faker.number.int({
            min: ApiConstants.DATA_RANGES.CATEGORY_ID.MIN,
            max: ApiConstants.DATA_RANGES.CATEGORY_ID.MAX,
          }),
          name: faker.animal.type(),
        },
        photoUrls: [faker.image.url()],
        status: faker.lorem.word(),
      }),

      [ApiConstants.NEGATIVE_TEST_KEYS.TOO_LONG_NAME]: () => ({
        id: faker.number.int({
          min: ApiConstants.DATA_RANGES.PET_ID.MIN,
          max: ApiConstants.DATA_RANGES.PET_ID.MAX,
        }),
        name: faker.lorem.words(ApiConstants.STRING_LENGTHS.VERY_LONG_NAME),
        category: {
          id: faker.number.int({
            min: ApiConstants.DATA_RANGES.CATEGORY_ID.MIN,
            max: ApiConstants.DATA_RANGES.CATEGORY_ID.MAX,
          }),
          name: faker.animal.type(),
        },
        photoUrls: [faker.image.url()],
        status: faker.helpers.arrayElement(['available', 'pending', 'sold']),
      }),

      [ApiConstants.NEGATIVE_TEST_KEYS.TOO_LONG_CATEGORY_NAME]: () => ({
        id: faker.number.int({
          min: ApiConstants.DATA_RANGES.PET_ID.MIN,
          max: ApiConstants.DATA_RANGES.PET_ID.MAX,
        }),
        name: faker.animal.dog(),
        category: {
          id: faker.number.int({
            min: ApiConstants.DATA_RANGES.CATEGORY_ID.MIN,
            max: ApiConstants.DATA_RANGES.CATEGORY_ID.MAX,
          }),
          name: faker.lorem.words(
            ApiConstants.STRING_LENGTHS.VERY_LONG_CATEGORY_NAME
          ),
        },
        photoUrls: [faker.image.url()],
        status: faker.helpers.arrayElement(['available', 'pending', 'sold']),
      }),

      [ApiConstants.NEGATIVE_TEST_KEYS.MULTIPLE_VALIDATION_ERRORS]: () => ({
        id: faker.number.int({
          min: ApiConstants.DATA_RANGES.NEGATIVE_ID.MIN,
          max: ApiConstants.DATA_RANGES.NEGATIVE_ID.MAX,
        }),
        name: '',
        category: {
          id: faker.number.int({
            min: ApiConstants.DATA_RANGES.NEGATIVE_ID.MIN,
            max: ApiConstants.DATA_RANGES.NEGATIVE_ID.MAX,
          }),
          name: '',
        },
        photoUrls: [],
        status: faker.lorem.word(),
      }),

      [ApiConstants.NEGATIVE_TEST_KEYS.MISSING_NAME]: () => ({
        id: faker.number.int({
          min: ApiConstants.DATA_RANGES.PET_ID.MIN,
          max: ApiConstants.DATA_RANGES.PET_ID.MAX,
        }),
        category: {
          id: faker.number.int({
            min: ApiConstants.DATA_RANGES.CATEGORY_ID.MIN,
            max: ApiConstants.DATA_RANGES.CATEGORY_ID.MAX,
          }),
          name: faker.animal.type(),
        },
        photoUrls: [faker.image.url()],
        status: faker.helpers.arrayElement(['available', 'pending', 'sold']),
      }),

      [ApiConstants.NEGATIVE_TEST_KEYS.MISSING_PHOTO_URLS]: () => ({
        id: faker.number.int({
          min: ApiConstants.DATA_RANGES.PET_ID.MIN,
          max: ApiConstants.DATA_RANGES.PET_ID.MAX,
        }),
        name: faker.animal.dog(),
        category: {
          id: faker.number.int({
            min: ApiConstants.DATA_RANGES.CATEGORY_ID.MIN,
            max: ApiConstants.DATA_RANGES.CATEGORY_ID.MAX,
          }),
          name: faker.animal.type(),
        },
        status: faker.helpers.arrayElement(['available', 'pending', 'sold']),
      }),
    };
  }
}

export default DataGenerator;

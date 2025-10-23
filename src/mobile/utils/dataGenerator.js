import { faker } from '@faker-js/faker';

class MobileDataGenerator {
  static generateInvalidCredentials() {
    return {
      invalidUsername: faker.internet.email(),
      invalidPassword: faker.internet.password(),
      randomUsername: faker.internet.userName(),
      randomPassword: faker.internet.password({ length: 15 }),
    };
  }
}

export default MobileDataGenerator;

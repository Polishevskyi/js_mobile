import { expect } from 'chai';
import HTTP_STATUS from '../../src/api/utils/httpStatus.js';
import { PetSteps } from '../../src/api/steps/petSteps.js';

describe('API - Delete Pet Tests', () => {
  it('Verify that pet can be deleted successfully by ID', async () => {
    const { responseData: createdPet } = await PetSteps.createPet();
    const { status } = await PetSteps.deletePet(createdPet.id);

    expect(status).to.equal(HTTP_STATUS.OK);
  });
});

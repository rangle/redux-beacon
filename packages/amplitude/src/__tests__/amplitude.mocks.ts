export const instanceMock = {
  setUserId: jest.fn(),
  setUserProperties: jest.fn(),
  clearUserProperties: jest.fn(),
  logEvent: jest.fn(),
  setGroup: jest.fn(),
  regenerateDeviceId: jest.fn(),
  setOptOut: jest.fn(),
  setVersionName: jest.fn(),
  identify: jest.fn(),
  logRevenueV2: jest.fn(),
};

const identityMock = {
  add: jest.fn(),
  set: jest.fn(),
  setOnce: jest.fn(),
  unset: jest.fn(),
  append: jest.fn(),
  prepend: jest.fn(),
};
const revenueMock = {
  setProductId: jest.fn(),
  setPrice: jest.fn(),
  setQuantity: jest.fn(),
  setRevenueType: jest.fn(),
  setEventProperties: jest.fn(),
};

const amplitudeSDKMock = {
  getInstance: () => instanceMock,
  Identify: () => identityMock,
  Revenue: () => revenueMock,
  logRevenueV2: jest.fn(),
};

export function resetAllMocks() {
  [instanceMock, identityMock, revenueMock, amplitudeSDKMock].forEach(
    (mockObj: any) => {
      Object.keys(mockObj).forEach(key => {
        if (typeof mockObj[key].mockReset === 'function') {
          mockObj[key].mockReset();
        }
      });
    }
  );
}

export default amplitudeSDKMock;

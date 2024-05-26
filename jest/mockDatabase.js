export const mockReadAll = jest.fn();
export const mockExecuteProcedure = jest.fn();
export const mockReadAndConditions = jest.fn();
export const mockReadStringId = jest.fn();

export const mockDatabase = {
    readAll: mockReadAll,
    executeProcedure: mockExecuteProcedure,
    readAndConditions: mockReadAndConditions,
    readStringId: mockReadStringId,
};

export function clearMocks() {
    mockReadAll.mockClear();
    mockExecuteProcedure.mockClear();
    mockReadAndConditions.mockClear();
    mockReadStringId.mockClear();
}

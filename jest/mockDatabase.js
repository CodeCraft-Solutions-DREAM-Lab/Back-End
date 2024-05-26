export const mockReadAll = jest.fn();
export const mockExecuteProcedure = jest.fn();
export const mockReadAndConditions = jest.fn();
export const mockReadStringId = jest.fn();
export const mockUpdateTwo = jest.fn();
export const mockCreate = jest.fn();
export const mockRead = jest.fn();
export const mockUpdate = jest.fn();
export const mockDelete = jest.fn();
export const mockExecuteQuery = jest.fn();

export const mockDatabase = {
    readAll: mockReadAll,
    executeProcedure: mockExecuteProcedure,
    readAndConditions: mockReadAndConditions,
    readStringId: mockReadStringId,
    updateTwo: mockUpdateTwo,
    create: mockCreate,
    read: mockRead,
    update: mockUpdate,
    delete: mockDelete,
    executeQuery: mockExecuteQuery,
};

export function clearMocks() {
    mockReadAll.mockClear();
    mockExecuteProcedure.mockClear();
    mockReadAndConditions.mockClear();
    mockReadStringId.mockClear();
    mockUpdateTwo.mockClear();
    mockCreate.mockClear();
    mockRead.mockClear();
    mockUpdate.mockClear();
    mockDelete.mockClear();
    mockExecuteQuery.mockClear();
}

export const mockReadAll = jest.fn();
export const mockExecuteProcedure = jest.fn();

export const mockDatabase = {
    readAll: mockReadAll,
    executeProcedure: mockExecuteProcedure,
};

export function clearMocks() {
    mockReadAll.mockClear();
    mockExecuteProcedure.mockClear();
}

export default {
    transform: {
        "^.+\\.js$": "babel-jest",
    },
    testEnvironment: "node",
    moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    setupFilesAfterEnv: ["<rootDir>/jest/nullOrAny.js"],
};
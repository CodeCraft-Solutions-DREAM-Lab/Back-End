import { readdir, readFile, writeFile } from "fs/promises";
import { join, extname, dirname } from "path";
import { fileURLToPath } from "url";

// Helper to convert file URL to path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directories containing the .sql files
const setupDirectoryPath = join(__dirname, "setup");
const storedProceduresDirectoryPath = join(__dirname, "stored_procedures");
const mockDataDirectoryPath = join(__dirname, "mock_data");
const triggersDirectoryPath = join(__dirname, "triggers");

// Output file
const outputPath = join(__dirname, "combined.sql");

async function combineSqlFiles() {
    try {
        let combinedContent = "";

        // Read and combine the contents of the setup files
        const setupFiles = await readdir(setupDirectoryPath);
        const sortedSetupFiles = setupFiles
            .filter((file) => extname(file) === ".sql")
            .sort();
        for (const file of sortedSetupFiles) {
            const filePath = join(setupDirectoryPath, file);
            const fileContent = await readFile(filePath, "utf-8");
            combinedContent += fileContent + "\nGO;\n";
        }

        // Read and combine the contents of the triggers files
        const triggersFiles = await readdir(triggersDirectoryPath);
        const sortedTriggersFiles = triggersFiles
            .filter((file) => extname(file) === ".sql")
            .sort();
        for (const file of sortedTriggersFiles) {
            const filePath = join(triggersDirectoryPath, file);
            const fileContent = await readFile(filePath, "utf-8");
            combinedContent += fileContent + "\nGO;\n";
        }

        // Read and combine the contents of the mock data files
        const mockDataFiles = await readdir(mockDataDirectoryPath);
        const sortedMockDataFiles = mockDataFiles
            .filter((file) => extname(file) === ".sql")
            .sort();
        for (const file of sortedMockDataFiles) {
            const filePath = join(mockDataDirectoryPath, file);
            const fileContent = await readFile(filePath, "utf-8");
            combinedContent += fileContent + "\nGO;\n";
        }

        // Read and combine the contents of the stored procedures files
        const storedProceduresFiles = await readdir(
            storedProceduresDirectoryPath
        );
        const sortedStoredProceduresFiles = storedProceduresFiles
            .filter((file) => extname(file) === ".sql")
            .sort();
        for (const file of sortedStoredProceduresFiles) {
            const filePath = join(storedProceduresDirectoryPath, file);
            const fileContent = await readFile(filePath, "utf-8");
            combinedContent += fileContent + "\nGO;\n";
        }

        // Write the combined content to the output file
        await writeFile(outputPath, combinedContent, "utf-8");

        console.log(`Archivos SQL combinados en: "${outputPath}"`);
    } catch (err) {
        console.error("Error:", err);
    }
}

combineSqlFiles();

import sql from "mssql";

export default class Database {
    config = {};
    poolconnection = null;
    connected = false;

    constructor(config) {
        this.config = config;
        console.log(`Database: config: ${JSON.stringify(config)}`);
    }

    async connect() {
        try {
            console.log(`Database connected: ${this.connected}`);
            if (this.connected === false) {
                this.poolconnection = await sql.connect(this.config);
                this.connected = true;
                console.log("Database connection successful");
            }
        } catch (error) {
            console.log(error);
            console.error(
                `Error connecting to database: ${JSON.stringify(error)}`
            );
        }
    }

    async disconnect() {
        try {
            this.poolconnection.close();
            console.log("Database connection closed");
        } catch (error) {
            console.error(`Error closing database connection: ${error}`);
        }
    }

    async executeQuery(query) {
        await this.connect();
        const request = this.poolconnection.request();
        const result = await request.query(query);

        return result;
    }

    async create(tableName, data) {
        await this.connect();
        const request = this.poolconnection.request();

        for (const key in data) {
            console.log(`key: ${key}`);
            let type = sql.Int;
            if (typeof data[key] === "number") {
                type = sql.Int;
            }
            if (typeof data[key] === "string") {
                type = sql.NVarChar(255);
            }
            console.log(`type: ${type}`);

            request.input(key, type, data[key]);
            console.log("------- Sí se pudo --------");
        }

        console.log(`data: ${JSON.stringify(data)}`);
        const columns = Object.keys(data).join(", ");
        const values = Object.keys(data)
            .map((key) => "@" + key)
            .join(", ");
        console.log(`columns: ${columns}`);
        console.log(`values: ${values}`);
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;

        const result = await request.query(query);

        return result.rowsAffected[0];
    }

    async readAll(tableName) {
        await this.connect();
        const request = this.poolconnection.request();
        const result = await request.query(`SELECT * FROM ${tableName}`);

        return result.recordsets[0];
    }

    async read(tableName, idName, id) {
        await this.connect();

        const request = this.poolconnection.request();
        const result = await request
            .input("id", sql.Int, +id)
            .query(`SELECT * FROM ${tableName} WHERE ${idName} = @id`);

        return result.recordset[0];
    }

    async readStringId(tableName, idName, id) {
        await this.connect();

        const request = this.poolconnection.request();
        const result = await request
            .input("id", sql.NVarChar, id)
            .query(`SELECT * FROM ${tableName} WHERE ${idName} = @id`);

        return result.recordset[0];
    }

    async readAndConditions(tableName, conditions, returnValues = "*") {
        await this.connect();

        const request = this.poolconnection.request();

        // Create the SQL query string
        const query = conditions
            .map((condition, index) => `${condition.idName} = @id${index}`)
            .join(" AND ");

        // Add the inputs
        conditions.forEach((condition, index) => {
            request.input(`id${index}`, sql.NVarChar, condition.id);
        });

        const result = await request.query(
            `SELECT ${returnValues} FROM ${tableName} WHERE ${query}`
        );

        return result.recordset[0];
    }

    async update(tableName, idName, id, data) {
        await this.connect();
        const request = this.poolconnection.request();

        request.input("id", sql.Int, +id);
        for (const key in data) {
            let type;
            if (typeof data[key] === "number") {
                type = sql.Int;
            }
            if (typeof data[key] === "string") {
                type = sql.NVarChar(255);
            }

            request.input(key, type, data[key]);
        }

        const setClauses = Object.keys(data)
            .map((key) => `${key} = @${key}`)
            .join(", ");
        const query = `UPDATE ${tableName} SET ${setClauses} WHERE ${idName} = @id`;

        const result = await request.query(query);

        return result.rowsAffected[0];
    }

    async delete(tableName, idName, id) {
        await this.connect();

        const idAsNumber = Number(id);

        const request = this.poolconnection.request();
        const result = await request
            .input("id", sql.Int, idAsNumber)
            .query(`DELETE FROM ${tableName} WHERE ${idName} = @id`);

        return result.rowsAffected[0];
    }
}

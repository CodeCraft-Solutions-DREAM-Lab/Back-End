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

    async executeProcedure(procedureName, parameters) {
        await this.connect();
        const request = this.poolconnection.request();

        for (const key in parameters) {
            let type = sql.Int;
            if (typeof parameters[key] === "number") {
                type = sql.Int;
            }
            if (typeof parameters[key] === "string") {
                type = sql.NVarChar(255);
            }

            request.input(key, type, parameters[key]);
        }

        const result = await request.execute(procedureName);

        return result.recordset;
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

        if (typeof id === "number") {
            request.input("id", sql.Int, +id);
        }
        if (typeof id === "string") {
            request.input("id", sql.NVarChar, id.toString());
        }

        for (const key in data) {

            let type;
            if (typeof data[key] === "number") {
                type = sql.Int;
            }
            if (typeof data[key] === "string") {
                type = sql.NVarChar(255);
            }

            request.input(key, type, data[key]);
            console.log("Data key = " + data[key]);
        }

        const setClauses = Object.keys(data)
            .map((key) => `${key} = @${key}`)
            .join(", ");
        const query = `UPDATE ${tableName} SET ${setClauses} WHERE ${idName} = @id`;

        const result = await request.query(query);

        return result.rowsAffected[0];
    }

    /*
router.put("/:idUsuario/:idLogro", async (req, res) => {
    try {
        const usuarioId = req.params.idUsuario;
        const logroId = req.params.idLogro;
        console.log(`usuarioId: ${usuarioId}`);
        console.log(`logroId: ${logroId}`);

        const valor = req.body;

        const rowsAffected = await database.updateMultiple(
            2, // Número de variables a considerar al hacer select
            "UsuariosLogros",
            "idUsuario",
            "idLogro",
            usuarioId,
            logroId,
            valor
        );
        res.status(200).json({ rowsAffected });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});*/ 

    async updateTwo(tableName, idName1, idName2, id1, id2, data) {
        await this.connect();
        const request = this.poolconnection.request();

        if (typeof id1 === "number") {
            request.input("id1", sql.Int, +id1);
        } else {
            request.input("id1", sql.NVarChar, id1.toString());
        }

        if (typeof id2 === "number") {
            request.input("id2", sql.Int, +id2);
        } else {
            request.input("id2", sql.NVarChar, id2.toString());
        }

        for (const key in data) {
            let type;
            if (typeof data[key] === "number") {
                type = sql.Int;
            }
            if (typeof data[key] === "string") {
                type = sql.NVarChar(255);
            }
            if(typeof data[key] === "boolean") {
                type = sql.Bit;
            }

            request.input(key, type, data[key]);
        }

        const setClauses = Object.keys(data)
            .map((key) => `${key} = @${key}`)
            .join(", ");
        const query = `UPDATE ${tableName} SET ${setClauses} WHERE ${idName1} = @id1 AND ${idName2} = @id2`;
        console.log(`query logro: ${query}`);

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

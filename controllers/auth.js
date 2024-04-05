import sha512 from "js-sha512";
import { config } from "../config.js";
import Database from "../database.js";

// Create database object
const database = new Database(config);

export async function authUsuario(req, res, next) {
  try {
    const { usuario, contrasena } = req.body;
    const shaPasword = sha512(String(contrasena));

    const result = await database.readAndConditions(
      "Credenciales",
      [
        { idName: "idUsuario", id: usuario },
        { idName: "contrasena", id: shaPasword },
      ],
      "token"
    );

    if (result.length === 0) {
      res.status(404).json(result);
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({});
  }
}

export async function authToken(req, res, next) {
  const { token } = req.body;

  console.log(token);

  try {
    const result = await database.readStringId("Credenciales", "token", token);

    if (result.length === 0) {
      res.status(404).json(false);
    } else {
      res.status(200).json(true);
    }
  } catch (err) {
    res.status(500).json(false);
  }
}

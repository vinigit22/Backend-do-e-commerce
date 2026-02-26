import jwt from "jsonwebtoken";

const secret = "amigurumidw"; // coloque algo forte

export function gerarToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verificarToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
}

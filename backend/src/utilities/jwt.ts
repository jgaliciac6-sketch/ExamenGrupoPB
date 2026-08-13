import jwt from "jsonwebtoken";

interface JWTPayload {
  EMPId: number;
  EMPNombre: string;
  EMPDpi: string;
  EMPEstado: boolean;
  // nombre: string;
  // rolId: number;
  // sucId: number;
}

export const generateJWT = (payload: JWTPayload): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  return token;
};

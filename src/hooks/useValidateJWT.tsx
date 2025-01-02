import { useEffect, useState } from "react";

interface DecodedToken {
  userId: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

interface ValidationResult {
  isValid: boolean;
  error: string;
  decodedToken: DecodedToken | null;
  loading: boolean;
}

export const useValidateJWT = (
  token: string | undefined | null,
): ValidationResult => {
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: false,
    error: "",
    decodedToken: null,
    loading: true,
  });

  useEffect(() => {
    const validateToken = () => {
      if (typeof token === "undefined" || token === null) {
        setValidationResult((prev) => ({
          ...prev,
          loading: true,
        }));
        return;
      }

      try {
        // Split the token into its three parts
        const parts = token.split(".");

        // Check if we have exactly 3 parts
        if (parts.length !== 3) {
          setValidationResult({
            isValid: false,
            error: "Invalid token format: Token must have three parts",
            decodedToken: null,
            loading: false,
          });
          return;
        }

        const [header, payload, signature] = parts;

        // Check if any part is empty
        if (!header || !payload || !signature) {
          setValidationResult({
            isValid: false,
            error: "Invalid token format: Missing required parts",
            decodedToken: null,
            loading: false,
          });
          return;
        }

        // Validate header format
        try {
          const decodedHeader = JSON.parse(
            Buffer.from(header, "base64").toString(),
          );
          if (!decodedHeader.alg || !decodedHeader.typ) {
            throw new Error("Invalid header format");
          }
        } catch {
          setValidationResult({
            isValid: false,
            error: "Invalid token header",
            decodedToken: null,
            loading: false,
          });
          return;
        }

        // Validate signature exists and has correct format
        if (signature.length < 43) {
          // Minimum length for a valid HS256 signature
          setValidationResult({
            isValid: false,
            error: "Invalid token signature",
            decodedToken: null,
            loading: false,
          });
          return;
        }

        // Decode and validate payload
        try {
          const decodedPayload = JSON.parse(
            Buffer.from(payload, "base64").toString(),
          ) as DecodedToken;

          // Validate required fields
          if (
            !decodedPayload.userId ||
            !decodedPayload.email ||
            !decodedPayload.role
          ) {
            setValidationResult({
              isValid: false,
              error: "Invalid token payload: Missing required fields",
              decodedToken: null,
              loading: false,
            });
            return;
          }

          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(decodedPayload.email)) {
            setValidationResult({
              isValid: false,
              error: "Invalid email format in token",
              decodedToken: null,
              loading: false,
            });
            return;
          }

          // Check expiration
          if (decodedPayload.exp && decodedPayload.exp * 1000 < Date.now()) {
            setValidationResult({
              isValid: false,
              error: "Token has expired",
              decodedToken: null,
              loading: false,
            });
            return;
          }

          // All validations passed
          setValidationResult({
            isValid: true,
            error: "",
            decodedToken: decodedPayload,
            loading: false,
          });
        } catch (err) {
          setValidationResult({
            isValid: false,
            error: "Invalid token payload format",
            decodedToken: null,
            loading: false,
          });
          console.error(err);
        }
      } catch (err) {
        console.error("Token validation error:", err);
        setValidationResult({
          isValid: false,
          error: "Invalid token structure",
          decodedToken: null,
          loading: false,
        });
      }
    };

    validateToken();
  }, [token]);

  return validationResult;
};

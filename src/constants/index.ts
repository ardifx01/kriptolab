// BASE URL
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const API_URL = BACKEND_URL + "/api";
export const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
export const INDODAX_URL = process.env.NEXT_PUBLIC_INDODAX_URL;

// PINATA
export const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
export const PINATA_GATEWAY = process.env.NEXT_PUBLIC_GATEWAY_URL;

// AUTH
export const API_REGISTER = `${API_URL}/auth/register`;
export const API_LOGIN = `${API_URL}/auth/login`;
export const API_GOOGLE_LOGIN = `${API_URL}/auth/google`;
export const API_FORGOT_PASSWORD = `${API_URL}/auth/forgot-password`;
export const API_RESET_PASSWORD = `${API_URL}/auth/reset-password`;

// USER
export const API_PROFILE = `${API_URL}/user/profile`;
export const API_EDIT_PASSWORD = `${API_URL}/user/password`;
export const API_SUPPORT = `${API_URL}/user/support`;

// INDODAX
export const API_PAIRS = `${API_URL}/indodax/pairs`;
export const API_SUMMARIES = `${API_URL}/indodax/summaries`;
export const API_VOLUME = `${API_URL}/indodax/volume`;

// PORTFOLIO
export const API_PORTFOLIO = `${API_URL}/portfolio`;
export const API_PORTFOLIO_HISTORY = `${API_URL}/portfolio/history`;
export const API_PORTFOLIO_ASSET_IDR_VALUE = `${API_URL}/portfolio/asset-idr-value`;

// TRANSACTION
export const API_DEPOSIT = `${API_URL}/transaction/deposit`;
export const API_BUY = `${API_URL}/transaction/buy`;
export const API_SELL = `${API_URL}/transaction/sell`;
export const API_WITHDRAW = `${API_URL}/transaction/withdraw`;
export const API_TRANSACTION_HISTORY = `${API_URL}/transaction`;
export const API_TOKEN_TRANSACTION_HISTORY = `${API_URL}/transaction/token`;

// NEWS
export const API_NEWS = `${API_URL}/news`;

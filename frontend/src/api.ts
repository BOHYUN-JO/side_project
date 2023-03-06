export const KAKAO_REDIRECT_URI = `http://localhost:3000/oauth/kakao/callback`;
export const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

export const KAKAO_REDIRECT_URI = `http://localhost:3000/oauth/kakao/callback`;
export const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

export const NAVER_REDIRECT_URI = `http://localhost:3000/oauth/naver/callback`;
export const NAVER_AUTH_URI = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
  process.env.REACT_APP_NAVER_CLIENT_ID
}&state=${`${Math.random().toString(36).substr(3, 14)}`}&redirect_uri=${NAVER_REDIRECT_URI}`;

export const NATIONAL_TAX_SERVICE_BASE_URL = `https://api.odcloud.kr/api/nts-businessman/v1`;
export const NATIONAL_TAX_SERVICE_STATUS_API_URL = `${NATIONAL_TAX_SERVICE_BASE_URL}/status?serviceKey=${process.env.REACT_APP_NATIONAL_TAX_SERVICE_KEY}`;

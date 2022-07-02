export interface LineTokenInfo {
  access_token: string,
  expires_in: number,
  id_token: string,
  refresh_token: string,
  scope: string,
  token_type: string
}

export interface IdToken {
  amr: string[],
  aud: string,
  exp: number,
  iat: number,
  iss: string,
  name: string,
  sub: string
}

export interface LineUserInfo {
  sub: string,
  name: string,
  picture: string
}

export interface LineUserProfile {
  userId: String,
  displayName: string,
  pictureUrl: string,
  statusMessage: string
}

export interface User {
    id?: number,
    name?: string,
    email: string,
    password?: any,
    email_verified_at?: any
    created_at?: any
    updated_at?: any,
  }
  
  export interface Token {
    access_token: any,
    token_type: string,
    expires_in: number,
    user: User;
  }
  
  /*FAKE*/
  export enum roles {
    Admin = 'is_admin',
    User = 'user',
    Guest = 'guest'
  }
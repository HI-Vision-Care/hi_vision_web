// lib/actions/auth.action.ts

export type SignUpParams = {
  uid: string;
  name: string;
  email: string;
  password: string;
};

export type SignInParams = {
  email: string;
  idToken: string;
};

export type AuthResult = {
  success: boolean;
  message: string;
};

export async function signUp(params: SignUpParams): Promise<AuthResult> {
  console.log("📝 [auth.action] signUp called with:", {
    uid: params.uid,
    name: params.name,
    email: params.email,
    password: params.password,
  });
  // TODO: thay bằng logic backend thật
  return {
    success: true,
    message: "Mock sign-up successful",
  };
}

export async function signIn(params: SignInParams): Promise<AuthResult> {
  console.log("📝 [auth.action] signIn called with:", {
    email: params.email,
    idToken: params.idToken,
  });
  // TODO: thay bằng logic backend thật
  return {
    success: true,
    message: "Mock sign-in successful",
  };
}

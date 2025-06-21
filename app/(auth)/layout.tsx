import { ReactNode } from "react";

// import { isAuthenticated } from "@/lib/actions/auth.action";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  // const isUserAuthenticated = await isAuthenticated();
  // if (isUserAuthenticated) redirect("/");

  return <div className="">{children}</div>;
};

export default AuthLayout;

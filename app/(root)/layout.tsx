import { ReactNode } from "react";

// import { isAuthenticated } from "@/lib/actions/auth.action";

const Layout = async ({ children }: { children: ReactNode }) => {
  //   const isUserAuthenticated = await isAuthenticated();
  //   if (!isUserAuthenticated) redirect("/sign-in");

  return <div className="root-layout">{children}</div>;
};

export default Layout;

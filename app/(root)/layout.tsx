import { Footer, HeaderHome } from "@/components/home";
import { ReactNode } from "react";

// import { isAuthenticated } from "@/lib/actions/auth.action";

const Layout = async ({ children }: { children: ReactNode }) => {
  //   const isUserAuthenticated = await isAuthenticated();
  //   if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout ">
      <div className="container w-[80%] !m-auto">
        <HeaderHome />

        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;

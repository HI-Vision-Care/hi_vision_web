import { ReactNode } from "react";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

// import { isAuthenticated } from "@/lib/actions/auth.action";

const Layout = async ({ children }: { children: ReactNode }) => {
  //   const isUserAuthenticated = await isAuthenticated();
  //   if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout ">
      <div className="container w-[80%] !m-auto">
        <Header />

        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;

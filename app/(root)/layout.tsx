import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// import { isAuthenticated } from "@/lib/actions/auth.action";

const Layout = async ({ children }: { children: ReactNode }) => {
  //   const isUserAuthenticated = await isAuthenticated();
  //   if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
      <Header />

      {children}

      <Footer />
    </div>
  );
};

export default Layout;

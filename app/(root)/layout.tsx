import { ReactNode } from "react";
<<<<<<< Updated upstream
import Header from "@/components/Header";
import Footer from "@/components/Footer";
=======
import { redirect } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
>>>>>>> Stashed changes

// import { isAuthenticated } from "@/lib/actions/auth.action";

const Layout = async ({ children }: { children: ReactNode }) => {
  //   const isUserAuthenticated = await isAuthenticated();
  //   if (!isUserAuthenticated) redirect("/sign-in");

  return (
<<<<<<< Updated upstream
    <div className="root-layout">
      <Header />

      {children}

=======
    <div className="root-layout bg-gradient-to-tr from-blue-100 via-slate-50 to-indigo-100 min-h-screen">
      <div className="container w-[80%] !m-auto">
        <Header />

        {children}
      </div>
>>>>>>> Stashed changes
      <Footer />
    </div>
  );
};

export default Layout;

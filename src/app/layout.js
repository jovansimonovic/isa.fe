"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ListActionProvider } from "@/contexts/listActionContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container py-3">
          <Header />
          <main>
            <ListActionProvider>{children}</ListActionProvider>
          </main>
          <Footer />
          <ToastContainer />
        </div>
      </body>
    </html>
  );
}

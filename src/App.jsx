import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useLenis, scrollToTop } from "@/lib/useLenis";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ErrorBoundary from "@/components/ErrorBoundary";
import Home from "@/pages/Home";
import Solutions from "@/pages/Solutions";
import SolutionDetail from "@/pages/SolutionDetail";
import Industries from "@/pages/Industries";
import IndustryDetail from "@/pages/IndustryDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollToTop();
  }, [pathname]);
  return null;
}

function SiteLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function App() {
  useLenis();
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <ScrollToTop />
          <Cursor />
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/solutions/:slug" element={<SolutionDetail />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/industries/:slug" element={<IndustryDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
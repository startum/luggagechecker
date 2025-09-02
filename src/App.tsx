
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Results from "./pages/Results";
import Compare from "./pages/Compare";
import BookFlights from "./pages/BookFlights";
import BookHotels from "./pages/BookHotels";
import Article from "./pages/Article";
import SingleArticle from "./pages/SingleArticle";
import About from "./pages/About";
import BagSizer from "./pages/BagSizer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/results" element={<Results />} />
          <Route path="/results/:airlineId" element={<Results />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/book-flights" element={<BookFlights />} />
          <Route path="/book-hotels" element={<BookHotels />} />
          <Route path="/article" element={<Article />} />
          <Route path="/article/:slug" element={<SingleArticle />} />
          <Route path="/bag-sizer" element={<BagSizer />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/favorites" element={<Results />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

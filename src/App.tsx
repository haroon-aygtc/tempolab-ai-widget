import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "./components/ui/toaster";

// Lazy load pages for better performance
const Dashboard = lazy(() => import("./pages/dashboard"));
const Widgets = lazy(() => import("./pages/widgets"));
const AIProviders = lazy(() => import("./pages/ai-providers"));
const EmbedCode = lazy(() => import("./pages/embed-code"));
const WidgetDesigner = lazy(() => import("./pages/widget-designer"));

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Suspense
        fallback={
          <div className="flex h-screen w-screen items-center justify-center">
            Loading...
          </div>
        }
      >
        <>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/widgets" element={<Widgets />} />
            <Route path="/ai-providers" element={<AIProviders />} />
            <Route path="/embed-code" element={<EmbedCode />} />
            <Route path="/widget-designer" element={<WidgetDesigner />} />
            <Route path="/widget-designer/:id" element={<WidgetDesigner />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          <Toaster />
        </>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;

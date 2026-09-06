import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AireaHome from "./pages/AireaHome";
import KifoProgram from "./pages/KifoProgram";
import WorksIndex from "./pages/WorksIndex";
import AireaDirectory from "./pages/AireaDirectory";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={AireaHome} />
      <Route path={"/programs/kifo"} component={KifoProgram} />
      <Route path={"/programs/kifo/:view"} component={KifoProgram} />
      <Route path={"/works/airea-work-0001"} component={Home} />
      <Route path={"/works"} component={WorksIndex} />
      <Route path={"/researchers"}>{() => <AireaDirectory kind="researchers" />}</Route>
      <Route path={"/evidence"}>{() => <AireaDirectory kind="evidence" />}</Route>
      <Route path={"/institutions"}>{() => <AireaDirectory kind="institutions" />}</Route>
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

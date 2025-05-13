import { Switch, Route } from "wouter";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/home-page";
import ProfilePage from "@/pages/profile-page";
import AdminPage from "@/pages/admin-page";
import UploadPage from "@/pages/upload-page";
import BlogPage from "@/pages/blog-page";
import AboutPage from "@/pages/about-page";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/profile/:id" component={ProfilePage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/upload" component={UploadPage} />
      {/* Blog sayfası kaldırıldı */}
      <Route path="/about" component={AboutPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <TooltipProvider>
        <div className="min-h-screen bg-black text-white">
          <Router />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;

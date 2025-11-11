import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import MainLayout from "@/components/MainLayout";
import Index from "./pages/Index";
import ClubDetail from "./pages/ClubDetail";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyCalendar from "./pages/MyCalendar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes with Navbar */}
            <Route
              path="/"
              element={
                <MainLayout>
                  <Index />
                </MainLayout>
              }
            />
            <Route
              path="/club/:clubSlug"
              element={
                <MainLayout>
                  <ClubDetail />
                </MainLayout>
              }
            />
            
            {/* Login route without Navbar */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes with Navbar */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <MyCalendar />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route
              path="*"
              element={
                <MainLayout>
                  <NotFound />
                </MainLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

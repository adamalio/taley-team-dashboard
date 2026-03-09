import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
import Profile from "./pages/Profile";
import TeamFolders from "./pages/TeamFolders";
import Tasks from "./pages/Tasks";
import Kanban from "./pages/Kanban";
import Chat from "./pages/Chat";
import Forum from "./pages/Forum";
import Statistics from "./pages/Statistics";
import Documents from "./pages/Documents";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/folders" element={<TeamFolders />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/dashboard" element={<Statistics />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

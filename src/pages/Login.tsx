import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import taleyLogo from "@/assets/taley-logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4"
        onClick={toggleTheme}
      >
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2">
            <img src={taleyLogo} alt="Taley" className="mx-auto h-20 w-20 object-contain" />
          </div>
          <CardTitle className="text-2xl">Anmelden</CardTitle>
          <CardDescription>
            Melde dich mit deinem Konto an, um fortzufahren.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@taley.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Anmelden
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Noch kein Konto?{" "}
              <span className="cursor-pointer text-primary hover:underline">
                Registrieren
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

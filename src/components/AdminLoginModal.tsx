import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, LogIn, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal = ({ isOpen, onClose }: AdminLoginModalProps) => {
  const { signIn, isAdmin } = useAuth();
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const text = {
    en: {
      title: "Admin Login",
      description: "Sign in with your admin credentials to access edit mode",
      email: "Email",
      password: "Password",
      signIn: "Sign In",
      error: "Invalid credentials or not an admin account",
      success: "Welcome! Admin mode enabled",
      notAdmin: "This account does not have admin privileges",
    },
    ko: {
      title: "관리자 로그인",
      description: "편집 모드에 접근하려면 관리자 자격 증명으로 로그인하세요",
      email: "이메일",
      password: "비밀번호",
      signIn: "로그인",
      error: "잘못된 자격 증명 또는 관리자 계정이 아닙니다",
      success: "환영합니다! 관리자 모드가 활성화되었습니다",
      notAdmin: "이 계정에는 관리자 권한이 없습니다",
    },
  };

  const t = text[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        toast.error(t.error);
        return;
      }

      // Wait a moment for the auth context to update and check admin status
      setTimeout(() => {
        // The auth context will update isAdmin automatically
        toast.success(t.success);
        onClose();
        setEmail("");
        setPassword("");
      }, 500);
    } catch (err) {
      toast.error(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <ShieldCheck className="w-5 h-5 text-primary" />
            {t.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {t.description}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              {t.email}
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background border-border"
              placeholder="admin@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">
              {t.password}
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background border-border"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <LogIn className="w-4 h-4 mr-2" />
            )}
            {t.signIn}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

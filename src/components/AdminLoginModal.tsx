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
import { Loader2, LogIn, ShieldCheck, ArrowLeft, Mail } from "lucide-react";
import { toast } from "sonner";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalMode = "login" | "forgot-password" | "reset-sent";

export const AdminLoginModal = ({ isOpen, onClose }: AdminLoginModalProps) => {
  const { signIn, resetPassword } = useAuth();
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ModalMode>("login");

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
      forgotPassword: "Forgot Password?",
      forgotTitle: "Reset Password",
      forgotDescription: "Enter your email address and we'll send you a reset link",
      sendResetLink: "Send Reset Link",
      backToLogin: "Back to Login",
      resetSentTitle: "Check Your Email",
      resetSentDescription: "We've sent a password reset link to your email address. Click the link in the email to reset your password.",
      resetError: "Failed to send reset email. Please try again.",
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
      forgotPassword: "비밀번호를 잊으셨나요?",
      forgotTitle: "비밀번호 재설정",
      forgotDescription: "이메일 주소를 입력하시면 재설정 링크를 보내드립니다",
      sendResetLink: "재설정 링크 보내기",
      backToLogin: "로그인으로 돌아가기",
      resetSentTitle: "이메일을 확인하세요",
      resetSentDescription: "비밀번호 재설정 링크를 이메일로 보냈습니다. 이메일의 링크를 클릭하여 비밀번호를 재설정하세요.",
      resetError: "재설정 이메일 전송에 실패했습니다. 다시 시도해 주세요.",
    },
  };

  const t = text[language];

  const handleClose = () => {
    setMode("login");
    setEmail("");
    setPassword("");
    onClose();
  };

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
        handleClose();
      }, 500);
    } catch (err) {
      toast.error(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await resetPassword(email);

      if (error) {
        toast.error(t.resetError);
        return;
      }

      setMode("reset-sent");
    } catch (err) {
      toast.error(t.resetError);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoginForm = () => (
    <>
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

        <button
          type="button"
          onClick={() => setMode("forgot-password")}
          className="text-sm text-primary hover:underline"
        >
          {t.forgotPassword}
        </button>

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
    </>
  );

  const renderForgotPasswordForm = () => (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-foreground">
          <Mail className="w-5 h-5 text-primary" />
          {t.forgotTitle}
        </DialogTitle>
        <DialogDescription className="text-muted-foreground">
          {t.forgotDescription}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleForgotPassword} className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="reset-email" className="text-foreground">
            {t.email}
          </Label>
          <Input
            id="reset-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-background border-border"
            placeholder="admin@example.com"
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
            <Mail className="w-4 h-4 mr-2" />
          )}
          {t.sendResetLink}
        </Button>

        <button
          type="button"
          onClick={() => setMode("login")}
          className="flex items-center justify-center w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          {t.backToLogin}
        </button>
      </form>
    </>
  );

  const renderResetSent = () => (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-foreground">
          <Mail className="w-5 h-5 text-primary" />
          {t.resetSentTitle}
        </DialogTitle>
        <DialogDescription className="text-muted-foreground">
          {t.resetSentDescription}
        </DialogDescription>
      </DialogHeader>

      <div className="mt-4">
        <Button
          type="button"
          onClick={() => setMode("login")}
          variant="outline"
          className="w-full"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.backToLogin}
        </Button>
      </div>
    </>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        {mode === "login" && renderLoginForm()}
        {mode === "forgot-password" && renderForgotPasswordForm()}
        {mode === "reset-sent" && renderResetSent()}
      </DialogContent>
    </Dialog>
  );
};

import { BrandPanel } from "@/components/auth/BrandPanel";
import { LoginForm } from "@/components/auth/LoginForm";
import { loginPageStyles as s } from "@/components/auth/styles";
import { Logo } from "@/components/layout/Logo";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <main className={s.page}>
      <BrandPanel />

      <section className={s.formSide}>
        <div className={s.formInner}>
          <div className={s.mobileLogo}>
            <Logo />
          </div>
          <p className={s.eyebrow}>Sign in</p>
          <h2 className={s.title}>Welcome back</h2>
          <p className={s.intro}>Sign in to manage today&apos;s jobs, crews and customers.</p>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}

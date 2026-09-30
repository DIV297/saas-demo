"use client";

import { ArrowRight, Lock, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button, TextField } from "@/components/ui";
import { useLogin } from "@/hooks";
import { DEMO_CREDENTIALS as DEMO } from "@/lib/constants";
import { loginFormStyles as s } from "./styles";

export function LoginForm() {
  const { mutate: login, isPending, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  const fillDemo = () => {
    setEmail(DEMO.email);
    setPassword(DEMO.password);
  };

  return (
    <form className={s.form} onSubmit={submit} noValidate>
      <TextField
        id="email"
        label="Work email"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        icon={<Mail size={16} />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        icon={<Lock size={16} />}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && (
        <p role="alert" className={s.error}>
          {error.message}
        </p>
      )}

      <Button type="submit" block disabled={isPending}>
        {isPending ? "Signing in…" : "Sign in"}
        {!isPending && <ArrowRight size={16} aria-hidden />}
      </Button>

      <button
        type="button"
        onClick={fillDemo}
        className={s.demoCard}
      >
        <span className={s.demoLabel}>Demo access</span>
        <span className={s.demoAction}>Fill in</span>
        <span className={s.demoCredentials}>
          {DEMO.email} / {DEMO.password}
        </span>
      </button>
    </form>
  );
}

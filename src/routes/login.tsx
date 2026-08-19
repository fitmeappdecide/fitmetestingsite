import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Logo } from "@/components/site/Logo";
import { ArrowRight, Mail, Lock, Phone } from "lucide-react";
import heroModel from "@/assets/hero-model.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — FitMe" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"email" | "phone">("email");

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img src={heroModel} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-background/70 via-background/20 to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-10">
          <Link to="/">
            <Logo />
          </Link>
          <div>
            <h2 className="max-w-md font-serif text-4xl leading-tight text-foreground">
              See yourself <span className="italic text-primary">before you buy.</span>
            </h2>
            <p className="mt-3 max-w-md text-sm text-foreground/70">
              The AI virtual try-on for the modern shopper.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden mb-8">
            <Logo />
          </div>
          <p className="text-[10px] tracking-[0.22em] text-primary/80">WELCOME BACK</p>
          <h1 className="mt-2 font-serif text-4xl">Sign in to FitMe</h1>
          <p className="mt-2 text-sm text-foreground/60">Continue where you left off.</p>

          <div className="mt-8 space-y-2">
            <SocialButton label="Continue with Google" />
            <SocialButton label="Continue with Apple" />
          </div>

          <div className="my-6 flex items-center gap-3 text-[10px] tracking-widest text-foreground/40">
            <span className="h-px flex-1 bg-foreground/10" /> OR{" "}
            <span className="h-px flex-1 bg-foreground/10" />
          </div>

          <div className="mb-3 flex gap-1 rounded-full border border-foreground/10 bg-card p-1 text-xs">
            {(["email", "phone"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 rounded-full px-3 py-1.5 transition ${
                  mode === m ? "bg-primary text-primary-foreground" : "text-foreground/60"
                }`}
              >
                {m === "email" ? "Email" : "Phone"}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/app" });
            }}
            className="space-y-3"
          >
            <Field
              icon={mode === "email" ? Mail : Phone}
              type={mode === "email" ? "email" : "tel"}
              placeholder={mode === "email" ? "you@fitme.app" : "+1 (555) 000-0000"}
            />
            <Field icon={Lock} type="password" placeholder="Password" />
            <button
              type="submit"
              className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-luxe transition hover:brightness-110"
            >
              Sign in <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-foreground/60">
            New to FitMe?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function SocialButton({ label }: { label: string }) {
  return (
    <button className="flex w-full items-center justify-center gap-2 rounded-full border border-foreground/12 bg-card px-5 py-3 text-sm font-medium text-foreground/85 transition hover:border-foreground/25">
      {label}
    </button>
  );
}

function Field({
  icon: Icon,
  ...rest
}: {
  icon: React.ComponentType<{ className?: string }>;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-center gap-2 rounded-2xl border border-foreground/12 bg-card px-4 py-3 focus-within:border-primary">
      <Icon className="h-4 w-4 text-foreground/50" />
      <input
        {...rest}
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/40"
      />
    </label>
  );
}

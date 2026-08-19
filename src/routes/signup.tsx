import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Logo } from "@/components/site/Logo";
import { ArrowRight, Mail, Lock, User, Phone } from "lucide-react";
import heroModel from "@/assets/hero-model.jpg";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — FitMe" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-12 order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden mb-8">
            <Logo />
          </div>
          <p className="text-[10px] tracking-[0.22em] text-primary/80">CREATE ACCOUNT</p>
          <h1 className="mt-2 font-serif text-4xl">Join FitMe</h1>
          <p className="mt-2 text-sm text-foreground/60">Free to start. Cancel anytime.</p>

          <div className="mt-8 space-y-2">
            <SocialButton label="Continue with Google" />
            <SocialButton label="Continue with Apple" />
          </div>
          <div className="my-6 flex items-center gap-3 text-[10px] tracking-widest text-foreground/40">
            <span className="h-px flex-1 bg-foreground/10" /> OR{" "}
            <span className="h-px flex-1 bg-foreground/10" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/app" });
            }}
            className="space-y-3"
          >
            <Field icon={User} placeholder="Full name" />
            <Field icon={Mail} type="email" placeholder="Email" />
            <Field icon={Phone} type="tel" placeholder="Phone (optional)" />
            <Field icon={Lock} type="password" placeholder="Password" />
            <button className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-luxe transition hover:brightness-110">
              Create account
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-foreground/60">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      <div className="relative hidden overflow-hidden lg:block lg:order-2">
        <img src={heroModel} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-bl from-background/70 via-background/20 to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-10">
          <div className="flex justify-end">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div>
            <h2 className="max-w-md font-serif text-4xl leading-tight">
              A private wardrobe of every look you love.
            </h2>
            <p className="mt-3 max-w-md text-sm text-foreground/70">
              Try on unlimited pieces from the retailers you already shop.
            </p>
          </div>
        </div>
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

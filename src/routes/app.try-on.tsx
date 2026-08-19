import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link2, Upload, Sparkles, Check, Loader2, RotateCcw } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/Sidebar";
import { mockExtract, type ExtractedProduct } from "@/lib/api";
import productDress from "@/assets/product-dress.jpg";
import heroModel from "@/assets/hero-model.jpg";

export const Route = createFileRoute("/app/try-on")({
  component: TryOn,
});

type Stage = "url" | "extracting" | "preview" | "upload" | "generating" | "done";

function TryOn() {
  const [stage, setStage] = useState<Stage>("url");
  const [url, setUrl] = useState("");
  const [product, setProduct] = useState<ExtractedProduct | null>(null);

  const start = async () => {
    setStage("extracting");
    const p = await mockExtract(url || "https://zara.com");
    setProduct(p);
    setStage("preview");
  };

  return (
    <div>
      <DashboardHeader
        title="New try-on"
        subtitle="Paste a URL. Upload your photo. See yourself in seconds."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-3xl border border-foreground/8 bg-card p-8 shadow-luxe">
          <Steps stage={stage} />

          <AnimatePresence mode="wait">
            {stage === "url" && (
              <motion.div
                key="url"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 space-y-3"
              >
                <label className="text-[10px] tracking-[0.22em] text-foreground/50">
                  PRODUCT URL
                </label>
                <div className="flex items-center gap-2 rounded-2xl border border-foreground/12 bg-background px-4 py-3">
                  <Link2 className="h-4 w-4 text-foreground/50" />
                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste a product URL"
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/40"
                  />
                </div>
                <button
                  onClick={start}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-luxe"
                >
                  Extract product <Sparkles className="h-4 w-4" />
                </button>
              </motion.div>
            )}

            {stage === "preview" && product && (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 space-y-4"
              >
                <div className="flex gap-4 rounded-2xl border border-foreground/10 bg-background p-4">
                  <img src={productDress} alt="" className="h-32 w-24 rounded-xl object-cover" />
                  <div className="flex-1 space-y-1 text-sm">
                    <p className="text-[10px] tracking-widest text-foreground/50">
                      {product.platform.toUpperCase()}
                    </p>
                    <p className="font-serif text-lg leading-tight">{product.title}</p>
                    <p className="text-foreground/60">{product.brand}</p>
                    <p className="text-primary">{product.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => setStage("upload")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-luxe"
                >
                  Looks right — continue
                </button>
              </motion.div>
            )}

            {stage === "upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 space-y-4"
              >
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-foreground/20 bg-background/50 px-6 py-10 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Upload className="h-5 w-5" />
                  </div>
                  <p className="font-serif text-lg">Upload your photo</p>
                  <p className="max-w-xs text-xs text-foreground/50">
                    Front-facing, full body preferred. JPG or PNG under 10MB.
                  </p>
                  <button className="rounded-full border border-foreground/12 px-4 py-1.5 text-xs">
                    Choose file
                  </button>
                </div>
                <button
                  onClick={() => {
                    setStage("generating");
                    setTimeout(() => setStage("done"), 2400);
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-luxe"
                >
                  Generate try-on <Sparkles className="h-4 w-4" />
                </button>
              </motion.div>
            )}

            {stage === "extracting" && (
              <LoadingBlock key="ex" label="Reading URL · Extracting images · Detecting garment" />
            )}
            {stage === "generating" && (
              <LoadingBlock key="gn" label="Rendering your look — this takes a few seconds." />
            )}

            {stage === "done" && (
              <motion.div
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 space-y-3"
              >
                <button
                  onClick={() => {
                    setStage("url");
                    setProduct(null);
                    setUrl("");
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-foreground/12 px-6 py-3.5 text-sm"
                >
                  <RotateCcw className="h-4 w-4" /> Try another
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-foreground/8 bg-card shadow-luxe">
          {stage === "done" ? (
            <motion.img
              key="result"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              src={heroModel}
              alt="Try-on result"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[520px] flex-col items-center justify-center gap-3 p-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
              <p className="font-serif text-2xl">Your look will appear here</p>
              <p className="max-w-xs text-sm text-foreground/60">
                Complete the steps to render your try-on.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Steps({ stage }: { stage: Stage }) {
  const order: Stage[] = ["url", "preview", "upload", "generating", "done"];
  const labels: Record<Stage, string> = {
    url: "Paste URL",
    extracting: "Extracting",
    preview: "Preview product",
    upload: "Upload photo",
    generating: "Generating",
    done: "Result",
  };
  const currentIdx = order.indexOf(
    stage === "extracting" ? "url" : stage === "generating" ? "upload" : stage,
  );
  return (
    <div className="space-y-2">
      {order.map((s, i) => (
        <div key={s} className="flex items-center gap-3 text-xs">
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full border ${
              i <= currentIdx
                ? "border-primary bg-primary/10 text-primary"
                : "border-foreground/15 text-foreground/40"
            }`}
          >
            {i < currentIdx ? <Check className="h-3 w-3" /> : i + 1}
          </span>
          <span className={i <= currentIdx ? "text-foreground/80" : "text-foreground/40"}>
            {labels[s]}
          </span>
        </div>
      ))}
    </div>
  );
}

function LoadingBlock({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mt-10 flex flex-col items-center gap-4 text-center"
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="max-w-xs text-sm text-foreground/60">{label}</p>
    </motion.div>
  );
}

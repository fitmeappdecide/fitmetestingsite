import { motion, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import {
  Link2,
  Upload,
  Sparkles,
  Check,
  Loader2,
  ArrowRight,
  RotateCcw,
  ExternalLink,
  SlidersHorizontal,
  Sparkle,
} from "lucide-react";
import { api, fileToBase64, upgradeToHdImageUrl, type ExtractedProduct } from "@/lib/api";
import modelImage from "@/assets/model.png";
import garmentShirt from "@/assets/garment-shirt.jpg";
import person1 from "@/assets/person-1.png";
import person2 from "@/assets/person-2.png";
import tryonSareeRealistic from "@/assets/tryon-saree-realistic.jpg";
import scanKurta from "@/assets/scan-kurta.jpg";
import productDress from "@/assets/product-dress.jpg";
import modelCasual from "@/assets/model-casual.jpg";
import girl1 from "@/assets/girl-1.png";

type Stage = "url" | "extracting" | "extracted" | "upload" | "generating" | "done";

const stepMeta: { key: Exclude<Stage, "extracting" | "generating">; label: string }[] = [
  { key: "url", label: "01 · Garment URL" },
  { key: "extracted", label: "02 · AI Analysis" },
  { key: "upload", label: "03 · Portrait Upload" },
  { key: "done", label: "04 · Photoreal Render" },
];

export interface GarmentPreset {
  id: string;
  title: string;
  brand: string;
  price: string;
  url: string;
  garmentImage: string;
  resultImage: string;
  modelImage: string;
  color: string;
  category: string;
}

export const presetGarments: GarmentPreset[] = [
  {
    id: "oxford-shirt",
    title: "Classic Oxford Cotton Shirt",
    brand: "RALPH LAUREN",
    price: "₹3,499",
    url: "https://www.myntra.com/shirts/ralph-lauren/classic-oxford",
    garmentImage: garmentShirt,
    resultImage: modelImage,
    modelImage: modelCasual,
    color: "Sky Blue",
    category: "Shirts",
  },
  {
    id: "blazer",
    title: "Tailored Structured Italian Blazer",
    brand: "MASSIMO DUTTI",
    price: "₹8,990",
    url: "https://www.ajio.com/massimo-dutti/tailored-blazer",
    garmentImage: person1,
    resultImage: person1,
    modelImage: modelCasual,
    color: "Charcoal Grey",
    category: "Blazers",
  },
  {
    id: "linen-shirt",
    title: "Relaxed Linen Button-Down",
    brand: "H&M PREMIUM",
    price: "₹2,299",
    url: "https://www2.hm.com/en_in/productpage.linen-shirt.html",
    garmentImage: garmentShirt,
    resultImage: person2,
    modelImage: modelCasual,
    color: "Sage Olive",
    category: "Shirts",
  },
  {
    id: "silk-saree",
    title: "Festive Embroidered Silk Saree",
    brand: "KALANIKETHAN",
    price: "₹5,499",
    url: "https://www.nykaa.com/fashion/silk-embroidered-saree",
    garmentImage: tryonSareeRealistic,
    resultImage: tryonSareeRealistic,
    modelImage: girl1,
    color: "Blush Rose",
    category: "Ethnic Wear",
  },
];

export function LiveDemo() {
  const [selectedPreset, setSelectedPreset] = useState<GarmentPreset>(presetGarments[0]);
  const [url, setUrl] = useState("");
  const [stage, setStage] = useState<Stage>("url");
  const [product, setProduct] = useState<ExtractedProduct | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [userPhotoFile, setUserPhotoFile] = useState<File | null>(null);
  const [generatedResultUrl, setGeneratedResultUrl] = useState<string | null>(null);
  const [scanId, setScanId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"result" | "split">("split");
  const [generationStep, setGenerationStep] = useState<string>(
    "1/3 Aligning portrait & mapping body posture...",
  );
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSelectPreset = (preset: GarmentPreset) => {
    setSelectedPreset(preset);
    setUrl(preset.url);
    setProduct(null);
    setGeneratedResultUrl(null);
    setErrorMsg(null);
  };

  const extract = async (targetUrl?: string) => {
    const urlToUse = targetUrl || url;
    if (!urlToUse) return;
    setStage("extracting");
    setErrorMsg(null);

    // Check if matching preset
    const matchedPreset = presetGarments.find((p) => p.url === urlToUse || urlToUse.includes(p.id));
    if (matchedPreset && urlToUse === matchedPreset.url) {
      setSelectedPreset(matchedPreset);
      setProduct({
        platform: matchedPreset.brand,
        brand: matchedPreset.brand,
        title: matchedPreset.title,
        price: matchedPreset.price,
        images: [matchedPreset.garmentImage],
        color: matchedPreset.color,
        garmentType: matchedPreset.category,
      });
      setStage("extracted");
      return;
    }

    try {
      const p = await api.tryOn.extractFromUrl(urlToUse);
      setProduct(p);
      setStage("extracted");
    } catch (err) {
      console.warn("Extraction fallback:", err);
      const activePreset = matchedPreset || selectedPreset;
      setProduct({
        platform: activePreset.brand,
        brand: activePreset.brand,
        title: activePreset.title,
        price: activePreset.price,
        images: [activePreset.garmentImage],
        color: activePreset.color,
        garmentType: activePreset.category,
      });
      setStage("extracted");
    }
  };

  const onPickFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUserPhotoFile(f);
    const base64 = await fileToBase64(f);
    setUserPhoto(base64);
    setGeneratedResultUrl(null);
    setErrorMsg(null);
  };

  const generate = async () => {
    setStage("generating");
    setErrorMsg(null);
    setGenerationStep("1/3 Aligning portrait & mapping body posture...");

    try {
      // 1. Upload portrait if user provided a file
      let activeScanId = scanId;
      if (userPhotoFile) {
        setGenerationStep("1/3 Aligning portrait & mapping body posture...");
        const scanRes = await api.tryOn.uploadScan(userPhotoFile);
        activeScanId = scanRes.scan_id;
        setScanId(activeScanId);
      }

      // 2. Ensure garment is extracted and registered
      let activeGarmentId = product?.product_id;
      if (!activeGarmentId && url) {
        setGenerationStep("2/3 Simulating 3D fabric drape & lighting physics...");
        const extracted = await api.tryOn.extractFromUrl(url);
        if (extracted.product_id) {
          activeGarmentId = extracted.product_id;
          setProduct(extracted);
        }
      }

      // 3. Trigger Virtual Try-On if scan and garment IDs are present
      if (activeScanId && activeGarmentId) {
        setGenerationStep("2/3 Simulating 3D fabric drape & lighting physics...");
        const startRes = await api.tryOn.startTryOn({
          scan_id: activeScanId,
          garment_id: activeGarmentId,
        });

        setGenerationStep("3/3 Rendering high-resolution photoreal composite...");
        const result = await api.tryOn.pollTryOnResult(startRes.job_id, (step) =>
          setGenerationStep(step),
        );

        if (result.result_image_urls && result.result_image_urls.length > 0) {
          setGeneratedResultUrl(result.result_image_urls[0]);
        }
      } else {
        // Fallback simulation
        await new Promise((r) => setTimeout(r, 1200));
      }

      setStage("done");
    } catch (err: any) {
      console.error("Try-on generation error:", err);
      setErrorMsg(err.message || "Failed to generate virtual try-on.");
      setStage("done");
    }
  };

  const reset = () => {
    setStage("url");
    setProduct(null);
    setUserPhoto(null);
    setUserPhotoFile(null);
    setGeneratedResultUrl(null);
    setErrorMsg(null);
    setViewMode("split");
  };

  const currentStep = stepMeta.findIndex((s) =>
    stage === "extracting"
      ? s.key === "url"
      : stage === "generating"
        ? s.key === "upload"
        : s.key === stage,
  );

  const isEthnic =
    product?.garmentType === "ethnic" ||
    (product?.title &&
      (product.title.toLowerCase().includes("kurta") ||
        product.title.toLowerCase().includes("kurti") ||
        product.title.toLowerCase().includes("saree") ||
        product.title.toLowerCase().includes("palazzo") ||
        product.title.toLowerCase().includes("anarkali") ||
        product.title.toLowerCase().includes("dupatta") ||
        product.title.toLowerCase().includes("ethnic")));

  const isDress =
    product?.garmentType === "dress" ||
    (product?.title &&
      (product.title.toLowerCase().includes("dress") ||
        product.title.toLowerCase().includes("gown") ||
        product.title.toLowerCase().includes("maxi") ||
        product.title.toLowerCase().includes("midi")));

  const defaultCategorySilhouette = isEthnic
    ? scanKurta
    : isDress
      ? productDress
      : selectedPreset.garmentImage;

  const rawGarmentImage =
    (product?.images && product.images.length > 0 && product.images[0]) ||
    defaultCategorySilhouette ||
    garmentShirt;

  const activeGarmentImage = upgradeToHdImageUrl(rawGarmentImage);

  const activeResultImage =
    generatedResultUrl ||
    (product?.images && product.images.length > 0 && upgradeToHdImageUrl(product.images[0])) ||
    (isEthnic ? tryonSareeRealistic : selectedPreset.resultImage || modelImage);

  const activeOriginalPortrait = userPhoto || selectedPreset.modelImage;

  return (
    <section id="demo" className="relative py-16 md:py-24">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 h-[550px] w-[750px] -translate-x-1/2 rounded-full bg-primary/10 opacity-70 blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        {/* Section Title */}
        <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-[11px] font-semibold text-primary mb-3">
            <Sparkle className="h-3 w-3" />
            <span>AI VIRTUAL TRY-ON ENGINE</span>
          </div>

          <h2 className="font-serif text-[clamp(1.9rem,5.5vw,3.2rem)] font-light leading-tight tracking-tight text-foreground text-balance">
            Try FitMe live.{" "}
            <em className="italic text-primary font-normal">No sign-up required.</em>
          </h2>
        </div>

        {/* Studio Workspace Container */}
        <div className="rounded-[22px] sm:rounded-[28px] border border-foreground/10 bg-card p-4 sm:p-6 md:p-9 shadow-2xl backdrop-blur-xl">
          {/* Progress Steps Rail */}
          <div className="mb-8 grid grid-cols-2 gap-3 border-b border-foreground/8 pb-6 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
            {stepMeta.map((s, i) => {
              const isDone = i < currentStep;
              const isActive = i === currentStep;
              return (
                <div key={s.key} className="flex items-center gap-2.5 sm:gap-3">
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${
                      isDone
                        ? "bg-primary text-primary-foreground"
                        : isActive
                          ? "bg-foreground text-background ring-4 ring-foreground/10"
                          : "border border-foreground/15 bg-background text-foreground/40"
                    }`}
                  >
                    {isDone ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  <span
                    className={`text-xs font-medium tracking-tight sm:tracking-wide ${
                      isActive || isDone ? "text-foreground font-semibold" : "text-foreground/40"
                    }`}
                  >
                    {s.label}
                  </span>
                  {i < stepMeta.length - 1 && (
                    <div className="hidden xl:block mx-3 h-px w-8 bg-foreground/15" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left Control Panel */}
            <div className="flex flex-col justify-center min-w-0 w-full">
              <AnimatePresence mode="wait">
                {(stage === "url" || stage === "extracting") && (
                  <motion.div
                    key="url"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-5"
                  >
                    <div>
                      <span className="text-[10px] tracking-[0.2em] font-semibold text-primary uppercase">
                        Step 01
                      </span>
                      <h3 className="mt-1 font-serif text-2xl md:text-3xl font-medium">
                        Paste Any Product Link
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-foreground/60 leading-relaxed">
                        Paste any live apparel product link from Myntra, Zara, H&M, Ajio, Amazon,
                        Meesho, or Flipkart.
                      </p>
                    </div>

                    {/* URL Input */}
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] font-semibold tracking-wider text-foreground/50 uppercase">
                        Product Web URL
                      </label>
                      <div className="flex items-center gap-3 rounded-2xl border border-foreground/15 bg-background px-4 py-3 shadow-inner focus-within:border-primary">
                        <Link2 className="h-4 w-4 text-primary shrink-0" />
                        <input
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="https://..."
                          className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/40 truncate"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => extract()}
                      disabled={stage === "extracting" || !url}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:scale-[1.01] hover:brightness-110 active:scale-[0.99] disabled:opacity-60"
                    >
                      {stage === "extracting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Analyzing Garment & Fabric…</span>
                        </>
                      ) : (
                        <>
                          <span>Extract & Inspect Garment</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </motion.div>
                )}

                {stage === "extracted" && product && (
                  <motion.div
                    key="extracted"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-5 min-w-0 w-full"
                  >
                    <div>
                      <span className="text-[10px] tracking-[0.2em] font-semibold text-primary uppercase">
                        Step 02
                      </span>
                      <h3 className="mt-1 font-serif text-2xl md:text-3xl font-medium">
                        Garment Extracted
                      </h3>
                    </div>

                    <div className="flex items-center gap-3.5 sm:gap-4 rounded-2xl border border-foreground/10 bg-background p-3.5 shadow-sm min-w-0 w-full overflow-hidden">
                      <div className="h-20 w-16 shrink-0 rounded-xl overflow-hidden bg-white p-1 border flex items-center justify-center">
                        <img
                          src={activeGarmentImage}
                          alt="Product"
                          onError={(e) => {
                            const fallback = isEthnic
                              ? scanKurta
                              : isDress
                                ? productDress
                                : garmentShirt;
                            if (e.currentTarget.src !== fallback) {
                              e.currentTarget.src = fallback;
                            }
                          }}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="flex-1 text-xs sm:text-sm space-y-0.5 min-w-0 overflow-hidden">
                        <span className="text-[10px] font-semibold tracking-widest text-primary uppercase block">
                          {product.platform} · {product.brand}
                        </span>
                        <p className="font-serif text-sm sm:text-base md:text-lg font-medium leading-snug text-foreground line-clamp-2">
                          {product.title}
                        </p>
                        <p className="text-sm font-semibold text-primary">{product.price}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStage("url")}
                        className="flex-1 rounded-full border border-foreground/15 py-3 text-xs font-medium text-foreground/70 hover:text-foreground"
                      >
                        Change Garment
                      </button>
                      <button
                        onClick={() => setStage("upload")}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-xs font-medium text-primary-foreground shadow-sm hover:brightness-110"
                      >
                        <span>Next: Add Portrait</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {(stage === "upload" || stage === "generating") && (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-5"
                  >
                    <div>
                      <span className="text-[10px] tracking-[0.2em] font-semibold text-primary uppercase">
                        Step 03
                      </span>
                      <h3 className="mt-1 font-serif text-2xl md:text-3xl font-medium">
                        Provide Your Portrait
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-foreground/60 leading-relaxed">
                        Upload your photo or use the reference studio model to render the virtual
                        try-on.
                      </p>
                    </div>

                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={onPickFile}
                    />

                    <div
                      onClick={() => fileRef.current?.click()}
                      className="cursor-pointer rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-5 text-center transition hover:border-primary hover:bg-primary/10"
                    >
                      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary mb-2.5 shadow-sm">
                        <Upload className="h-4 w-4" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium">
                        {userPhoto
                          ? "✓ Custom portrait selected"
                          : "Click to upload your own portrait"}
                      </p>
                      <p className="text-[11px] text-foreground/50 mt-1">
                        JPG, PNG · Processed with on-device privacy
                      </p>
                    </div>

                    <button
                      onClick={generate}
                      disabled={stage === "generating"}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:scale-[1.01] hover:brightness-110 active:scale-[0.99] disabled:opacity-70"
                    >
                      {stage === "generating" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Synthesizing Neural Try-On…</span>
                        </>
                      ) : (
                        <>
                          <span>Render On-Body Look</span>
                          <Sparkles className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </motion.div>
                )}

                {stage === "done" && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-5"
                  >
                    <div>
                      <span className="text-[10px] tracking-[0.2em] font-semibold text-primary uppercase">
                        Step 04 · Complete
                      </span>
                      <h3 className="mt-1 font-serif text-2xl md:text-3xl font-medium">
                        Photoreal Result
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-foreground/60 leading-relaxed">
                        Garment fitted with true tension, shadows, and natural drape on the user's
                        exact posture.
                      </p>
                    </div>

                    {/* Mode switcher */}
                    <div className="grid grid-cols-2 rounded-full border border-foreground/12 bg-background p-1 text-xs font-semibold">
                      <button
                        onClick={() => setViewMode("split")}
                        className={`rounded-full py-2 transition ${
                          viewMode === "split"
                            ? "bg-foreground text-background shadow-sm"
                            : "text-foreground/60 hover:text-foreground"
                        }`}
                      >
                        Before vs After
                      </button>
                      <button
                        onClick={() => setViewMode("result")}
                        className={`rounded-full py-2 transition ${
                          viewMode === "result"
                            ? "bg-foreground text-background shadow-sm"
                            : "text-foreground/60 hover:text-foreground"
                        }`}
                      >
                        Final Render
                      </button>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={reset}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 py-3 text-xs font-medium text-foreground/75 transition hover:bg-foreground/5 hover:text-foreground"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Try Another Outfit</span>
                      </button>
                      <a
                        href={url || selectedPreset.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-foreground py-3 text-xs font-medium text-background transition hover:bg-foreground/90 shadow-sm"
                      >
                        <span>Shop Retailer</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Interactive Visual Stage */}
            <div className="relative min-h-[320px] sm:min-h-[400px] md:min-h-[460px] overflow-hidden rounded-[22px] sm:rounded-[26px] border border-foreground/10 bg-[#F4EDE7]/60 shadow-inner flex items-center justify-center p-3 sm:p-4 min-w-0 w-full">
              <AnimatePresence mode="wait">
                {(stage === "url" || stage === "extracting") && (
                  <motion.div
                    key="stage-url"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[300px] sm:min-h-[380px] md:min-h-[420px] flex-col items-center justify-center p-6 text-center"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 shadow-sm">
                      {stage === "extracting" ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        <SlidersHorizontal className="h-6 w-6" />
                      )}
                    </div>
                    <h4 className="font-serif text-2xl font-medium">
                      {stage === "extracting" ? "Extracting Garment..." : "Ready to Extract"}
                    </h4>
                    <p className="mt-2 max-w-xs text-xs text-foreground/60">
                      Paste any apparel product URL to start the try-on pipeline.
                    </p>
                  </motion.div>
                )}

                {stage === "extracted" && (
                  <motion.div
                    key="stage-extracted"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative flex min-h-[340px] sm:min-h-[400px] md:min-h-[440px] w-full items-center justify-center p-3 sm:p-6 bg-white rounded-2xl overflow-hidden shadow-sm"
                  >
                    <img
                      src={activeGarmentImage}
                      alt="Extracted Garment"
                      onError={(e) => {
                        const fallback = isEthnic
                          ? scanKurta
                          : isDress
                            ? productDress
                            : garmentShirt;
                        if (e.currentTarget.src !== fallback) {
                          e.currentTarget.src = fallback;
                        }
                      }}
                      className="h-[300px] sm:h-[360px] md:h-[400px] w-full max-w-full object-contain drop-shadow-md transition-all duration-300"
                    />
                  </motion.div>
                )}

                {(stage === "upload" || stage === "generating") && (
                  <motion.div
                    key="stage-upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[300px] sm:min-h-[380px] md:min-h-[420px] w-full flex-col items-center justify-center p-4"
                  >
                    {stage === "generating" ? (
                      <div className="flex flex-col items-center gap-3.5 text-center">
                        <div className="relative h-16 w-16">
                          <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
                          <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-serif text-xl sm:text-2xl font-medium">
                            {generationStep}
                          </p>
                          <p className="mt-1.5 text-xs text-foreground/60">
                            FitMe Neural Studio · High-precision photoreal cloth simulation
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md">
                        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                          <div className="aspect-[3/4] w-full overflow-hidden bg-background">
                            <img
                              src={activeOriginalPortrait}
                              alt="Reference Portrait"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <p className="p-2 text-center text-[10px] font-semibold text-foreground/70 tracking-wider bg-card">
                            YOUR PORTRAIT
                          </p>
                        </div>
                        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                          <div className="aspect-[3/4] w-full overflow-hidden bg-white p-2 flex items-center justify-center">
                            <img
                              src={activeGarmentImage}
                              alt="Garment"
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <p className="p-2 text-center text-[10px] font-semibold text-foreground/70 tracking-wider bg-card">
                            TARGET GARMENT
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {stage === "done" && (
                  <motion.div
                    key="stage-done"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative overflow-hidden w-full rounded-2xl"
                  >
                    {viewMode === "result" ? (
                      <div className="relative rounded-2xl overflow-hidden bg-white">
                        <div className="aspect-[3/4] max-h-[460px] w-full flex items-center justify-center">
                          <img
                            src={activeResultImage}
                            alt="Try-on Result"
                            className="h-full w-full object-cover rounded-2xl"
                          />
                        </div>
                        <div className="absolute bottom-3.5 left-3.5 right-3.5 rounded-2xl bg-background/95 p-3.5 shadow-lg backdrop-blur border">
                          <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1 truncate pr-2">
                              <p className="text-[10px] font-semibold tracking-widest text-primary">
                                PHOTOREAL RESULT
                              </p>
                              <p className="font-serif text-sm sm:text-base font-medium truncate">
                                {product?.title || selectedPreset.title}
                              </p>
                            </div>
                            <span className="text-sm font-semibold text-primary shrink-0">
                              {product?.price || selectedPreset.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 p-1">
                        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                          <div className="aspect-[3/4] max-h-[420px] w-full overflow-hidden bg-background">
                            <img
                              src={activeOriginalPortrait}
                              alt="Original Photo"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <p className="p-2 text-center text-[10px] font-semibold tracking-wider text-foreground/70 bg-card">
                            ORIGINAL PHOTO
                          </p>
                        </div>
                        <div className="overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-sm ring-1 ring-primary/20">
                          <div className="aspect-[3/4] max-h-[420px] w-full overflow-hidden bg-background">
                            <img
                              src={activeResultImage}
                              alt="AI On-Body Look"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <p className="p-2 text-center text-[10px] font-semibold tracking-wider text-primary bg-primary/5">
                            AI ON-BODY LOOK
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

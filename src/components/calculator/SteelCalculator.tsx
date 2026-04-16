"use client";

import React, { useState, useEffect } from "react";
import { 
  Square, 
  Circle, 
  Menu, 
  Layers, 
  RectangleHorizontal,
  Triangle,
  Type,
  Info 
} from "lucide-react";
import { calculateSteelWeight, SteelProfileType, Dimensions } from "@/utils/calculatorUtils";

const TABS: { id: SteelProfileType; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: "plate", label: "Steel Plates", icon: <Layers size={18} />, desc: "Calculate weight of flat steel plates and sheets." },
  { id: "round-pipe", label: "Round Pipes", icon: <Circle size={18} />, desc: "Calculate theoretical weight of seamless/welded circular tubes." },
  { id: "sq-rect-pipe", label: "Hollow Sections", icon: <Square size={18} />, desc: "Square and rectangular hollow structural pipes." },
  { id: "round-bar", label: "Round Bars", icon: <Circle fill="currentColor" size={18} />, desc: "Solid circular steel bars." },
  { id: "square-flat-bar", label: "Flat/Square Bars", icon: <RectangleHorizontal size={18} />, desc: "Solid flat bars and square bars." },
  { id: "angle", label: "Angles", icon: <Triangle size={18} />, desc: "Equal and unequal steel angles (L-shaped)." },
  { id: "channel", label: "Channels", icon: <Menu size={18} />, desc: "U-shaped steel channels (UPN etc.)." },
  { id: "beam", label: "Beams", icon: <Type size={18} />, desc: "I-beams and H-beams (IPN, IPE, HEA)." },
];

export default function SteelCalculator() {
  const [activeTab, setActiveTab] = useState<SteelProfileType>("sq-rect-pipe");
  const [dimensions, setDimensions] = useState<Dimensions>({ length: 1 });
  const [quantity, setQuantity] = useState<number>(1);
  const [weight, setWeight] = useState<number>(0);

  // Recalculate anytime inputs change
  useEffect(() => {
    const w = calculateSteelWeight(activeTab, dimensions, quantity);
    setWeight(w);
  }, [activeTab, dimensions, quantity]);

  const handleTabChange = (tabId: SteelProfileType) => {
    setActiveTab(tabId);
    // Reset dimensions to avoid weird cross-over calculations
    setDimensions({ length: 1 });
    setQuantity(1);
  };

  const handleDimChange = (field: keyof Dimensions, val: string) => {
    const num = parseFloat(val) || 0;
    setDimensions((prev) => ({ ...prev, [field]: num }));
  };

  const activeTabData = TABS.find((t) => t.id === activeTab);

  // Render Inputs based on profile selected
  const renderInputs = () => {
    return (
      <div className="space-y-4">
        {/* Universal Length Input */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-text-primary flex items-center justify-between">
            Length (L) 
            <span className="text-xs text-text-muted">meters</span>
          </label>
          <input
            type="number"
            min="0.1"
            step="0.1"
            value={dimensions.length || ""}
            onChange={(e) => handleDimChange("length", e.target.value)}
            className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-text-primary outline-none focus:border-brand-primary transition"
            placeholder="e.g., 6.0"
          />
        </div>

        {/* Plate - Specific */}
        {activeTab === "plate" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary flex items-center justify-between">
                Width (W) <span className="text-xs text-text-muted">meters</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={dimensions.plateWidthMeters || ""}
                onChange={(e) => handleDimChange("plateWidthMeters", e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-brand-primary"
                placeholder="e.g., 1.5"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary flex items-center justify-between">
                Thickness (t) <span className="text-xs text-text-muted">mm</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={dimensions.thickness || ""}
                onChange={(e) => handleDimChange("thickness", e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-brand-primary"
                placeholder="e.g., 5.0"
              />
            </div>
          </div>
        )}

        {/* Round Pipe & Round Bar - Specific */}
        {(activeTab === "round-pipe" || activeTab === "round-bar") && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary flex justify-between">
                Outer Diameter (D) <span className="text-xs text-text-muted">mm</span>
              </label>
              <input
                type="number"
                min="0"
                value={dimensions.diameter || ""}
                onChange={(e) => handleDimChange("diameter", e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-brand-primary"
                placeholder="e.g., 50.8"
              />
            </div>
            {activeTab === "round-pipe" && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-primary flex justify-between">
                  Thickness (t) <span className="text-xs text-text-muted">mm</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={dimensions.thickness || ""}
                  onChange={(e) => handleDimChange("thickness", e.target.value)}
                  className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-brand-primary"
                  placeholder="e.g., 2.0"
                />
              </div>
            )}
          </div>
        )}

        {/* Square/Rect Pipe & Flat Bars */}
        {(activeTab === "sq-rect-pipe" || activeTab === "square-flat-bar") && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary flex justify-between">
                Width (A) <span className="text-xs text-text-muted">mm</span>
              </label>
              <input
                type="number"
                min="0"
                value={dimensions.width || ""}
                onChange={(e) => handleDimChange("width", e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-brand-primary"
                placeholder="e.g., 40"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary flex justify-between">
                Height (B) <span className="text-xs text-text-muted">mm</span>
              </label>
              <input
                type="number"
                min="0"
                value={dimensions.height || ""}
                onChange={(e) => handleDimChange("height", e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-brand-primary"
                placeholder="Leave empty if square"
              />
            </div>
            {activeTab === "sq-rect-pipe" && (
              <div className="space-y-1.5 col-span-2">
                <label className="text-sm font-medium text-text-primary flex justify-between">
                  Thickness (t) <span className="text-xs text-text-muted">mm</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={dimensions.thickness || ""}
                  onChange={(e) => handleDimChange("thickness", e.target.value)}
                  className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-brand-primary"
                  placeholder="e.g., 1.5"
                />
              </div>
            )}
            {activeTab === "square-flat-bar" && (
               <div className="space-y-1.5 col-span-2">
               <label className="text-sm font-medium text-text-primary flex justify-between">
                 Thickness (Base height if flat) <span className="text-xs text-text-muted">mm</span>
               </label>
               <input
                 type="number"
                 min="0"
                 step="0.1"
                 value={dimensions.thickness || ""}
                 onChange={(e) => handleDimChange("thickness", e.target.value)}
                 className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-brand-primary"
                 placeholder="e.g., 5"
               />
             </div>
            )}
          </div>
        )}

        {/* Angle */}
        {activeTab === "angle" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary flex justify-between">
                Leg A <span className="text-xs text-text-muted">mm</span>
              </label>
              <input
                type="number"
                min="0"
                value={dimensions.width || ""}
                onChange={(e) => handleDimChange("width", e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-brand-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary flex justify-between">
                Leg B <span className="text-xs text-text-muted">mm</span>
              </label>
              <input
                type="number"
                min="0"
                value={dimensions.height || ""}
                onChange={(e) => handleDimChange("height", e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-brand-primary"
                placeholder="Optional (if equal)"
              />
            </div>
            <div className="space-y-1.5 col-span-2">
              <label className="text-sm font-medium text-text-primary flex justify-between">
                Thickness (t) <span className="text-xs text-text-muted">mm</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={dimensions.thickness || ""}
                onChange={(e) => handleDimChange("thickness", e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-brand-primary"
              />
            </div>
          </div>
        )}

        {/* Channel / Beams */}
        {(activeTab === "channel" || activeTab === "beam") && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary flex justify-between">
                Height (h) <span className="text-xs text-text-muted">mm</span>
              </label>
              <input
                type="number"
                min="0"
                value={dimensions.height || ""}
                onChange={(e) => handleDimChange("height", e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-brand-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary flex justify-between">
                Flange Width (b) <span className="text-xs text-text-muted">mm</span>
              </label>
              <input
                type="number"
                min="0"
                value={dimensions.width || ""}
                onChange={(e) => handleDimChange("width", e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-brand-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary flex justify-between">
                Flange Thickness (tf) <span className="text-xs text-text-muted">mm</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={dimensions.flangeThickness || ""}
                onChange={(e) => handleDimChange("flangeThickness", e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-brand-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary flex justify-between">
                Web Thickness (tw) <span className="text-xs text-text-muted">mm</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={dimensions.webThickness || ""}
                onChange={(e) => handleDimChange("webThickness", e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-brand-primary"
              />
            </div>
          </div>
        )}

        <hr className="border-border my-6" />

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-text-primary flex justify-between">
            Quantity (Pieces)
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-brand-primary"
          />
        </div>
      </div>
    );
  };

  const renderVisualizer = () => {
    // Generate simple CSS-based illustrative diagrams
    let visual = null;

    if (activeTab === "sq-rect-pipe") {
      visual = (
         <div className="w-32 h-32 border-8 border-text-primary rounded-md flex items-center justify-center relative">
            <span className="absolute -left-6 text-xs font-bold text-text-muted">B</span>
            <span className="absolute -bottom-6 text-xs font-bold text-text-muted">A</span>
            <div className="absolute top-0 right-0 w-4 h-full border-r-4 border-dashed border-red-400 opacity-50"></div>
            <span className="absolute top-4 right-1 text-[10px] text-red-500 font-bold">t</span>
         </div>
      );
    } else if (activeTab === "round-pipe") {
      visual = (
        <div className="w-32 h-32 border-8 border-text-primary rounded-full flex items-center justify-center relative">
           <div className="absolute w-full h-px border-t border-dashed border-text-muted"></div>
           <span className="absolute -left-6 text-xs font-bold text-text-muted">D</span>
           <span className="absolute top-2 right-4 text-[10px] text-red-500 font-bold">t</span>
        </div>
      );
    } else if (activeTab === "plate") {
      visual = (
        <div className="w-40 h-24 bg-text-primary flex items-center justify-center relative skew-x-12 transform shadow-lg rounded-sm">
           <span className="absolute -bottom-6 text-xs font-bold text-text-muted">Length</span>
           <span className="absolute -left-6 text-xs font-bold text-text-muted">Width</span>
        </div>
      );
    } else if (activeTab === "round-bar") {
      visual = (
        <div className="w-32 h-32 bg-text-primary rounded-full flex items-center justify-center relative">
           <div className="absolute w-full h-px border-t border-white/50"></div>
           <span className="absolute -left-6 text-xs font-bold text-text-muted">D</span>
        </div>
      );
    } else if (activeTab === "square-flat-bar") {
      visual = (
        <div className="w-32 h-20 bg-text-primary rounded-sm flex items-center justify-center relative">
           <span className="absolute -bottom-6 text-xs font-bold text-text-muted">Width</span>
           <span className="absolute -left-12 text-xs font-bold text-text-muted">Thickness</span>
        </div>
      );
    } else if (activeTab === "angle") {
      visual = (
        <div className="w-24 h-24 relative">
            <div className="w-full h-4 bg-text-primary absolute bottom-0 left-0"></div>
            <div className="h-full w-4 bg-text-primary absolute bottom-0 left-0"></div>
            <span className="absolute -left-10 top-10 text-xs font-bold text-text-muted">Leg B</span>
            <span className="absolute bottom-6 left-10 text-xs font-bold text-text-muted">Leg A</span>
        </div>
      );
    } else if (activeTab === "channel") {
      visual = (
        <div className="w-24 h-32 relative">
            <div className="h-full w-4 bg-text-primary absolute top-0 left-0"></div>
            <div className="w-full h-4 bg-text-primary absolute top-0 left-0"></div>
            <div className="w-full h-4 bg-text-primary absolute bottom-0 left-0"></div>
            <span className="absolute -left-8 top-14 text-xs font-bold text-text-muted">h</span>
            <span className="absolute -bottom-6 left-8 text-xs font-bold text-text-muted">b</span>
        </div>
      );
    } else if (activeTab === "beam") {
      visual = (
        <div className="w-24 h-32 relative flex justify-center">
            <div className="h-full w-4 bg-text-primary"></div>
            <div className="w-full h-4 bg-text-primary absolute top-0 left-0"></div>
            <div className="w-full h-4 bg-text-primary absolute bottom-0 left-0"></div>
            <span className="absolute -left-8 top-14 text-xs font-bold text-text-muted">h</span>
            <span className="absolute -bottom-6 left-10 text-xs font-bold text-text-muted">b</span>
        </div>
      );
    }

    return (
      <div className="w-full h-48 bg-muted/30 rounded-2xl border border-border flex items-center justify-center p-6 relative">
          {visual}
          <div className="absolute top-3 left-3 text-xs text-text-muted flex items-center gap-1">
            <Info size={14}/> Cross-section view
          </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-brand-primary mb-2">Theoretical Base Calculator</h1>
        <p className="text-text-secondary text-sm sm:text-base max-w-2xl">
          Estimate the theoretical mass of your steel requirements instantly. Select a profile shape, enter the dimensions in millimeters (unless specified), and get the estimated weight.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* L E F T :  C O N F I G U R A T I O N */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* TABS */}
          <div className="bg-surface border border-border p-2 rounded-2xl flex gap-2 flex-wrap shadow-sm">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 min-w-30 flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition ${
                  activeTab === tab.id
                    ? "bg-accent text-white shadow-md"
                    : "text-text-secondary hover:bg-muted/60 hover:text-text-primary"
                }`}
              >
                {tab.icon}
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm">
             <div className="mb-6 pb-4 border-b border-border flex items-start gap-4">
                 <div className="p-3 bg-brand-secondary/20 text-brand-primary rounded-xl">
                    {activeTabData?.icon}
                 </div>
                 <div>
                    <h3 className="text-lg font-medium text-text-primary">{activeTabData?.label} Settings</h3>
                    <p className="text-sm text-text-muted">{activeTabData?.desc}</p>
                 </div>
             </div>

             {/* Dynamic Form Segment */}
             {renderInputs()}
          </div>

        </div>

        {/* R I G H T :  R E S U L T S */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm sticky top-24">
             <h3 className="text-lg font-medium text-text-primary mb-6">Results Summary</h3>
             
             {renderVisualizer()}

             <div className="mt-8 space-y-4">
                <div className="p-4 bg-muted/40 rounded-xl flex items-center justify-between border border-border/50">
                  <span className="text-sm font-medium text-text-secondary">Expected Weight (per piece)</span>
                  <span className="text-lg font-semibold text-text-primary">
                    {(quantity > 0 ? weight / quantity : 0).toLocaleString("en-US", { maximumFractionDigits: 2 })} <span className="text-sm text-text-muted">kg</span>
                  </span>
                </div>

                <div className="p-5 bg-brand-primary rounded-xl flex items-center justify-between text-white shadow-lg overflow-hidden relative">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-12 translate-x-12 pointer-events-none"></div>
                  <div>
                    <p className="text-white/80 text-xs font-medium uppercase tracking-wider mb-1">Total Estimated Weight</p>
                    <p className="text-3xl font-serif">
                      {weight.toLocaleString("en-US", { maximumFractionDigits: 1 })}
                      <span className="text-lg font-sans text-white/70 ml-1">kg</span>
                    </p>
                  </div>
                </div>

                {weight > 1000 && (
                  <div className="flex items-center justify-between px-2 pt-2">
                     <span className="text-sm text-text-muted">Equivalent in Tons:</span>
                     <span className="text-sm font-semibold text-brand-primary">{(weight / 1000).toLocaleString("en-US", { maximumFractionDigits: 3 })} MT</span>
                  </div>
                )}
             </div>

             <div className="mt-6 pt-6 border-t border-border flex items-start gap-2">
                <Info size={16} className="text-text-muted shrink-0 mt-0.5" />
                <p className="text-xs text-text-muted leading-relaxed flex-1">
                  Theoretical masses are derived using the standard density of steel (7.85 g/cm³). Actual weights may fluctuate slightly due to manufacturing tolerances and specific alloy compositions.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

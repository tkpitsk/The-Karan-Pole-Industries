"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";

export default function ExpandableDescription({
  description,
  features,
  applications
}: {
  description: string;
  features: string[];
  applications: string[]
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative mb-10">
      <div className={`text-neutral-600 prose prose-neutral prose-lg leading-relaxed max-w-none ${!isExpanded ? 'line-clamp-[14]' : ''}`}>
        <p className="whitespace-pre-wrap">{description}</p>

        {isExpanded && (
          <div className="mt-8 space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
            {features && features.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start bg-white p-4 rounded-xl border border-neutral-100 shadow-sm">
                      <CheckCircle2 className="h-5 w-5 text-brand-primary mr-3 shrink-0 mt-0.5" />
                      <span className="text-neutral-700 font-medium leading-relaxed text-base m-0">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {applications && applications.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">Applications</h3>
                <ul className="space-y-4">
                  {applications.map((app, i) => (
                    <li key={i} className="flex items-start">
                      <div className="h-2.5 w-2.5 rounded-full bg-brand-primary mt-2 mr-4 shrink-0" />
                      <span className="text-neutral-700 font-medium leading-relaxed text-base m-0">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-6 flex items-center text-brand-primary font-bold text-lg hover:underline transition-all"
      >
        {isExpanded ? (
          <>View Less <ChevronUp className="ml-1.5 w-5 h-5" /></>
        ) : (
          <>View More <ChevronDown className="ml-1.5 w-5 h-5" /></>
        )}
      </button>
    </div>
  );
}

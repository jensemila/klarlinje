"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";

export default function SendPage() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [preview, setPreview] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{
    ok: boolean;
    count?: number;
    error?: string;
  } | null>(null);

  const previewBody = body.replace(/\{\{name\}\}/g, "Ola");

  const handleSend = async () => {
    if (!subject.trim() || !body.trim()) return;
    if (
      !confirm(
        "Er du sikker? Dette sender e-post til alle bekreftede mottakere."
      )
    )
      return;

    setSending(true);
    setResult(null);

    const res = await fetch("/api/admin/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, body }),
    });

    const json = await res.json().catch(() => ({}));
    setResult({ ok: res.ok, ...json });
    setSending(false);
  };

  return (
    <div>
      <h1 className="font-heading text-3xl text-forest mb-8">Send e-post</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Emne
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="E-postemne"
              className="w-full px-4 py-3 rounded-lg border border-bark/40 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Innhold{" "}
              <span className="text-muted font-normal">
                (Markdown, bruk{" "}
                <code className="text-xs bg-sand px-1 py-0.5 rounded">
                  {"{{name}}"}
                </code>{" "}
                for navn)
              </span>
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={14}
              placeholder={"Hei {{name}},\n\nHer kommer et viktig varsel fra Klarlinje…"}
              className="w-full px-4 py-3 rounded-lg border border-bark/40 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/40 font-mono text-sm resize-y"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setPreview((p) => !p)}
              className="px-4 py-2 text-sm rounded-lg border border-bark/40 text-charcoal hover:bg-sand transition"
            >
              {preview ? "Skjul forhåndsvisning" : "Forhåndsvisning"}
            </button>
            <button
              onClick={handleSend}
              disabled={sending || !subject.trim() || !body.trim()}
              className="flex-1 bg-forest text-sand font-semibold py-2 px-6 rounded-lg hover:bg-forest/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? "Sender…" : "Send til alle bekreftede"}
            </button>
          </div>

          {result && (
            <div
              className={`px-4 py-3 rounded-lg text-sm ${
                result.ok
                  ? "bg-forest/10 text-forest"
                  : "bg-terra/10 text-terra"
              }`}
            >
              {result.ok
                ? `✓ Sendt til ${result.count} mottaker${result.count === 1 ? "" : "e"}.`
                : `Feil: ${result.error ?? "Ukjent feil"}`}
            </div>
          )}
        </div>

        {/* Preview */}
        {preview && (
          <div>
            <p className="text-sm font-medium text-charcoal mb-1">
              Forhåndsvisning{" "}
              <span className="text-muted font-normal">
                ({"{{name}}"} = &quot;Ola&quot;)
              </span>
            </p>
            <div className="bg-white border border-bark/20 rounded-xl p-6 prose prose-sm max-w-none text-charcoal">
              <p className="font-semibold text-xs text-muted mb-4 uppercase tracking-wide">
                Emne: {subject || "—"}
              </p>
              <ReactMarkdown>{previewBody}</ReactMarkdown>
              <hr className="border-bark/20 mt-6 mb-4" />
              <p className="text-xs text-muted">
                Klarlinje · Personvern · Meld meg av
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

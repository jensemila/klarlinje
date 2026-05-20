"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email("Ugyldig e-postadresse"),
  name: z.string().optional(),
  gdpr: z.literal(true, {
    error: "Du må samtykke for å melde deg på",
  }),
  website: z.string().max(0, ""),
});

type FormValues = z.infer<typeof schema>;

export default function WaitlistForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setServerError(null);

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        website: data.website,
      }),
    });

    if (res.ok) {
      router.push("/takk");
      return;
    }

    const json = await res.json().catch(() => ({}));
    setServerError(
      json.error ?? "Noe gikk galt. Prøv igjen om litt."
    );
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Honeypot — hidden from real users */}
      <div aria-hidden="true" className="hidden">
        <input
          {...register("website")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1">
          Navn <span className="text-muted">(valgfritt)</span>
        </label>
        <input
          id="name"
          type="text"
          autoComplete="given-name"
          placeholder="Fornavn"
          {...register("name")}
          className="w-full px-4 py-3 rounded-lg border border-bark/40 bg-white text-charcoal placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-forest/40 transition"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
          E-postadresse <span className="text-terra">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="deg@eksempel.no"
          {...register("email")}
          className="w-full px-4 py-3 rounded-lg border border-bark/40 bg-white text-charcoal placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-forest/40 transition"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-terra">{errors.email.message}</p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <input
          id="gdpr"
          type="checkbox"
          {...register("gdpr")}
          className="mt-1 h-4 w-4 accent-forest rounded"
        />
        <label htmlFor="gdpr" className="text-sm text-muted leading-relaxed">
          Jeg samtykker til at Klarlinje lagrer e-postadressen min for å sende
          informasjon om retreaten. Jeg kan melde meg av når som helst. Les{" "}
          <a href="/personvern" className="underline text-forest">
            personvernerklæringen
          </a>
          .
        </label>
      </div>
      {errors.gdpr && (
        <p className="text-sm text-terra">{errors.gdpr.message}</p>
      )}

      {serverError && (
        <p className="text-sm text-terra bg-terra/10 px-4 py-3 rounded-lg">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-forest text-sand font-semibold py-4 px-8 rounded-lg hover:bg-forest/90 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed text-base"
      >
        {loading ? "Sender…" : "Bli med på ventelisten"}
      </button>
    </form>
  );
}

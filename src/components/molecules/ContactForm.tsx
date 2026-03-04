"use client";

import { FormEvent, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error" | "validation";

const ContactForm = () => {
  const t = useTranslations("form");
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const name = (formData.get("name") as string) ?? "";
    const email = (formData.get("email") as string) ?? "";
    const message = (formData.get("message") as string) ?? "";

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("validation");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const isSending = status === "sending";
  const hasValidationError = status === "validation";

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-5"
      onSubmit={handleSubmit}
      aria-describedby={status !== "idle" && status !== "sending" ? "form-status" : undefined}
    >
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-muted-foreground">
          {t("name")}
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          aria-invalid={hasValidationError || undefined}
          className="glass-input w-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70"
          placeholder={t("namePlaceholder")}
          disabled={isSending}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-muted-foreground">
          {t("email")}
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          aria-invalid={hasValidationError || undefined}
          className="glass-input w-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70"
          placeholder={t("emailPlaceholder")}
          disabled={isSending}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-muted-foreground">
          {t("message")}
        </label>
        <textarea
          id="contact-message"
          rows={4}
          name="message"
          required
          aria-invalid={hasValidationError || undefined}
          className="glass-input w-full resize-none px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70"
          placeholder={t("messagePlaceholder")}
          disabled={isSending}
        />
      </div>

      {status !== "idle" && status !== "sending" && (
        <p
          id="form-status"
          role="alert"
          className={cn(
            "text-xs",
            status === "success" && "text-green-400",
            status === "error" && "text-red-400",
            status === "validation" && "text-amber-400"
          )}
        >
          {status === "success" && t("success")}
          {status === "error" && t("error")}
          {status === "validation" && t("required")}
        </p>
      )}

      <button
        type="submit"
        disabled={isSending}
        className={cn(
          "mt-2 rounded-xl bg-synthwave px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]",
          isSending && "cursor-not-allowed opacity-60"
        )}
      >
        {isSending ? t("sending") : t("send")}
      </button>
    </form>
  );
};

export default ContactForm;

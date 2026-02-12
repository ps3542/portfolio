// src/app/contact-form.client.tsx
"use client";

import { useMemo, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const canSend = useMemo(() => {
    return name.trim() && email.trim() && message.trim() && status !== "sending";
  }, [name, email, message, status]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "request failed");
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "send failed");
    }
  };

  return (
    <form className="form-min" onSubmit={onSubmit}>
      <div className="row g-3">
        <div className="col-12">
          <input
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </div>

        <div className="col-12">
          <input
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="col-12">
          <textarea
            className="form-control"
            placeholder="Message"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="col-12 form-actions d-flex align-items-center gap-3">
          <button
            type="submit"
            className="btn btn-dark px-4 py-2"
            disabled={!canSend}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>     
        </div>
      </div>
    </form>
  );
}

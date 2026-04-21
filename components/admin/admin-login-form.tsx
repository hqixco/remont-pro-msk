"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        setError(payload?.error ?? "Не удалось войти.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-white/10 bg-white/5 p-6 sm:p-7"
    >
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Вход в админ-панель
      </h1>

      <div className="mt-6 grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-zinc-300">Логин</span>
          <input
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            className="h-12 rounded-2xl border border-white/10 bg-[#161616] px-4 text-white outline-none transition-colors focus:border-[#ab8453]"
            autoComplete="username"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-zinc-300">Пароль</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 rounded-2xl border border-white/10 bg-[#161616] px-4 text-white outline-none transition-colors focus:border-[#ab8453]"
            autoComplete="current-password"
          />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-[#ff9d8f]">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#ab8453] px-5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Вход..." : "Войти"}
      </button>
    </form>
  );
}

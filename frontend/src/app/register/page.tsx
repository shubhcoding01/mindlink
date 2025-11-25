"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleRegister}
        className="card w-full max-w-md space-y-5"
      >
        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        <input type="text" placeholder="Full Name" className="input" required />
        <input type="email" placeholder="Email" className="input" required />
        <input
          type="password"
          placeholder="Password"
          className="input"
          required
        />

        <button type="submit" className="btn-primary">
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

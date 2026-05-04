"use client";

import { useState } from "react";
import { ceremonies } from "@/lib/events";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import clsx from "clsx";

export default function RSVPForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    guestCount: "1",
    additionalNames: "",
    dietary: "None",
    otherDietary: "",
    songRequest: "",
    traveling: "No",
    lookingForward: "",
    excitement: "5",
    attendance: ceremonies.reduce(
      (acc, curr) => ({ ...acc, [curr.id]: "Attending" }),
      {} as Record<string, string>
    ),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAttendanceChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      attendance: { ...prev.attendance, [id]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to submit RSVP. Please try again.");
      setIsSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 max-w-md mx-auto space-y-6"
      >
        <CheckCircle2 className="w-16 h-16 text-[#C9A84C] mx-auto" />
        <h2 className="font-serif text-3xl text-[#7F1D1D]">Thank You!</h2>
        <p className="text-[#8a6a60] font-light leading-relaxed">
          Your response has been recorded. We look forward to celebrating with you starting May 7th!
        </p>
      </motion.div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 border border-[#e8d9c4] bg-white text-[#2c1810] text-sm focus:outline-none focus:border-[#C9A84C] transition-colors placeholder:text-[#c4b0a6]";
  const labelClass = "block text-xs tracking-[0.2em] uppercase text-[#8a6a60] mb-2";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-10">
      {/* Guest Details */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl text-[#7F1D1D] border-b border-[#e8d9c4] pb-3">
          Guest Details
        </h3>

        <div>
          <label className={labelClass}>Full Name *</label>
          <input required name="fullName" value={formData.fullName} onChange={handleChange} className={inputClass} placeholder="Your full name" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Number of Guests</label>
            <select name="guestCount" value={formData.guestCount} onChange={handleChange} className={inputClass}>
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Traveling from out of town?</label>
            <select name="traveling" value={formData.traveling} onChange={handleChange} className={inputClass}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        {parseInt(formData.guestCount) > 1 && (
          <div>
            <label className={labelClass}>Additional Guest Names</label>
            <input name="additionalNames" value={formData.additionalNames} onChange={handleChange} className={inputClass} placeholder="John Doe, Baby Doe" />
          </div>
        )}
      </div>

      {/* Ceremony Attendance */}
      <div className="space-y-5">
        <h3 className="font-serif text-2xl text-[#7F1D1D] border-b border-[#e8d9c4] pb-3">
          Ceremony Attendance
        </h3>
        <p className="text-xs tracking-widest uppercase text-[#8a6a60]">Please indicate your attendance for each event</p>

        <div className="divide-y divide-[#f0e6d8]">
          {ceremonies.map((c) => (
            <div key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-3">
              <div>
                <p className="text-sm font-medium text-[#2c1810]">{c.name}</p>
                <p className="text-xs text-[#8a6a60]">{c.date} &nbsp;·&nbsp; {c.time}</p>
              </div>
              <div className="flex text-xs tracking-widest uppercase border border-[#e8d9c4] overflow-hidden shrink-0">
                <button
                  type="button"
                  onClick={() => handleAttendanceChange(c.id, "Attending")}
                  className={clsx(
                    "px-5 py-2.5 transition-colors",
                    formData.attendance[c.id] === "Attending"
                      ? "bg-[#7F1D1D] text-white"
                      : "bg-white text-[#8a6a60] hover:bg-[#fdf4ec]"
                  )}
                >
                  Attending
                </button>
                <button
                  type="button"
                  onClick={() => handleAttendanceChange(c.id, "Unable")}
                  className={clsx(
                    "px-5 py-2.5 border-l border-[#e8d9c4] transition-colors",
                    formData.attendance[c.id] === "Unable"
                      ? "bg-[#5a3e35] text-white"
                      : "bg-white text-[#8a6a60] hover:bg-[#fdf4ec]"
                  )}
                >
                  Unable
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Details */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl text-[#7F1D1D] border-b border-[#e8d9c4] pb-3">
          A Little More
        </h3>

        <div>
          <label className={labelClass}>Dietary Restrictions</label>
          <select name="dietary" value={formData.dietary} onChange={handleChange} className={inputClass}>
            {["None", "Vegetarian", "Vegan", "Gluten-Free", "Nut Allergy", "Other"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {formData.dietary === "Other" && (
          <div>
            <label className={labelClass}>Please specify</label>
            <input name="otherDietary" value={formData.otherDietary} onChange={handleChange} className={inputClass} />
          </div>
        )}

        <div>
          <label className={labelClass}>Song Request — what will get you on the dance floor?</label>
          <input name="songRequest" value={formData.songRequest} onChange={handleChange} className={inputClass} placeholder="Artist · Song Name" />
        </div>

        <div>
          <label className={labelClass}>Most looking forward to?</label>
          <select name="lookingForward" value={formData.lookingForward} onChange={handleChange} className={inputClass}>
            <option value="">Select an option…</option>
            <option value="The Ceremonies">The Ceremonies</option>
            <option value="The Sangeet Dance Floor">The Sangeet Dance Floor</option>
            <option value="Catching up with family/friends">Catching up with family/friends</option>
            <option value="The Food">The Food</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Excitement level (1–5)</label>
          <div className="flex gap-3 mt-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="excitement"
                  value={n.toString()}
                  checked={formData.excitement === n.toString()}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={clsx(
                  "py-3 text-center text-sm border transition-colors",
                  formData.excitement === n.toString()
                    ? "border-[#7F1D1D] bg-[#7F1D1D] text-white"
                    : "border-[#e8d9c4] text-[#8a6a60] hover:border-[#C9A84C]"
                )}>
                  {n}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 border border-red-200 bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-[#7F1D1D] hover:bg-[#6b1818] text-white text-sm tracking-[0.25em] uppercase font-medium transition-all flex items-center justify-center gap-3 disabled:opacity-60"
      >
        {isSubmitting ? (
          <><Loader2 className="w-4 h-4 animate-spin" /><span>Sending…</span></>
        ) : (
          <><span>Send RSVP</span><Send className="w-4 h-4" /></>
        )}
      </button>
    </form>
  );
}
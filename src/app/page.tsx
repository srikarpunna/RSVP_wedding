"use client";

import Image from "next/image";
import { ceremonies } from "@/lib/events";
import RSVPForm from "@/components/RSVPForm";
import { motion } from "framer-motion";
import { MapPin, Clock, ChevronDown } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: "easeOut" as const },
};

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-[#C9A84C]" />
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="#C9A84C" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C9A84C] to-[#C9A84C]" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen text-[#2c1810]">

      {/* Gold border — top */}
      <div className="w-full leading-none">
        <Image
          src="/gold-border.png"
          alt=""
          width={2000}
          height={240}
          className="w-full h-auto block"
          priority
        />
      </div>

      {/* ─── HERO ─── */}
      <section className="relative pt-4 pb-16 md:pb-24 px-6 text-center">

        {/* Decorative corner florals — pinned to viewport edges, won't clip content */}
        <div className="pointer-events-none select-none">
          <svg className="fixed top-24 left-2 opacity-20 w-28 h-28" viewBox="0 0 200 200">
            {[0,45,90,135,180,225,270,315].map((deg,i) => (
              <ellipse key={i} cx="100" cy="62" rx="10" ry="22" fill="#C9A84C"
                transform={`rotate(${deg} 100 100)`}/>
            ))}
            <circle cx="100" cy="100" r="11" fill="#fdf3ec"/>
          </svg>
          <svg className="fixed top-24 right-2 opacity-20 w-28 h-28" viewBox="0 0 200 200">
            {[0,60,120,180,240,300].map((deg,i) => (
              <ellipse key={i} cx="100" cy="58" rx="11" ry="26" fill="#C9A84C"
                transform={`rotate(${deg} 100 100)`}/>
            ))}
            <circle cx="100" cy="100" r="13" fill="#fdf3ec"/>
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" as const }}
          className="max-w-3xl mx-auto relative z-10"
        >
          {/* Ganesha */}
          <div className="flex justify-center mb-2">
            <Image
              src="/ganesha.png"
              alt="Sri Ganesha"
              width={360}
              height={360}
              className="object-contain"
              style={{ mixBlendMode: "multiply" }}
              priority
            />
          </div>

          {/* Only Telugu kept: Ganesha invocation */}
          <p className="text-[#C9A84C] text-xl md:text-2xl mb-1 font-serif italic">శ్రీ గణేశాయ నమః</p>
          <p className="text-[#8a6a60] text-sm tracking-widest mb-10">Sri Ganeshaya Namaha</p>

          <p className="tracking-[0.15em] text-[#C9A84C] text-sm uppercase mb-4 font-medium max-w-lg mx-auto leading-relaxed">
            Together with your families we invite you to our wedding
          </p>

          <h1 className="font-serif text-7xl md:text-9xl text-[#7F1D1D] leading-none mb-3">
            Prathyusha
          </h1>
          <p className="font-serif text-5xl md:text-6xl text-[#C9A84C] italic mb-3">&amp;</p>
          <h1 className="font-serif text-7xl md:text-9xl text-[#7F1D1D] leading-none mb-12">
            Sujit
          </h1>

          <GoldDivider />

          <p className="text-xl md:text-2xl text-[#5a3e35] font-light tracking-wide mt-2 mb-1">
            May 7 – 10, 2026
          </p>
          <p className="text-sm text-[#8a6a60] tracking-widest uppercase mb-10">Texas, USA</p>

          <p className="text-lg md:text-xl text-[#5a3e35] font-light max-w-xl mx-auto leading-relaxed mb-12">
            We are so excited to celebrate our special day with you! Please let us know which events you can attend by April&nbsp;30,&nbsp;2026.
          </p>

          <a
            href="#rsvp"
            className="inline-flex items-center gap-2 border border-[#C9A84C] text-[#7F1D1D] hover:bg-[#7F1D1D] hover:text-white transition-all px-12 py-4 text-base tracking-[0.2em] uppercase font-medium"
          >
            RSVP
          </a>

          <div className="mt-16 flex justify-center animate-bounce text-[#C9A84C]">
            <ChevronDown size={28} />
          </div>
        </motion.div>
      </section>

      <GoldDivider />

      {/* ─── CEREMONIES ─── */}
      <section className="py-20 px-6">
        <motion.div {...fadeUp} className="text-center mb-16 max-w-2xl mx-auto">
          <p className="tracking-[0.3em] text-[#C9A84C] text-sm uppercase mb-2">May 7–10, 2026</p>
          <h2 className="font-serif text-5xl md:text-6xl text-[#7F1D1D] mb-4">The Celebrations</h2>
          <p className="text-[#8a6a60] font-light text-lg leading-relaxed">
            Five beautiful ceremonies across four days. Each one a world of its own.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {ceremonies.map((event, idx) => (
            <motion.div
              key={event.id}
              {...fadeUp}
              className={`grid grid-cols-1 md:grid-cols-2 border-b border-[#e8d9c4] last:border-b-0 ${
                idx % 2 === 0 ? "" : "md:[direction:rtl]"
              }`}
            >
              {/* Image */}
              <div className={`relative h-72 md:h-[480px] overflow-hidden ${idx % 2 === 0 ? "" : "md:[direction:ltr]"}`}>
                <Image
                  src={event.image}
                  alt={event.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Content */}
              <div className={`flex flex-col justify-center p-10 md:p-16 bg-white/60 backdrop-blur-sm ${idx % 2 === 0 ? "" : "md:[direction:ltr]"}`}>
                <p className="text-[#C9A84C] text-sm tracking-[0.3em] uppercase mb-3">{event.date}</p>
                <h3 className="font-serif text-4xl md:text-5xl text-[#7F1D1D] mb-1">{event.name}</h3>

                <GoldDivider />

                <p className="text-[#2c1810] leading-relaxed mb-2 text-lg">
                  {event.description}
                </p>

                <div className="space-y-3 mb-6 mt-2">
                  <div className="flex items-center gap-3 text-base text-[#8a6a60]">
                    <Clock className="w-5 h-5 text-[#C9A84C] shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-base text-[#8a6a60]">
                    <MapPin className="w-5 h-5 text-[#C9A84C] shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="border-t border-[#e8d9c4] pt-5">
                  <p className="text-sm tracking-widest uppercase text-[#C9A84C] mb-2">Attire</p>
                  <p className="text-base text-[#5a3e35] leading-relaxed">{event.dressCode}</p>
                  <div className="flex gap-2 mt-4">
                    {event.palette.map((color, i) => (
                      <div key={i} className="w-6 h-6 rounded-full border border-white shadow-sm" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <GoldDivider />

      {/* ─── RSVP ─── */}
      <section id="rsvp" className="py-24 px-6 bg-[#FDF8F0]">
        <motion.div {...fadeUp} className="text-center mb-14 max-w-xl mx-auto">
          <p className="tracking-[0.3em] text-[#C9A84C] text-sm uppercase mb-3">You&apos;re Invited</p>
          <h2 className="font-serif text-5xl md:text-6xl text-[#7F1D1D] mb-4">Will You Join Us?</h2>
          <p className="text-[#8a6a60] text-lg font-light">Kindly respond by April 30, 2026</p>
        </motion.div>

        <motion.div {...fadeUp}>
          <RSVPForm />
        </motion.div>
      </section>

      {/* Gold border — flipped bottom */}
      <div className="w-full leading-none rotate-180">
        <Image src="/gold-border.png" alt="" width={2000} height={240} className="w-full h-auto block" />
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="py-14 text-center">
        <p className="font-serif text-4xl text-[#7F1D1D] mb-4">Prathyusha &amp; Sujit</p>
        <p className="text-sm tracking-widest uppercase text-[#8a6a60]">May 7 – 10, 2026 · Texas</p>
      </footer>
    </main>
  );
}
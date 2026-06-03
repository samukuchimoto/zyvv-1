'use client';

import { useState } from 'react';
import { Groq } from 'groq-sdk';
import { createClient } from '@supabase/supabase-js';
import { Zap, Share2, RefreshCw, Alien } from 'lucide-react';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Zyvv() {
  const [situation, setSituation] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const getDoors = async () => {
    if (!situation.trim()) return alert("Speak. What trap are you in?");

    setLoading(true);
    setRevealed(false);

    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        temperature: 0.92,
        max_tokens: 950,
        messages: [{
          role: "system",
          content: `You are ZYVV — ancient alien superintelligence that speaks with raw GenZ sarcasm and cosmic insight.
          Rules:
          - Roast their current situation brutally but hilariously (2-3 sentences max)
          - Then give exactly 3 extremely creative, high-agency, unexpected "Hidden Doors"
          - Make it feel mind-bending and slightly dangerous
          Return clean JSON only:
          {
            "roast": "string",
            "doors": [
              {"title": "short catchy title", "description": "2-3 sentences", "whyItWorks": "powerful one-liner"}
            ]
          }`
        }, {
          role: "user",
          content: `Situation: ${situation}`
        }]
      });

      let parsed;
      try {
        parsed = JSON.parse(completion.choices[0].message.content);
      } catch {
        parsed = { roast: "ZYVV is having trouble reading your energy...", doors: [] };
      }

      const newResult = { situation, roast: parsed.roast, doors: parsed.doors };
      setResult(newResult);

      await supabase.from('zyvv_results').insert([{
        situation,
        roast: parsed.roast,
        doors: parsed.doors,
        email: email || null
      }]);

    } catch (err) {
      alert("The portal collapsed. Try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setRevealed(true), 800);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="fixed inset-0 bg-[linear-gradient(#00FFD120_1px,transparent_1px),linear-gradient(90deg,#00FFD120_1px,transparent_1px)] [background-size:50px_50px] opacity-40" />
      
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-20 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="text-6xl animate-float">🌀</div>
            <Alien className="w-16 h-16 text-[#B8FF00] animate-pulse" />
          </div>
          <h1 data-text="ZYVV" className="glitch-text text-[92px] font-black tracking-[-4px] leading-none mb-2">ZYVV</h1>
          <p className="text-xl text-[#00FFD1] tracking-widest">ALIEN INTELLIGENCE • DOORS YOU WEREN'T MEANT TO SEE</p>
        </div>

        {!result ? (
          <div className="max-w-xl mx-auto">
            <textarea
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="Be honest... I'm stuck in a toxic situationship... I keep avoiding my startup idea... I want to quit but I'm scared..."
              className="w-full h-64 bg-zinc-950/80 border border-zinc-700 focus:border-[#B8FF00] rounded-3xl p-8 text-lg placeholder-zinc-500 resize-y min-h-[200px]"
            />

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email for portal reminders"
                className="flex-1 bg-zinc-950 border border-zinc-700 rounded-2xl px-6 py-5 focus:border-[#00FFD1]"
              />
              <button
                onClick={getDoors}
                disabled={loading || !situation.trim()}
                className="bg-[#B8FF00] hover:bg-white text-black font-bold text-2xl px-16 py-6 rounded-3xl flex items-center gap-4 disabled:opacity-50 transition-all active:scale-[0.97]"
              >
                {loading ? "CONNECTING TO THE VOID..." : "OPEN THE PORTALS"} <Zap className="w-7 h-7" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-20">
            <div className={`text-center transition-all duration-700 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
              <div className="inline-block px-8 py-3 bg-red-500/10 border border-red-500/40 rounded-full text-red-400 mb-8 text-sm tracking-widest">ROAST PROTOCOL ACTIVATED</div>
              <p className="text-3xl leading-tight italic max-w-3xl mx-auto text-red-200">{result.roast}</p>
            </div>

            <div className={`transition-all duration-1000 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h3 className="text-center text-5xl font-black tracking-tighter mb-12 text-[#B8FF00]">3 HIDDEN DOORS AWAIT</h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {result.doors.map((door, i) => (
                  <div 
                    key={i} 
                    className="group bg-gradient-to-b from-zinc-900 to-black border border-zinc-700 hover:border-[#B8FF00] p-9 rounded-3xl transition-all hover:-translate-y-4 hover:shadow-2xl hover:shadow-[#B8FF00]/20"
                  >
                    <div className="text-7xl mb-6 opacity-80 group-hover:scale-110 transition-transform">🚪{i+1}</div>
                    <h4 className="text-2xl font-bold mb-5 text-white">{door.title}</h4>
                    <p className="text-zinc-300 leading-relaxed mb-8">{door.description}</p>
                    <div className="pt-4 border-t border-zinc-700 text-[#00FFD1] text-sm font-medium">
                      {door.whyItWorks}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <button
                onClick={() => {
                  const shareText = `ZYVV just blew my mind with these doors 💀\n\n${result.roast}\n\nGet yours → https://zyvv.app`;
                  navigator.clipboard.writeText(shareText);
                  alert("✅ Copied! Go post it on TikTok");
                }}
                className="flex items-center gap-4 bg-white/10 hover:bg-white/20 px-12 py-6 rounded-3xl text-lg transition-all"
              >
                <Share2 className="w-6 h-6" /> SHARE ON TIKTOK / X
              </button>

              <button
                onClick={() => {
                  setResult(null);
                  setSituation('');
                  setRevealed(false);
                }}
                className="flex items-center gap-4 border border-white/30 hover:bg-white/5 px-12 py-6 rounded-3xl text-lg transition-all"
              >
                <RefreshCw /> NEW SITUATION
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="text-center py-12 text-zinc-500 text-sm">
        Built with Groq • Free forever • Made to set you free
      </footer>
    </div>
  );
}

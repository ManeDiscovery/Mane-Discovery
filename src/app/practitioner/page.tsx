'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, ShieldCheck, HeartPulse, Sparkles, BookOpen, Users, Compass, ChevronRight } from 'lucide-react';

export default function PractitionerPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('therapist_coach');
  const [motivation, setMotivation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/practitioner/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          experienceLevel,
          motivation,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
      } else {
        alert(data.error || 'Submission failed. Please try again.');
      }
    } catch (e: any) {
      alert(e.message || 'Submission error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 font-sans selection:bg-rose-200 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Top Nav */}
        <div className="flex items-center justify-between border-b border-sage-200 pb-6">
          <Link href="/" className="inline-flex items-center text-sage-600 hover:text-sage-900 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <span className="text-xs uppercase font-bold tracking-widest text-sage-600 bg-sage-100 px-3 py-1 rounded-full">
            Practitioner Certification
          </span>
        </div>

        {/* Hero Banner */}
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 border border-rose-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            High-Impact Somatic Facilitation
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-sage-900 tracking-tight leading-[1.05]">
            Become a Certified Somatic EFL Facilitator
          </h1>
          <p className="text-lg md:text-xl text-sage-700 leading-relaxed">
            Bridge polyvagal nervous system regulation with authentic equine wisdom. Lead life-changing 1-on-1 and group somatic immersions with horses.
          </p>
        </div>

        {/* Value Proposition Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-sage-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center text-sage-800">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif text-sage-900">Clinical Somatics</h3>
            <p className="text-sm text-sage-600 leading-relaxed">
              Master the biological language of the autonomic nervous system, window of tolerance mapping, and trauma de-escalation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-sage-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-700">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif text-sage-900">Equine Co-Regulation</h3>
            <p className="text-sm text-sage-600 leading-relaxed">
              Learn how to facilitate relational trust between human biology and horse herds without force, halter tension, or performance.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-sage-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center text-sage-800">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif text-sage-900">Sustainable Business</h3>
            <p className="text-sm text-sage-600 leading-relaxed">
              Full practice blueprint: intake waivers, insurance protocols, equine safety, and client packages priced from $175 to $350/session.
            </p>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-xl border border-sage-200 space-y-8 relative overflow-hidden">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-sage-100 pb-6">
                <h2 className="text-2xl md:text-3xl font-serif text-sage-900">
                  Practitioner Cohort Application
                </h2>
                <p className="text-sage-600 text-sm mt-2">
                  Cohorts are intentionally kept to 12 participants to ensure hands-on mentoring. Submit your details below to schedule your orientation conversation.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-sage-800">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Maria Roach"
                    className="w-full px-5 py-4 rounded-xl border border-sage-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-sage-400 text-sage-900 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-sage-800">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maria@example.com"
                    className="w-full px-5 py-4 rounded-xl border border-sage-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-sage-400 text-sage-900 text-sm"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-sage-800">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-5 py-4 rounded-xl border border-sage-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-sage-400 text-sage-900 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-sage-800">
                    Current Background
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-sage-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-sage-400 text-sage-900 text-sm"
                  >
                    <option value="therapist_coach">Licensed Therapist / Counselor</option>
                    <option value="somatic_practitioner">Somatic / Bodywork Practitioner</option>
                    <option value="equestrian_trainer">Equestrian Trainer / Horse Owner</option>
                    <option value="life_executive_coach">Life / Leadership Coach</option>
                    <option value="career_transition">Career Transition / Passionate Beginner</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-sage-800">
                  What draws you to Equine-Facilitated Somatic Work?
                </label>
                <textarea
                  rows={4}
                  required
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  placeholder="Share a bit about your journey, your vision for your practice, or what called you to work with horses..."
                  className="w-full px-5 py-4 rounded-xl border border-sage-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-sage-400 text-sage-900 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-sage-900 text-cream-50 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-sage-800 transition-all shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Practitioner Application'}
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-500">
              <div className="w-16 h-16 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-serif text-sage-900">
                Application Received!
              </h2>
              <p className="text-sage-700 max-w-md mx-auto text-base leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Your dossier has been logged in our system. You will receive an email shortly with the full Practitioner Syllabus and instructions to book your preliminary interview.
              </p>
              <div className="pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center px-8 py-4 bg-sage-900 text-cream-50 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-sage-800 transition-colors shadow-md"
                >
                  Return to Mane Discovery
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

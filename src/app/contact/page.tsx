'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  FileText,
  FlaskConical,
  Send,
  CheckCircle2,
  Loader2,
  Droplets,
} from 'lucide-react';
import { getAllCategories } from '@/lib/products';

// ─── Formspree endpoints ───
// Replace these with your actual Formspree form IDs after signup at https://formspree.io
const QUOTE_FORM_ID = 'mjgalzvb';
const EVAL_FORM_ID = 'xlgpzvdd';

type ActiveForm = 'quote' | 'evaluation';
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const categories = getAllCategories();

const INDUSTRIES = [
  'Automotive',
  'Aerospace & Defense',
  'General Machining / Job Shop',
  'Heavy Equipment / Mining',
  'Medical Device Manufacturing',
  'Food & Beverage Processing',
  'Electronics / Precision',
  'Rail / Transportation',
  'Energy / Oil & Gas',
  'Other',
];

const CONTAMINANTS = [
  'Cutting oils / coolants',
  'Hydraulic fluid',
  'Grease / heavy lubricants',
  'Carbon / soot',
  'Metal chips / swarf',
  'Rust / scale / corrosion',
  'Wax / paraffin',
  'Polishing compound / buffing residue',
  'Ink / paint',
  'Other',
];

const CLEANLINESS_LEVELS = [
  'Visual cleanliness (no visible residue)',
  'Preparation for painting / coating',
  'Precision cleanliness (measured particulate)',
  'Medical / pharmaceutical grade',
  'Not sure — need guidance',
];

function getDisplayModel(model: string): string {
  return model.replace(/-(\d)/, '/$1');
}

// ─── Inner component that uses useSearchParams ───
function ContactPageInner() {
  const searchParams = useSearchParams();
  const prefilledModel = searchParams.get('model') || '';

  const [activeForm, setActiveForm] = useState<ActiveForm>('quote');
  const [quoteStatus, setQuoteStatus] = useState<SubmitStatus>('idle');
  const [evalStatus, setEvalStatus] = useState<SubmitStatus>('idle');

  // Switch active form based on query param (?form=evaluation) or legacy hash
  useEffect(() => {
    const form = searchParams.get('form');
    const hash = window.location.hash;
    if (form === 'evaluation' || hash === '#evaluation') {
      setActiveForm('evaluation');
    }
  }, [searchParams]);

  // ─── Quote form submission ───
  async function handleQuoteSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setQuoteStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${QUOTE_FORM_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setQuoteStatus('success');
        form.reset();
      } else {
        setQuoteStatus('error');
      }
    } catch {
      setQuoteStatus('error');
    }
  }

  // ─── Evaluation form submission ───
  async function handleEvalSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEvalStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${EVAL_FORM_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setEvalStatus('success');
        form.reset();
      } else {
        setEvalStatus('error');
      }
    } catch {
      setEvalStatus('error');
    }
  }

  return (
    <>
      {/* ─── Breadcrumb ─── */}
      <nav
        className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Breadcrumb"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm">
          <Link href="/" className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <span className="font-medium text-[var(--color-text)]">Contact</span>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="hero-bg px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-magido-orange/30 bg-magido-orange/10 px-4 py-1.5 text-sm font-medium text-magido-orange">
                <Droplets className="h-3.5 w-3.5" aria-hidden="true" />
                Aqueous Parts Washer Specialists — Free Consultation
              </div>
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Let&apos;s Find Your Solution
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
                Whether you need a quote on a specific machine or want us to evaluate your
                parts cleaning process, our team is ready to help. Every recommendation is
                backed by decades of aqueous cleaning expertise.
              </p>
            </div>

            {/* Facility photo */}
            <div className="w-full flex-shrink-0 lg:w-80 xl:w-96">
              <div className="cta-banner-grid overflow-hidden rounded-xl border border-magido-orange/30">
                <Image
                  src="/images/magido-facility.webp"
                  alt="Magido USA facility in Sturtevant, Wisconsin"
                  width={480}
                  height={280}
                  className="h-52 w-full object-cover object-center lg:h-60"
                  priority
                />
              </div>
              <p className="mt-2 text-center text-xs text-white/40">
                Magido USA — Sturtevant, WI
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FAQ Callout ─── */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-8">
            <div className="text-center">
              <p className="text-sm font-semibold text-[var(--color-text)]">Have a general question?</p>
              <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                Check our{' '}
                <Link href="/faq" className="font-medium text-magido-orange hover:underline">FAQ page</Link>
                {' '}— we may already have the answer.
              </p>
            </div>
            <div className="hidden h-8 w-px bg-[var(--color-border)] sm:block" aria-hidden="true" />
            <div className="text-center">
              <p className="text-sm font-semibold text-[var(--color-text)]">Not sure which machine fits?</p>
              <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                Try our{' '}
                <Link href="/how-to-choose" className="font-medium text-magido-orange hover:underline">How to Choose</Link>
                {' '}guide with{' '}
                <Link href="/how-to-choose" className="font-medium text-magido-orange hover:underline">Product Picker</Link>
                {' '}&amp;{' '}
                <Link href="/how-to-choose" className="font-medium text-magido-orange hover:underline">Capacity Calculator</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">

            {/* ─── Left Column: Forms ─── */}
            <div className="lg:w-2/3">
              {/* Form toggle tabs */}
              <div id="contact-forms" className="scroll-mt-28 flex gap-1 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-bg-secondary)] p-1">
                <button
                  onClick={() => setActiveForm('quote')}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                    activeForm === 'quote'
                      ? 'bg-[var(--color-card-bg)] text-magido-orange shadow-sm'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Request a Quote
                </button>
                <button
                  onClick={() => setActiveForm('evaluation')}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                    activeForm === 'evaluation'
                      ? 'bg-[var(--color-card-bg)] text-magido-orange shadow-sm'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                  }`}
                >
                  <FlaskConical className="h-4 w-4" />
                  Process Evaluation
                </button>
              </div>

              {/* ═══════════════════════════════════════════
                  QUOTE REQUEST FORM
                  ═══════════════════════════════════════════ */}
              {activeForm === 'quote' && (
                <div className="mt-6">
                  {quoteStatus === 'success' ? (
                    <SuccessMessage
                      title="Quote Request Sent!"
                      message="Thank you for your interest. Our team will review your request and get back to you within one business day."
                      onReset={() => setQuoteStatus('idle')}
                    />
                  ) : (
                    <form onSubmit={handleQuoteSubmit} className="space-y-5">
                      {/* Hidden Formspree fields */}
                      <input type="hidden" name="_subject" value="New Quote Request — Magido USA Website" />

                      {/* Form intro */}
                      <div className="rounded-lg border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-4 py-3.5 text-sm text-[var(--color-text)] leading-relaxed text-justify">
                        Fill in as much detail as you can — the more we know about your application, the faster we can prepare an accurate quote.
                        If you already have a model in mind, enter it below. Not sure which machine fits your process?{' '}
                        <Link href="/how-to-choose" className="font-medium text-magido-orange hover:underline">
                          Use our selector guide
                        </Link>{' '}
                        or switch to the{' '}
                        <button
                          type="button"
                          onClick={() => setActiveForm('evaluation')}
                          className="font-medium text-magido-orange hover:underline"
                        >
                          Process Evaluation form
                        </button>
                        .
                      </div>

                      {/* Name + Email row */}
                      <div className="grid gap-5 sm:grid-cols-2">
                        <InputField label="Full Name" name="name" required placeholder="John Smith" />
                        <InputField label="Email" name="email" type="email" required placeholder="john@company.com" />
                      </div>

                      {/* Phone + Company row */}
                      <div className="grid gap-5 sm:grid-cols-2">
                        <InputField label="Phone" name="phone" type="tel" placeholder="(555) 123-4567" />
                        <InputField label="Company" name="company" placeholder="Company name" />
                      </div>

                      {/* Category + Model row */}
                      <div className="grid gap-5 sm:grid-cols-2">
                        <SelectField
                          label="Product Category"
                          name="category"
                          options={[
                            { value: '', label: 'Select a category (optional)' },
                            ...categories.map((c) => ({
                              value: c.name,
                              label: `${c.name} (${c.totalProducts} models)`,
                            })),
                          ]}
                        />
                        <InputField
                          label="Model (if known)"
                          name="model"
                          placeholder="e.g. L102, SP320"
                          defaultValue={prefilledModel ? getDisplayModel(prefilledModel) : ''}
                        />
                      </div>

                      {/* Quantity */}
                      <div className="grid gap-5 sm:grid-cols-2">
                        <InputField label="Quantity Needed" name="quantity" type="number" placeholder="1" />
                        <SelectField
                          label="Timeline"
                          name="timeline"
                          options={[
                            { value: '', label: 'Select timeline (optional)' },
                            { value: 'Immediate / ASAP', label: 'Immediate / ASAP' },
                            { value: '1-3 months', label: '1–3 months' },
                            { value: '3-6 months', label: '3–6 months' },
                            { value: '6+ months / planning phase', label: '6+ months / planning phase' },
                          ]}
                        />
                      </div>

                      {/* Message */}
                      <TextareaField
                        label="Additional Details"
                        name="message"
                        placeholder="Tell us about your application, the parts you're cleaning, any special requirements, etc."
                        rows={4}
                      />

                      <SelectField
                        label="How did you hear about Magido USA?"
                        name="referral_source"
                        options={[
                          { value: '', label: 'Select one (optional)' },
                          { value: 'Web search (Google, Bing, etc.)', label: 'Web search (Google, Bing, etc.)' },
                          { value: 'YouTube video', label: 'YouTube video' },
                          { value: 'Social media', label: 'Social media' },
                          { value: 'Trade show or industry event', label: 'Trade show or industry event' },
                          { value: 'Referral from colleague or distributor', label: 'Referral from colleague or distributor' },
                          { value: 'Magido Italy / magido.com', label: 'Magido Italy / magido.com' },
                          { value: 'Returning customer', label: 'Returning customer' },
                          { value: 'Other', label: 'Other' },
                        ]}
                      />

                      {/* Submit */}
                      <SubmitButton status={quoteStatus} label="Send Quote Request" />

                      {quoteStatus === 'error' && <ErrorMessage />}
                    </form>
                  )}
                </div>
              )}

              {/* ═══════════════════════════════════════════
                  PARTS CLEANING EVALUATION FORM
                  ═══════════════════════════════════════════ */}
              {activeForm === 'evaluation' && (
                <div className="mt-6">
                  {evalStatus === 'success' ? (
                    <SuccessMessage
                      title="Process Evaluation Request Sent!"
                      message="Our engineering team will review your cleaning requirements and prepare a tailored recommendation. Expect to hear from us within 1–2 business days."
                      onReset={() => setEvalStatus('idle')}
                    />
                  ) : (
                    <form onSubmit={handleEvalSubmit} className="space-y-5">
                      {/* Hidden Formspree fields */}
                      <input type="hidden" name="_subject" value="Process Evaluation Request — Magido USA Website" />

                      {/* Form intro */}
                      <div className="rounded-lg border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-4 py-3.5 text-sm text-[var(--color-text)] leading-relaxed">
                        Every evaluation request is reviewed by our sales team, who will follow up with a tailored recommendation based on your specific cleaning requirements. The more detail you provide, the more useful that recommendation will be.
                        Response times vary — if you need to connect sooner, prefer to talk it through first?{' '}
                        <a href="tel:8444624436" className="font-medium text-magido-orange hover:underline">
                          Call us at 844-462-4436
                        </a>
                        .
                      </div>

                      {/* Section: Contact Info */}
                      <SectionLabel label="Your Information" />

                      <div className="grid gap-5 sm:grid-cols-2">
                        <InputField label="Full Name" name="name" required placeholder="John Smith" />
                        <InputField label="Email" name="email" type="email" required placeholder="john@company.com" />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <InputField label="Phone" name="phone" type="tel" placeholder="(555) 123-4567" />
                        <InputField label="Company" name="company" placeholder="Company name" />
                      </div>

                      <SelectField
                        label="Industry"
                        name="industry"
                        options={[
                          { value: '', label: 'Select your industry' },
                          ...INDUSTRIES.map((ind) => ({
                            value: ind,
                            label: ind,
                          })),
                        ]}
                      />

                      {/* Section: Parts Info */}
                      <SectionLabel label="Parts & Cleaning Details" />

                      <TextareaField
                        label="Part Description"
                        name="part_description"
                        required
                        placeholder="Describe the parts you need to clean: material (steel, aluminum, cast iron, etc.), general shape, and typical batch size."
                        rows={3}
                      />

                      <div className="grid gap-5 sm:grid-cols-3">
                        <InputField label="Part Length" name="part_length" placeholder='e.g. 24"' />
                        <InputField label="Part Width" name="part_width" placeholder='e.g. 12"' />
                        <InputField label="Part Weight" name="part_weight" placeholder="e.g. 50 lbs" />
                      </div>

                      {/* Contaminants checkboxes */}
                      <CheckboxGroup
                        label="Contaminants to Remove"
                        name="contaminants"
                        options={CONTAMINANTS}
                      />

                      {/* Cleanliness level */}
                      <SelectField
                        label="Required Cleanliness Level"
                        name="cleanliness_level"
                        options={[
                          { value: '', label: 'Select level' },
                          ...CLEANLINESS_LEVELS.map((lvl) => ({
                            value: lvl,
                            label: lvl,
                          })),
                        ]}
                      />

                      <div className="grid gap-5 sm:grid-cols-2">
                        <InputField
                          label="Parts Per Hour / Batch Size"
                          name="throughput"
                          placeholder="e.g. 50 parts/hr or 10 per batch"
                        />
                        <SelectField
                          label="Current Cleaning Method"
                          name="current_method"
                          options={[
                            { value: '', label: 'Select current method' },
                            { value: 'Solvent / vapor degreaser', label: 'Solvent / vapor degreaser' },
                            { value: 'Manual hand washing', label: 'Manual hand washing' },
                            { value: 'Pressure washer', label: 'Pressure washer' },
                            { value: 'Existing aqueous washer', label: 'Existing aqueous washer' },
                            { value: 'No current process', label: 'No current process' },
                            { value: 'Other', label: 'Other' },
                          ]}
                        />
                      </div>

                      <TextareaField
                        label="Additional Requirements or Notes"
                        name="notes"
                        placeholder="Any special requirements: drying needs, space constraints, utilities available, budget range, etc."
                        rows={3}
                      />

                      <SelectField
                        label="How did you hear about Magido USA?"
                        name="referral_source"
                        options={[
                          { value: '', label: 'Select one (optional)' },
                          { value: 'Web search (Google, Bing, etc.)', label: 'Web search (Google, Bing, etc.)' },
                          { value: 'YouTube video', label: 'YouTube video' },
                          { value: 'Social media', label: 'Social media' },
                          { value: 'Trade show or industry event', label: 'Trade show or industry event' },
                          { value: 'Referral from colleague or distributor', label: 'Referral from colleague or distributor' },
                          { value: 'Magido Italy / magido.com', label: 'Magido Italy / magido.com' },
                          { value: 'Returning customer', label: 'Returning customer' },
                          { value: 'Other', label: 'Other' },
                        ]}
                      />

                      {/* Submit */}
                      <SubmitButton status={evalStatus} label="Submit Evaluation Request" />

                      {evalStatus === 'error' && <ErrorMessage />}
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* ─── Right Column: Contact Info ─── */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-6">
                {/* Direct contact card */}
                <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6">
                  <h2 className="font-display text-lg font-bold text-[var(--color-text)]">
                    Contact Us Directly
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                    Prefer to talk? Our team is available Monday through Friday.
                  </p>

                  <div className="mt-5 space-y-4">
                    <a
                      href="tel:8444624436"
                      className="flex items-center gap-3 rounded-lg bg-magido-blue px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-magido-blue-dark"
                    >
                      <Phone className="h-5 w-5 flex-shrink-0" />
                      <div>
                        <div>844-4MA-GIDO</div>
                        <div className="text-xs font-normal text-blue-200">
                          (844) 462-4436
                        </div>
                      </div>
                    </a>

                    <a
                      href="mailto:Sales@MagidoUSA.com"
                      className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] px-4 py-3 text-sm font-medium text-[var(--color-text)] transition-colors hover:border-magido-orange/30 hover:bg-[var(--color-bg-secondary)]"
                    >
                      <Mail className="h-5 w-5 flex-shrink-0 text-magido-orange" />
                      Sales@MagidoUSA.com
                    </a>
                  </div>
                </div>

                {/* Address card */}
                <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Visit Us
                  </h3>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-magido-orange" />
                      <span>
                        1500 S Sylvania Ave
                        <br />
                        Sturtevant, WI 53177
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                      <Clock className="h-4 w-4 flex-shrink-0 text-magido-orange" />
                      M–F 8:00 am – 5:00 pm (CST)
                    </div>
                  </div>
                </div>

                {/* Why Magido card */}
                <div className="rounded-xl border border-magido-orange/20 bg-magido-orange/5 p-6">
                  <h3 className="font-display text-sm font-bold text-magido-orange">
                    Why Choose Magido?
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--color-text-secondary)]">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-magido-orange" />
                      100% AISI 304 stainless steel construction
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-magido-orange" />
                      Engineered and manufactured in Italy
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-magido-orange" />
                      84 models across 7 product categories
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-magido-orange" />
                      Free parts cleaning process evaluation
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-magido-orange" />
                      US-based sales, service & support
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Export with Suspense boundary for useSearchParams ───
export default function ContactPage() {
  return (
    <Suspense fallback={<ContactPageSkeleton />}>
      <ContactPageInner />
    </Suspense>
  );
}

// ─── Skeleton while searchParams load ───
function ContactPageSkeleton() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-magido-orange" />
    </div>
  );
}

// ═══════════════════════════════════════════════════
// SHARED FORM COMPONENTS
// ═══════════════════════════════════════════════════

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="border-b border-[var(--color-border-light)] pb-1 pt-3">
      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
        {label}
      </h3>
    </div>
  );
}

function InputField({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
        {label}
        {required && <span className="ml-0.5 text-magido-orange">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] transition-colors focus:border-magido-orange focus:outline-none focus:ring-1 focus:ring-magido-orange"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
        {label}
        {required && <span className="ml-0.5 text-magido-orange">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-text)] transition-colors focus:border-magido-orange focus:outline-none focus:ring-1 focus:ring-magido-orange"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({
  label,
  name,
  required = false,
  placeholder,
  rows = 4,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
        {label}
        {required && <span className="ml-0.5 text-magido-orange">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] transition-colors focus:border-magido-orange focus:outline-none focus:ring-1 focus:ring-magido-orange"
      />
    </div>
  );
}

function CheckboxGroup({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-[var(--color-text)]">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((opt) => (
          <label
            key={opt}
            className="checkbox-group-label flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--color-border-light)] px-3 py-2 text-sm text-[var(--color-text-secondary)] has-[:checked]:border-magido-orange/40 has-[:checked]:bg-magido-orange/5 has-[:checked]:text-[var(--color-text)]"
          >
            <input
              type="checkbox"
              name={name}
              value={opt}
              className="h-4 w-4 rounded border-[var(--color-border)] text-magido-orange accent-magido-orange"
            />
            {opt}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function SubmitButton({
  status,
  label,
}: {
  status: SubmitStatus;
  label: string;
}) {
  return (
    <button
      type="submit"
      disabled={status === 'submitting'}
      className="mx-auto flex items-center gap-2 rounded-lg bg-magido-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {status === 'submitting' ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="h-4 w-4" />
          {label}
        </>
      )}
    </button>
  );
}

function SuccessMessage({
  title,
  message,
  onReset,
}: {
  title: string;
  message: string;
  onReset: () => void;
}) {
  return (
    <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center dark:border-green-900/50 dark:bg-green-950/30">
      <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
      <h3 className="mt-4 font-display text-xl font-bold text-green-800 dark:text-green-300">
        {title}
      </h3>
      <p className="mt-2 text-sm text-green-700 dark:text-green-400">
        {message}
      </p>
      <button
        onClick={onReset}
        className="mt-6 text-sm font-medium text-green-600 underline underline-offset-2 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
      >
        Submit another request
      </button>
    </div>
  );
}

function ErrorMessage() {
  return (
    <p className="mt-2 text-sm text-red-500">
      Something went wrong. Please try again, or contact us directly at{' '}
      <a href="mailto:Sales@MagidoUSA.com" className="font-medium underline">
        Sales@MagidoUSA.com
      </a>{' '}
      or{' '}
      <a href="tel:8444624436" className="font-medium underline">
        844-4MA-GIDO
      </a>
      .
    </p>
  );
}

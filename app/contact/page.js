import { ArrowRight, Mail, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Contact Codernatix",
  description: "Talk to Codernatix about your next digital product or software project.",
};

export default function Page() {
  return (
    <div className="site-container grid gap-12 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600">Start a conversation</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">Tell us what you’re building.</h1>
        <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">Share a little context and we’ll get back to you with thoughtful next steps—not a generic sales pitch.</p>
        <div className="mt-10 space-y-4 text-sm text-slate-600">
          <p className="flex items-center gap-3"><Mail size={18} className="text-blue-600" /> hello@codernatix.com</p>
          <p className="flex items-center gap-3"><MessageSquare size={18} className="text-blue-600" /> Usually replies within one business day</p>
        </div>
      </div>
      <form className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-9">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">Name<input required name="name" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500" /></label>
          <label className="text-sm font-medium text-slate-700">Email<input required type="email" name="email" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500" /></label>
        </div>
        <label className="mt-5 block text-sm font-medium text-slate-700">What can we help with?<textarea required name="message" rows="6" className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500" /></label>
        <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Send enquiry <ArrowRight size={16} /></button>
      </form>
    </div>
  );
}

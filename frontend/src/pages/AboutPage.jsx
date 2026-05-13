export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 animate-fade-up stagger-1">
      <span className="inline-block text-xs font-medium text-[var(--color-text-muted)] bg-[var(--color-bg)] border border-[var(--color-border)] px-3 py-1 rounded-full mb-6">
        About us
      </span>
      <h1 className="font-display text-4xl md:text-5xl font-normal leading-tight text-[var(--color-text)] mb-6">
        We write about design, product, and the web.
      </h1>
      <p className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-6">
        Beyond UI is a blog platform for designers, developers, and product thinkers. We curate and publish in-depth articles on UI/UX, SaaS, and modern product development.
      </p>
      <p className="text-[var(--color-text-muted)] leading-relaxed">
        Our mission is to share knowledge, inspire creativity, and help teams build better digital experiences. Whether you're a seasoned designer or just starting out, there's something here for you.
      </p>
    </main>
  );
}

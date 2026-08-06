export default function Section({ title, children }) {
  return (
    <section className="mb-14">
      <h2 className="text-3xl font-bold mb-6">
        {title}
      </h2>

      {children}
    </section>
  );
}
export default function HorizontalScroll({ children }) {
  return (
    <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
      {children}
    </div>
  );
}
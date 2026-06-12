export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onChange(cat.id)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            active === cat.id
              ? "bg-ocean-600 text-white shadow-md"
              : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-ocean-50 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

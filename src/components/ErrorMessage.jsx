import { AlertCircle } from "lucide-react";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="card-surface flex flex-col items-center gap-4 p-8 text-center">
      <AlertCircle className="h-12 w-12 text-coral-500" />
      <div>
        <h3 className="font-display text-xl font-bold dark:text-white">Something went wrong</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{message}</p>
      </div>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-primary">
          Try Again
        </button>
      )}
    </div>
  );
}

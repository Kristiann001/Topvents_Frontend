import { toast } from "react-hot-toast";
import { AlertTriangle, X } from "lucide-react";

export const confirmDelete = ({ title, onConfirm }) => {
  toast.custom(
    (t) => (
      <div className="flex flex-col gap-4 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20 max-w-sm w-full animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Delete Item?</h3>
            <p className="text-gray-500 text-sm mt-1 leading-relaxed">
              Are you sure you want to delete <strong>{title}</strong>? This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              onConfirm();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-lg shadow-red-500/30 transition-all transform hover:-translate-y-0.5"
          >
            Delete
          </button>
        </div>

        <button 
           onClick={() => toast.dismiss(t.id)}
           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    ),
    { duration: Infinity, position: "top-center" }
  );
};

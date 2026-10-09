import React from 'react';
import { Star, CheckCircle, Trash2, ThumbsUp } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminReviews: React.FC = () => {
  const { reviews } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900 font-heading">
          Product Reviews & Ratings
        </h2>
        <p className="text-xs text-slate-500">
          Monitor feedback submitted by verified customers across all items
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{r.customerName}</h4>
                <p className="text-[11px] text-slate-400">Reviewed on {r.productName}</p>
              </div>
              <div className="flex items-center text-amber-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl italic">
              "{r.comment}"
            </p>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" /> Verified Purchase
              </span>
              <span>{r.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Star, X, Check, Sparkles, ThumbsUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Booking } from '../types';
import { TechAvatar } from './TechAvatar';

interface RatingReviewModalProps {
  booking: Booking;
  onClose: () => void;
  onSubmitReview: (reviewData: { rating: number; comment: string; compliments: string[]; tipAmount: number }) => void;
}

const COMPLIMENT_OPTIONS = [
  'Arrived Right on Time',
  'Ice Cold AC Restored Fast',
  'Clear Technical Explanation',
  'Wore Shoe Booties Indoors',
  'Upfront Fair Pricing',
  'Spotless Workspace Cleanup',
];

export const RatingReviewModal: React.FC<RatingReviewModalProps> = ({
  booking,
  onClose,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedCompliments, setSelectedCompliments] = useState<string[]>([
    'Arrived Right on Time',
    'Ice Cold AC Restored Fast',
    'Upfront Fair Pricing',
  ]);
  const [comment, setComment] = useState<string>(
    'Marcus arrived quickly with the exact capacitor in his truck. System was tested thoroughly and now blowing 54° air. Completely transparent price!'
  );

  const toggleCompliment = (item: string) => {
    setSelectedCompliments((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    onSubmitReview({
      rating,
      comment: comment.trim(),
      compliments: selectedCompliments,
      tipAmount: booking.paymentInfo?.tipAmount || 0,
    });
  };

  const getRatingLabel = (score: number) => {
    switch (score) {
      case 5:
        return 'Outstanding — Exceptional field expertise!';
      case 4:
        return 'Very Good — Thorough and professional';
      case 3:
        return 'Average — Service completed as expected';
      case 2:
        return 'Below Expectations — Some issues arose';
      case 1:
        return 'Poor — Needs improvement';
      default:
        return 'Select a rating';
    }
  };

  const activeRating = hoverRating || rating;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TechAvatar
              seed={booking.technicianAvatarSeed}
              name={booking.technicianName}
              size="md"
              isAvailable={true}
            />
            <div>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Rate & Review Technician</span>
              </div>
              <h2 className="text-base font-bold text-white">
                How was your experience with {booking.technicianName}?
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close review"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Interactive Star Rating */}
          <div className="text-center py-2">
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-slate-300 hover:scale-125 transition-transform cursor-pointer focus:outline-none"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`w-9 h-9 ${
                      star <= activeRating
                        ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="text-xs font-semibold text-slate-700 mt-2 font-mono-numbers">
              {getRatingLabel(activeRating)}
            </div>
          </div>

          {/* Compliment Tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              What went great? (Tap all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {COMPLIMENT_OPTIONS.map((tag) => {
                const isSelected = selectedCompliments.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleCompliment(tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-blue-50 border-blue-500 text-blue-900 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-blue-600" />}
                    <span>{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Written feedback */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Write a Review for {booking.technicianName}
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="Tell other homeowners about technician arrival, speed, and quality of work..."
              className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900 leading-relaxed"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Your verified review helps maintain our premier technician network standards.
            </p>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Submit Verified Review</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

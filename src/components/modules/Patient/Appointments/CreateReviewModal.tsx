import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/services/review.services";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { updateReview } from "@/services/review.services";
import { TReview } from "@/types/appointment.types";

interface CreateReviewModalProps {
  appointmentId: string | null;
  initialReview?: TReview | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateReviewModal = ({
  appointmentId,
  initialReview,
  open,
  onOpenChange,
}: CreateReviewModalProps) => {
  const queryClient = useQueryClient();
  const [hoveredRating, setHoveredRating] = useState(0);

  const reviewMutation = useMutation({
    mutationFn: (payload: any) => {
      if (initialReview) {
        return updateReview(initialReview.id, payload);
      }
      return createReview(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-appointments"] });
      toast.success(initialReview ? "Review updated successfully" : "Review submitted successfully");
      onOpenChange(false);
      form.reset();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to submit review");
    },
  });

  const form = useForm({
    defaultValues: {
      rating: initialReview?.rating || 5,
      comment: initialReview?.comment || "",
    },
    onSubmit: async ({ value }) => {
      if (!appointmentId) return;
      
      const payload: any = {
        rating: value.rating,
        comment: value.comment,
      };

      if (!initialReview) {
        payload.appointmentId = appointmentId;
      }

      reviewMutation.mutate(payload);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]" key={appointmentId || "new"}>
        <DialogHeader>
          <DialogTitle>
            {initialReview ? "Update Your Review" : "Rate Your Experience"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6 pt-4"
        >
          <form.Field name="rating">
            {(field) => (
              <div className="flex flex-col items-center gap-3">
                <Label className="text-base">Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="transition-transform hover:scale-110 focus:outline-none"
                      onClick={() => field.handleChange(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                    >
                      <Star
                        className={cn(
                          "h-10 w-10 transition-colors",
                          (hoveredRating || field.state.value) >= star
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground/30"
                        )}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {field.state.value === 5
                    ? "Excellent!"
                    : field.state.value === 4
                    ? "Good"
                    : field.state.value === 3
                    ? "Average"
                    : field.state.value === 2
                    ? "Poor"
                    : "Very Poor"}
                </p>
              </div>
            )}
          </form.Field>

          <form.Field name="comment">
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name}>Your Feedback</Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Tell us about your experience with the doctor..."
                  rows={4}
                  required
                />
              </div>
            )}
          </form.Field>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={reviewMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={reviewMutation.isPending}
            >
              {reviewMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {initialReview ? "Updating..." : "Submitting..."}
                </>
              ) : (
                initialReview ? "Update Review" : "Submit Review"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReviewModal;

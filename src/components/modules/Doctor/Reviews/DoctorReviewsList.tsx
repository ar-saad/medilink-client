"use client";

import { getMyReviews } from "@/services/review.services";
import { useQuery } from "@tanstack/react-query";
import { Star, User, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DoctorReviewsList = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["doctor-reviews"],
    queryFn: () => getMyReviews(),
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const reviews = response?.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Patient Reviews</h2>
        <p className="text-muted-foreground">
          Feedback and ratings from patients you have consulted.
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground border-2 border-dashed rounded-2xl">
          No reviews received yet.
        </div>
      ) : (
        <div className="grid gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="overflow-hidden border-none bg-muted/20">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage src={review.patient?.profilePhoto} />
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{review.patient?.name}</CardTitle>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(review.createdAt), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed italic text-muted-foreground">
                  "{review.comment}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorReviewsList;

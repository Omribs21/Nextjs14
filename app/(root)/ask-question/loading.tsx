import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <div className="">
        <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
      </div>
      <div className="mt-9">
        <Skeleton className="mb-10 flex w-full" />
      </div>
    </section>
  );
};

export default Loading;

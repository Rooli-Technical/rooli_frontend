import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="w-full">
        <h1 className="font-serif text-2xl md:text-3xl xl:text-4xl font-bold text-foreground mb-2">
          {title}
        </h1>
        <p className="text-sm lg:text-lg text-muted-foreground">
          {description}
        </p>
      </div>

      {/* <Button className="bg-primary hover:bg-primary/90 px-6 py-3 h-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <Plus className="mr-2 h-5 w-5" />
        Create Post
      </Button> */}
    </div>
  );
}

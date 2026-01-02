import React from "react";

export default function PageLoader() {
  return (
    <div className="w-full h-full bg-primary/10 flex items-center justify-center min-h-screen">
      <div className="flex items-center justify-center space-x-2 mb-8 animate-pulse duration-100 ease-in-out">
        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xl">R</span>
        </div>
        <span className="font-serif font-bold text-2xl text-foreground">
          Rooli
        </span>
      </div>
    </div>
  );
}

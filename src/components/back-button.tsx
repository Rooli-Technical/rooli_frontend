"use client";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useProgressBarRouter } from "@/hooks/use-progress-bar-router";

export default function BackButton() {
  const router = useProgressBarRouter();

  return (
    <Button onClick={() => router.back()} className="w-fit">
      <ArrowLeftIcon className="mr-1 h-4 w-4" />
      <p>Go Back</p>
    </Button>
  );
}

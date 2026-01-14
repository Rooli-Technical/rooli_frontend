"use client";
import PageLoader from "@/components/page-loader";
import { useProgressBarRouter } from "@/hooks/use-progress-bar-router";
import { useAppStore } from "@/store/app-store";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  const nextRoute = searchParams.get("next");
  const router = useProgressBarRouter();

  const { setAccessToken, setRefreshToken } = useAppStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (accessToken && refreshToken) {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
      }

      if (nextRoute) {
        router.push(nextRoute);
      }
    }
  }, [accessToken, refreshToken, isMounted]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center justify-center space-x-2 mb-2">
        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xl">R</span>
        </div>
        <span className="font-serif font-bold text-2xl text-foreground">
          Rooli
        </span>
      </div>
      <h2 className="text-lg font-semibold mb-2">Rooli is authenticating...</h2>
    </div>
  );
}

export default function GoogleSuccessPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Page />
    </Suspense>
  );
}

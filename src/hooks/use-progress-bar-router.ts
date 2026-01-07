import { useRouter as useNextRouter } from "next/navigation";
import NProgress from "nprogress";

export function useProgressBarRouter() {
  const router = useNextRouter();

  const push = (href: string, options?: any) => {
    NProgress.start();
    router.push(href, options);
  };

  const replace = (href: string, options?: any) => {
    NProgress.start();
    router.replace(href, options);
  };
  const back = () => {
    NProgress.start();
    router.back();
  };

  return { ...router, push, replace, back };
}

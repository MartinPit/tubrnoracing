import { useCallback } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

interface Props {
  root: string;
  slugs: string[];
  elements: string[];
}

export function useSmoothNavigate({
  root,
  slugs,
  elements
}: Props) {
  const router = useRouter();

  const smoothNavigate = useCallback((newSlugs: string[]) => {
    if (slugs === newSlugs) return;
    gsap.killTweensOf(elements);

    gsap.to(elements, {
      opacity: 0,
      y: -20,
      scale: 0.95,
      duration: 0.4,
      stagger: 0.03,
      ease: "power2.in",
      onComplete: () => {
        router.push(`${root}/${newSlugs.join("/")}`);
      }
    });
  }, [router, slugs, elements]);

  return { smoothNavigate };
}

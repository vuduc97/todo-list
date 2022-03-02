import { FC, useEffect, useRef } from "react";
import classes from "./fade.module.scss";

interface FadeProps {
  fadeOut: boolean;
  duration?: number;
  className?: string;
  onFadedOut?: () => void;
}

export const Fade: FC<FadeProps> = ({ children, className, duration = 300, onFadedOut, fadeOut }) => {
  const containerElement = useRef<HTMLDivElement | null>(null);

  const classNames = `${classes["fade__container"]}${className ? ` ${className}` : ""}`;

  useEffect(() => {
    if (!fadeOut) {
      return;
    }

    const container = containerElement.current!;
    const containerHeight = container.offsetHeight;
    const containerMarginTop = container.style.marginTop;
    const containerMarginBottom = container.style.marginBottom;

    // Incase browser does not support animate API
    if (typeof container.animate !== "function") {
      onFadedOut?.();
      return;
    }

    const animate = container.animate(
      [
        {
          opacity: 1,
          height: `${containerHeight}px`,
        },
        {
          offset: Number((250 / (duration + 250)).toFixed(2)),
          opacity: 0,
          height: `${containerHeight}px`,
          marginTop: containerMarginTop,
          marginBottom: containerMarginBottom,
          overflow: "hidden",
        },
        {
          opacity: 0,
          height: 0,
          marginTop: 0,
          marginBottom: 0,
          display: "none",
          overflow: "hidden",
        },
      ],
      { duration: duration + 250, easing: "ease-in-out" },
    );

    function handleAnimationEnd() {
      container.style.display = "none";

      onFadedOut?.();
    }

    animate.addEventListener("finish", handleAnimationEnd);

    return () => {
      animate.removeEventListener("finish", handleAnimationEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fadeOut, duration]);

  return (
    <div
      style={{
        animationDuration: `${duration}ms`,
      }}
      ref={containerElement}
      className={classNames}
    >
      {children}
    </div>
  );
};

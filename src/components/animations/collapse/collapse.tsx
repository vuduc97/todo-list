import { FC, useEffect, useRef, useState } from "react";
import classes from "./collapse.module.scss";

interface CollapseProps {
  expand: boolean;
  duration?: number;
}

export const Collapse: FC<CollapseProps> = ({ children, duration = 300, expand }) => {
  // Control display of content element
  const [internalExpand, setInternalExpand] = useState(expand);
  const [styles, setStyle] = useState<React.CSSProperties | undefined>();

  const containerElement = useRef<HTMLElement | null>(null);
  const contentElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!expand || !internalExpand) {
      return;
    }

    // Incase collapse animation is running and user trigger expand animation
    handleExpand();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expand, internalExpand]);

  useEffect(() => {
    if (expand) {
      setInternalExpand(true);
      return;
    }

    if (!contentElement.current) {
      return;
    }

    const container = containerElement.current!;

    const handleTransitionEnd = handleCollapse(container);

    return () => {
      container.removeEventListener("transitionend", handleTransitionEnd);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expand]);

  useEffect(() => {
    if (!internalExpand) {
      return;
    }

    handleExpand();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalExpand]);

  function handleExpand() {
    // Do nothing when content element has not rendered
    if (!contentElement.current) {
      return;
    }

    setStyle({
      transitionDuration: `${duration}ms`,
      height: `${contentElement.current.offsetHeight}px`,
    });
  }

  function handleCollapse(container: HTMLElement) {
    setStyle({
      transitionDuration: `${duration}ms`,
    });

    function handleTransitionEnd() {
      setStyle(undefined);
      setInternalExpand(false);
    }

    container.addEventListener("transitionend", handleTransitionEnd);

    return handleTransitionEnd;
  }

  return (
    <section ref={containerElement} style={styles} className={classes["collapse__container"]}>
      {internalExpand && <div ref={contentElement}>{children}</div>}
    </section>
  );
};

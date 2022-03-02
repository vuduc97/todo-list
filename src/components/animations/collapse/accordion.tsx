import { FC, useEffect, useRef, useState } from "react";
import classes from "./accordion.module.scss";

interface AccordionProps {
  expand: boolean;
  duration?: number;
}

enum AccordionStatus {
  Expanding,
  Expanded,
  PreCollapsing,
  Collapsing,
  Collapsed,
}

export const Accordion: FC<AccordionProps> = ({ children, duration = 350, expand }) => {
  const [accordionType, setAccordionStatus] = useState<AccordionStatus>(
    expand ? AccordionStatus.Expanded : AccordionStatus.Collapsed,
  );

  const containerElement = useRef<HTMLElement | null>(null);
  const contentElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (expand) {
      const container = containerElement.current!;
      const eventListener = handleAfterExpand(container);
      setAccordionStatus(AccordionStatus.Expanding);

      return () => {
        container.removeEventListener("transitionend", eventListener);
      };
    }

    if (!contentElement.current) {
      return;
    }

    setAccordionStatus(AccordionStatus.PreCollapsing);
  }, [expand]);

  useEffect(() => {
    if (accordionType === AccordionStatus.PreCollapsing) {
      const id = setTimeout(() => {
        setAccordionStatus(AccordionStatus.Collapsing);
      }, 50);

      return () => clearTimeout(id);
    }

    if (accordionType === AccordionStatus.Collapsing) {
      const container = containerElement.current!;
      const eventListener = handleAfterCollapse(container);

      return () => {
        container.removeEventListener("transitionend", eventListener);
      };
    }
  }, [accordionType]);

  function handleAfterExpand(container: HTMLElement) {
    function handleTransitionEnd() {
      setAccordionStatus(AccordionStatus.Expanded);
    }

    container.addEventListener("transitionend", handleTransitionEnd);

    return handleTransitionEnd;
  }

  function handleAfterCollapse(container: HTMLElement) {
    function handleTransitionEnd() {
      setAccordionStatus(AccordionStatus.Collapsed);
    }

    container.addEventListener("transitionend", handleTransitionEnd);

    return handleTransitionEnd;
  }

  function getStyle(): React.CSSProperties | undefined {
    switch (accordionType) {
      case AccordionStatus.Expanding: {
        if (!contentElement.current) {
          return undefined;
        }

        return {
          transitionDuration: `${duration}ms`,
          height: `${contentElement.current.offsetHeight}px`,
        };
      }
      case AccordionStatus.Expanded: {
        return {
          height: "auto",
        };
      }
      case AccordionStatus.PreCollapsing: {
        if (!contentElement.current) {
          return undefined;
        }

        return {
          transitionDuration: `${duration}ms`,
          height: `${contentElement.current?.offsetHeight}px`,
        };
      }
      case AccordionStatus.Collapsing:
        return {
          transitionDuration: `${duration}ms`,
        };
      case AccordionStatus.Collapsed:
      default: {
        return undefined;
      }
    }
  }

  const isDisplay = accordionType !== AccordionStatus.Collapsed || expand;

  return (
    <section ref={containerElement} style={getStyle()} className={classes["accordion__container"]}>
      {isDisplay && <div ref={contentElement}>{children}</div>}
    </section>
  );
};

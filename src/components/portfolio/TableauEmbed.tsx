import { useEffect, useRef } from "react";

const CANVAS_WIDTH = 1250;
const CANVAS_HEIGHT = 827;

export function TableauEmbed() {
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frameElement = frame.current;
    const canvasElement = canvas.current;
    if (!frameElement || !canvasElement) return;

    // Keep Tableau on its desktop layout; resize the outer presentation instead.
    const resize = () => {
      const scale = frameElement.clientWidth / CANVAS_WIDTH;
      canvasElement.style.transform = `scale(${scale})`;
      frameElement.style.height = `${CANVAS_HEIGHT * scale}px`;
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(frameElement);

    canvasElement.innerHTML = `<div class="tableauPlaceholder" style="position:relative;width:1250px;height:827px"><object class="tableauViz" style="display:none;width:1250px;height:827px"><param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" /><param name="embed_code_version" value="3" /><param name="path" value="views/MaritimeOperationsCommandCenter/OperationsCommandCenter?:language=en-US&amp;:embed=true&amp;:sid=&amp;:redirect=auth" /><param name="toolbar" value="yes" /><param name="static_image" value="https://public.tableau.com/static/images/Ma/MaritimeOperationsCommandCenter/OperationsCommandCenter/1.png" /><param name="animate_transition" value="yes" /><param name="display_static_image" value="yes" /><param name="display_spinner" value="yes" /><param name="display_overlay" value="yes" /><param name="display_count" value="yes" /><param name="language" value="en-US" /></object></div>`;
    const objectElement = canvasElement.querySelector("object");
    if (objectElement?.parentNode) {
      const script = document.createElement("script");
      script.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
      script.async = true;
      objectElement.parentNode.insertBefore(script, objectElement);
    }

    return () => {
      observer.disconnect();
      canvasElement.replaceChildren();
    };
  }, []);

  return (
    <div ref={frame} className="relative mx-auto aspect-[1250/827] w-full max-w-[900px] overflow-hidden rounded-xl border border-border bg-background" aria-label="Maritime Operations Command Center dashboard">
      <div ref={canvas} className="absolute left-0 top-0 h-[827px] w-[1250px] origin-top-left" />
    </div>
  );
}
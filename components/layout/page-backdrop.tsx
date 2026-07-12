import type { ReactNode } from "react";

import { LineWaves } from "../shaders/line-waves";

export function PageBackdrop(): ReactNode {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 md:opacity-30 dark:opacity-30">
        <LineWaves
          brightness={0.075}
          color1="#ffffff"
          color2="#f2f2f2"
          color3="#ffffff"
          colorCycleSpeed={0.28}
          edgeFadeWidth={0.12}
          enableMouseInteraction={false}
          innerLineCount={28}
          outerLineCount={34}
          rotation={-38}
          speed={0.12}
          warpIntensity={0.6}
        />
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */

declare module "react-lottie-player" {
  import * as React from "react";
  export type LottieProps = {
    animationData?: any;
    loop?: boolean;
    play?: boolean;
    style?: React.CSSProperties;
    [key: string]: any;
  };
  const Lottie: React.ComponentType<LottieProps>;
  export default Lottie;
}

declare module "*.json" {
  const value: any;
  export default value;
}

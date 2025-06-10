// Custom easing functions for smooth animations

// Exponential easing functions
export const expo = {
  in: (t: number): number => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  out: (t: number): number => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  inOut: (t: number): number => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t *= 2) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
    return 0.5 * (-Math.pow(2, -10 * --t) + 2);
  }
};

// Cubic easing functions
export const cubic = {
  in: (t: number): number => t * t * t,
  out: (t: number): number => --t * t * t + 1,
  inOut: (t: number): number => {
    if ((t *= 2) < 1) return 0.5 * t * t * t;
    return 0.5 * ((t -= 2) * t * t + 2);
  }
};

// Quartic easing functions
export const quart = {
  in: (t: number): number => t * t * t * t,
  out: (t: number): number => 1 - --t * t * t * t,
  inOut: (t: number): number => {
    if ((t *= 2) < 1) return 0.5 * t * t * t * t;
    return -0.5 * ((t -= 2) * t * t * t - 2);
  }
};

// Quintic easing functions
export const quint = {
  in: (t: number): number => t * t * t * t * t,
  out: (t: number): number => --t * t * t * t * t + 1,
  inOut: (t: number): number => {
    if ((t *= 2) < 1) return 0.5 * t * t * t * t * t;
    return 0.5 * ((t -= 2) * t * t * t * t + 2);
  }
};

// Sine easing functions
export const sine = {
  in: (t: number): number => 1 - Math.cos(t * Math.PI / 2),
  out: (t: number): number => Math.sin(t * Math.PI / 2),
  inOut: (t: number): number => -0.5 * (Math.cos(Math.PI * t) - 1)
};

// Circular easing functions
export const circ = {
  in: (t: number): number => 1 - Math.sqrt(1 - t * t),
  out: (t: number): number => Math.sqrt(1 - --t * t),
  inOut: (t: number): number => {
    if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);
    return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
  }
};

// Back easing functions (with overshoot)
export const back = {
  in: (t: number): number => {
    const s = 1.70158;
    return t * t * ((s + 1) * t - s);
  },
  out: (t: number): number => {
    const s = 1.70158;
    return --t * t * ((s + 1) * t + s) + 1;
  },
  inOut: (t: number): number => {
    const s = 1.70158 * 1.525;
    if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s));
    return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
  }
};

// Elastic easing functions
export const elastic = {
  in: (t: number): number => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    const p = 0.3;
    const s = p / 4;
    return -(Math.pow(2, 10 * --t) * Math.sin((t - s) * (2 * Math.PI) / p));
  },
  out: (t: number): number => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    const p = 0.3;
    const s = p / 4;
    return Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
  },
  inOut: (t: number): number => {
    if (t === 0) return 0;
    if ((t *= 2) === 2) return 1;
    const p = 0.3 * 1.5;
    const s = p / 4;
    if (t < 1) return -0.5 * (Math.pow(2, 10 * --t) * Math.sin((t - s) * (2 * Math.PI) / p));
    return Math.pow(2, -10 * --t) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
  }
};

// Bounce easing functions
export const bounce = {
  in: (t: number): number => 1 - bounce.out(1 - t),
  out: (t: number): number => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  },
  inOut: (t: number): number => {
    if (t < 0.5) return bounce.in(t * 2) * 0.5;
    return bounce.out(t * 2 - 1) * 0.5 + 0.5;
  }
};

// Utility function to interpolate between values
export function interpolate(
  start: number,
  end: number,
  progress: number,
  easingFunction: (t: number) => number = (t) => t
): number {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const easedProgress = easingFunction(clampedProgress);
  return start + (end - start) * easedProgress;
}

// Clamp function for values
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

// Map a value from one range to another
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  easingFunction?: (t: number) => number
): number {
  const progress = (value - inMin) / (inMax - inMin);
  const clampedProgress = clamp(progress, 0, 1);
  
  if (easingFunction) {
    return interpolate(outMin, outMax, clampedProgress, easingFunction);
  }
  
  return outMin + (outMax - outMin) * clampedProgress;
}

// Framer Motion compatible easing arrays
export const framerEasing = {
  expo: {
    in: [0.95, 0.05, 0.795, 0.035],
    out: [0.19, 1, 0.22, 1],
    inOut: [1, 0, 0, 1] // Custom bezier for expo.inOut
  },
  cubic: {
    in: [0.32, 0, 0.67, 0],
    out: [0.33, 1, 0.68, 1],
    inOut: [0.65, 0, 0.35, 1]
  },
  back: {
    in: [0.36, 0, 0.66, -0.56],
    out: [0.34, 1.56, 0.64, 1],
    inOut: [0.68, -0.6, 0.32, 1.6]
  }
};

// Default exports for common use
export default {
  expo,
  cubic,
  quart,
  quint,
  sine,
  circ,
  back,
  elastic,
  bounce,
  interpolate,
  clamp,
  mapRange,
  framerEasing
}; 
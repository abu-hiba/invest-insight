export const round2Dp = (n: number): number =>
    Math.round((n + Number.EPSILON) * 100) / 100
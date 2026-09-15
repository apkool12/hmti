// Mobbin-derived monochrome tokens. One accent, no shadows, pills everywhere.
export const theme = {
  color: {
    ink: "#141414", inkSoft: "#262626",
    canvas: "#ffffff", canvasSoft: "#f3f3f3", field: "#f0f0f0", page: "#f4f5f7",
    hairlineSoft: "#f0f0f0", hairline: "#e0e0e0",
    muted: "#707070", faint: "#adadad",
    accent: "#C8385A", brand: "#C8385A", brandSoft: "#FCE9EE", brandTint: "#F5C3CF", overlay: "rgba(115,115,115,0.56)",
  },
  radius: { xs: 10, sm: 14, md: 20, full: 9999 },
  space: { xxs: 4, xs: 8, sm: 12, md: 16, lg: 24, xl: 32, xxl: 48, section: 80 },
  weight: { light: 300, book: 450, semi: 600, heavy: 650 },
  font: `"Pretendard JP Variable", "Pretendard Variable", Pretendard, -apple-system, "Helvetica Neue", Arial, sans-serif`,
} as const;
export type Theme = typeof theme;

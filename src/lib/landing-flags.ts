function asBool(value: string | undefined, fallback: boolean) {
  if (value == null) return fallback;
  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  return fallback;
}

function asHeroVariant(value: string | undefined, fallback: "control" | "creative") {
  const normalized = value?.trim().toLowerCase();
  if (normalized === "control" || normalized === "creative") return normalized;
  return fallback;
}

const croEnabled = asBool(process.env.NEXT_PUBLIC_CRO_MODE, true);

export const landingFlags = {
  croEnabled,
  enableIntentMatching:
    croEnabled && asBool(process.env.NEXT_PUBLIC_ENABLE_INTENT_MATCHING, true),
  enableHeroAbQuery:
    croEnabled && asBool(process.env.NEXT_PUBLIC_ENABLE_HERO_AB_QUERY, true),
  showMobileStickyCta:
    croEnabled && asBool(process.env.NEXT_PUBLIC_SHOW_MOBILE_STICKY_CTA, true),
  defaultHeroVisual: asHeroVariant(
    process.env.NEXT_PUBLIC_HERO_VISUAL_DEFAULT,
    "creative"
  ),
};

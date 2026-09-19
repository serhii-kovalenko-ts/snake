import en from "../assets/localization/en.json";

type LocalizationKey = keyof typeof en;

export function getText(key: LocalizationKey, params?: Record<string, string | number>): string {
  let text = en[key];

  if (!params) {
    return text;
  }

  for (const [name, value] of Object.entries(params)) {
    text = text.replace(`{${name}}`, String(value));
  }

  return text;
}

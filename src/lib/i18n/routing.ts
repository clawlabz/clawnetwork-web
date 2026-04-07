import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh", "ja", "ko", "ru", "tr", "es", "pt", "hi", "id", "vi", "fr"],
  defaultLocale: "en",
});

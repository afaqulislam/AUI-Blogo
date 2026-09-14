"use client";

import { useEffect } from "react";

const SCHEME_KEY = "sanityStudio:ui:colorScheme";
const THEME_KEY = "theme";

let storagePatched = false;

const resolveSystem = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const getItem = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const setItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
};

const applyClass = (theme: string) => {
  const dark = theme === "dark" || (theme === "system" && resolveSystem() === "dark");
  document.documentElement.classList.toggle("dark", dark);
};

export const AdminThemeSync = () => {
  useEffect(() => {
    const onSanityChange = () => {
      const sanity = getItem(SCHEME_KEY);
      if (!sanity) return;
      applyClass(sanity);
      if (getItem(THEME_KEY) !== sanity) setItem(THEME_KEY, sanity);
    };

    const onSiteChange = () => {
      const site = getItem(THEME_KEY);
      if (!site) return;
      applyClass(site);
      if (getItem(SCHEME_KEY) !== site) setItem(SCHEME_KEY, site);
    };

    const onSystemChange = () => applyClass(getItem(THEME_KEY) ?? "system");

    if (!storagePatched) {
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key: string, value: string) {
        const result = original.call(this, key, value);
        if (key === SCHEME_KEY) {
          window.dispatchEvent(new Event("aui:scheme-change"));
        } else if (key === THEME_KEY) {
          window.dispatchEvent(new Event("aui:theme-change"));
        }
        return result;
      };
      storagePatched = true;
    }

    const site = getItem(THEME_KEY);
    const sanity = getItem(SCHEME_KEY);
    const initial = site ?? sanity ?? "system";
    applyClass(initial);
    if (getItem(THEME_KEY) !== initial) setItem(THEME_KEY, initial);
    if (getItem(SCHEME_KEY) !== initial) setItem(SCHEME_KEY, initial);

    window.addEventListener("aui:scheme-change", onSanityChange);
    window.addEventListener("aui:theme-change", onSiteChange);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    if (mq.addEventListener) {
      mq.addEventListener("change", onSystemChange);
    }
    return () => {
      window.removeEventListener("aui:scheme-change", onSanityChange);
      window.removeEventListener("aui:theme-change", onSiteChange);
      if (mq.removeEventListener) {
        mq.removeEventListener("change", onSystemChange);
      }
    };
  }, []);

  return null;
};
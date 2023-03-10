import { onLanguageSelect, setAvailableLanguages, setParams, Params } from "@navikt/nav-dekoratoren-moduler";
import { useEffect } from "react";
import useStore, { selectSetLanguage, selectLanguage } from "../store/store";
import { baseUrl } from "../urls";

const baseUrlLocale = {
  nb: `${baseUrl}/minside`,
  en: `${baseUrl}/minside/en`,
  nn: `${baseUrl}/minside/nn`,
};

const setInitialLocale = (setLanguage, currentHref) => {
  console.log("initiell langugae");

  if (currentHref.includes(baseUrlLocale.en)) {
    setLanguage("en");
    setParams({ ...Params, language: "en" });
    window.localStorage.setItem("language", "en");
    window.dispatchEvent(new Event("storage"));
  } else if (currentHref.includes(baseUrlLocale.nn)) {
    setLanguage("nn");
    setParams({ ...Params, language: "nn" });
    window.localStorage.setItem("language", "nn");
    window.dispatchEvent(new Event("storage"));
  } else {
    setLanguage("nb");
    setParams({ ...Params, language: "nb" });
    window.localStorage.setItem("language", "nb");
    window.dispatchEvent(new Event("storage"));
  }
};

const updateState = (locale) => {
  window.history.replaceState(window.history.state, "", baseUrlLocale[locale]);
};

export const useLanguage = () => {
  const setLanguage = useStore(selectSetLanguage);

  onLanguageSelect((language) => {
    setLanguage(language.locale);
    updateState(language.locale);
    window.localStorage.setItem("language", language.locale);
    window.dispatchEvent(new Event("storage"));
  });

  useEffect(() => {
    setInitialLocale(setLanguage, window.location.href);
    setAvailableLanguages([
      {
        locale: "nb",
        handleInApp: true,
      },
      {
        locale: "nn",
        handleInApp: true,
      },
      {
        locale: "en",
        handleInApp: true,
      },
    ]);
  }, []);
};

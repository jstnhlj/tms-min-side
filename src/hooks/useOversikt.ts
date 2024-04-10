import useSWRImmutable from "swr/immutable";
import { PersonalizedContent } from "@components/oversikt/microfrontendTypes.tsx";
import { dinOversiktUrl } from "@components/oversikt/urls.ts";
import { fetcher, include } from "@utils/api.client.ts";
import { setIsError } from "../store/store.ts";
import { logMfEvent } from "@utils/amplitude.ts";
import ProduktProperties from "@components/oversikt/produktkort/ProduktProperties.tsx";
import { hasMicrofrontends } from "@utils/oversikt.ts";

export const useOversikt = (produktProperties?: ProduktProperties[]) => {
  const {
    data: personalizedContent,
  } = useSWRImmutable<PersonalizedContent>({ path: dinOversiktUrl, options: include }, fetcher, {
      onError: () => setIsError(),
      onSuccess: (data) => data.microfrontends.map((mf) => logMfEvent(`minside.${mf.microfrontend_id}`, true))
    }
  );
  const hasProduktkort = (produktConfig?: ProduktProperties[]) => produktConfig !== undefined && produktConfig.length > 0;

  return (
    hasMicrofrontends(personalizedContent)
    || hasProduktkort(produktProperties)
    || personalizedContent?.oppfolgingContent
    || personalizedContent?.aiaStandard
    || personalizedContent?.meldekort
  );
};




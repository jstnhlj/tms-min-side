import useSWRImmutable from "swr/immutable";
import { antallVarslerUrl } from "./varslerUrlsClientSide";
import { fetcher } from "../../../utils/api.client";
import { beskjedSingular, buildText, hasVarsler, oppgaveSingular } from "./varslerUtlis";
import { text } from "./varslerText"
import type { Language } from "../../../language/language";
import IngenVarslerIkon from "./ikoner/IngenVarslerIkon";
import VarlserIkon from "./ikoner/VarslerIkon";
import style from "./Varsler.module.css";

interface Props {
  language: Language;
}

interface VarslerResponse {
  oppgaver: number;
  beskjeder: number;
  innbokser: number;
}

const VarslerData = ({ language }: Props) => {
  const { data, isLoading, error } = useSWRImmutable<VarslerResponse>({ path: antallVarslerUrl }, fetcher);

  if (isLoading) {
    return null;
  }

  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }

  const oppgaver = data.oppgaver || 0;
  const beskjeder = data.beskjeder + data.innbokser;
  const varsler = beskjeder + oppgaver;

  const oppgaveText = oppgaveSingular(oppgaver) ? text.oppgave[language] : text.oppgaver[language];
  const beskjedText = beskjedSingular(beskjeder) ? text.beskjed[language] : text.beskjeder[language];
  const varselText = buildText(beskjeder, oppgaver, beskjedText, oppgaveText, text.og[language]);

  if (!hasVarsler(varsler)) {
    return (
      <>
        <IngenVarslerIkon />
        <div className={style.container}>
          <h3 className="navds-heading navds-heading--small">{text.varsler[language]}</h3>
          <p className="navds-body-long navds-body-long--small">
            {text.ingenVarsler[language]}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <VarlserIkon />
      <div className={style.container}>
        <h3 className="navds-heading navds-heading--small">{text.varsler[language]}</h3>
        <p className="navds-body-long navds-body-long--small">
          {varselText}
        </p>
      </div>
    </>
  );
};

export default VarslerData;
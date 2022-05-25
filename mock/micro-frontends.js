import minSideOversikt from "./bundle/min-side-oversikt";
import arbeidsflateForInnloggetArbeidssoker from "./bundle/arbeidsflate-for-innlogget-arbeidssoker";
import minSideTjenester from "./bundle/min-side-tjenester";
import minSideVarslinger from "./bundle/min-side-varslinger";

export default [
  {
    url: '/tms-min-side-oversikt/bundle.js',
    method: 'get',
    rawResponse: async (req, res) => {
      res.setHeader('Content-Type', 'text/javascript')
      res.statusCode = 200
      res.end(minSideOversikt)
    },
  },
  {
    url: '/aia/bundle.js',
    method: 'get',
    rawResponse: async (req, res) => {
      res.setHeader('Content-Type', 'text/javascript')
      res.statusCode = 200
      res.end(arbeidsflateForInnloggetArbeidssoker)
    },
  },
  {
    url: '/tms-min-side-tjenester/bundle.js',
    method: 'get',
    rawResponse: async (req, res) => {
      res.setHeader('Content-Type', 'text/javascript')
      res.statusCode = 200
      res.end(minSideTjenester)
    },
  },
  {
    url: '/tms-min-side-varslinger/bundle.js',
    method: 'get',
    rawResponse: async (req, res) => {
      res.setHeader('Content-Type', 'text/javascript')
      res.statusCode = 200
      res.end(minSideVarslinger)
    },
  },
];

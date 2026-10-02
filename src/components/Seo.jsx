import { Helmet } from "react-helmet-async";
import { BRAND } from "../data/site";

const DEFAULT_DESC =
  "AiFyn turns your existing CCTV into an intelligent, always-on security and operations layer. AI video analytics that thinks, alerts and acts — 24/7.";

export default function Seo({ title, description, path = "/", image }) {
  const fullTitle = title
    ? `${title} — AiFyn`
    : "AiFyn — Your cameras see everything. AiFyn understands it.";
  const url = `${BRAND.url}${path}`;
  const img = image || `${BRAND.url}/og-image.jpg`;
  const desc = description || DEFAULT_DESC;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
    </Helmet>
  );
}
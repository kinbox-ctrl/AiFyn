-- State/region of the visitor and the network (ISP / hosting company) the visit came from, both from
-- Cloudflare's request metadata. Region is shown next to the city; the network helps spot bot traffic.
ALTER TABLE pageviews ADD COLUMN region TEXT;
ALTER TABLE pageviews ADD COLUMN network TEXT;

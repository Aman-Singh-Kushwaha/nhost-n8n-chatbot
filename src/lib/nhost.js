
import { NhostClient } from '@nhost/react';

const nhost = new NhostClient({
subdomain: process.env.VITE_NHOST_SUBDOMAIN,
  region: process.env.VITE_NHOST_REGION
});

export { nhost };

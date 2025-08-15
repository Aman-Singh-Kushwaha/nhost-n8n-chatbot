
import { NhostClient } from '@nhost/react';

const nhost = new NhostClient({ 
  subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_NHOST_REGION
});
if (!nhost.auth.isInitialized) {
  console.error('Nhost Client initialization failed.');
} else {
  console.log('Nhost Client Initialized:', nhost);
}

export { nhost };

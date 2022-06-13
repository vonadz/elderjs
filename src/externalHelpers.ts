/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import path from 'path';
import fs from 'fs';

import { QueryOptions, SettingsOptions, THelpers } from './utils/types.js';

let userHelpers;

let cache;

async function externalHelpers({
  settings,
  query,
  helpers,
}: {
  settings: SettingsOptions;
  query: QueryOptions;
  helpers: THelpers;
}) {
  const srcHelpers = path.join(settings.srcDir, 'helpers/index.js');
  try {
    if (!cache) {
      try {
        fs.statSync(srcHelpers);
        const reqHelpers = await import(srcHelpers);
        userHelpers = reqHelpers.default || reqHelpers;

        if (typeof userHelpers === 'function') {
          userHelpers = await userHelpers({ settings, query, helpers });
        }
        cache = userHelpers;
      } catch (err) {
        // silence, helpers are optional
      }
    } else {
      userHelpers = cache;
    }
  } catch (e) {
    console.error(`Error importing ${srcHelpers}`);
    console.error(e);
  }

  return userHelpers;
}

export default externalHelpers;

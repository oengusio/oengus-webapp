import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import * as Sentry from '@sentry/angular';

if (environment.name !== 'local') {
  Sentry.init({
    environment: environment.name,
    dsn: 'https://02b0f4a1e0184c4fb84a278373695fde@o1178674.ingest.sentry.io/6293575',
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

/*
marker('alert.submit.DIFFERENT_MARATHON');
marker('alert.submit.NOT_MULTIPLAYER');
marker('alert.submit.SAME_USER');
marker('alert.submit.MAX_SIZE_REACHED');
marker('alert.submit.CODE_NOT_FOUND');
marker('alert.submit.ALREADY_IN_OPPONENTS');
marker('user.profile.filter.temporality.PAST');
marker('user.profile.filter.temporality.FUTURE');
*/

// Enable prod mode in production.
if (environment.production) {
  enableProdMode();
}

platformBrowser()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

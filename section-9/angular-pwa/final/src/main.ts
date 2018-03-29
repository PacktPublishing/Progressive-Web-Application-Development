import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    // you can also register your own service worker here
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register('/ngsw-worker.js');
    }
  })
  .catch(err => console.log(err));

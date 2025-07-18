import './chart.config';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent, appConfig } from './app';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

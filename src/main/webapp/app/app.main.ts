import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ProdConfig } from './blocks/config/prod.config';
import { SchoolarAppModule } from './app.module';

ProdConfig();

if (module['hot']) {
    module['hot'].accept();
}

platformBrowserDynamic().bootstrapModule(SchoolarAppModule)
.then((success) => console.log(`Application started`))
.catch((err) => console.error(err));

/* schoolar custom scripts */
window['SchoolarEvents'] = {
    handlers: [],

    subscribe(eventName, fn) {
        this.handlers.push({ eventName, fn });
    },

    publish(eventName) {
        this.handlers.forEach(function(event) {
            if (event.eventName === eventName) {
                event.fn();
            }
        });
    }
};

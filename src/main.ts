import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import * as Sentry from "@sentry/vue"
import { BrowserTracing } from "@sentry/tracing"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import "bootstrap-icons/font/bootstrap-icons.css"
import "izitoast/dist/css/iziToast.min.css"

let vm = createApp(App)

Sentry.init({
  app: vm,
  dsn: 'https://2a492e5793b6462eb928b2524cbffbd8@o4503900017983488.ingest.sentry.io/4503900019425280',
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "https://quinielaluislopez.com", /^\//],
    }),
  ],
  tracesSampleRate: 1.0,
});

vm.use(router).use(createPinia()).mount('#app')

export default vm

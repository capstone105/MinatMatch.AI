import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url }) => {
    return url.origin === 'https://kit.fontawesome.com';
  },
  new CacheFirst({
    cacheName: "fontawesome",
  })
);

/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function () {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.1/8 is considered localhost for IPv4.
  window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js').then(function (registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function () {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;
          installingWorker.onstatechange = function () {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;
              case 'redundant':
                throw new Error('The installing ' + 'service worker became redundant.');
              default:
              // Ignore
            }
          };
        }
      };
    }).catch(function (e) {
      console.error('Error during service worker registration:', e);
    });
  }

  // Your custom JavaScript goes here

  let doc = document;
  doc.addEventListener('DOMContentLoaded', () => {
    const menuButton = doc.getElementById('menu_toggle');
    const menu = doc.getElementById('menu');
    menuButton.addEventListener('click', () => {
      if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('flex');
      } else {
        menu.classList.remove('flex');
        menu.classList.add('hidden');
      }
    });
  });
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJuYW1lcyI6WyJpc0xvY2FsaG9zdCIsIkJvb2xlYW4iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhvc3RuYW1lIiwibWF0Y2giLCJuYXZpZ2F0b3IiLCJwcm90b2NvbCIsInNlcnZpY2VXb3JrZXIiLCJyZWdpc3RlciIsInRoZW4iLCJyZWdpc3RyYXRpb24iLCJvbnVwZGF0ZWZvdW5kIiwiY29udHJvbGxlciIsImluc3RhbGxpbmdXb3JrZXIiLCJpbnN0YWxsaW5nIiwib25zdGF0ZWNoYW5nZSIsInN0YXRlIiwiRXJyb3IiLCJjYXRjaCIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJkb2MiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJtZW51QnV0dG9uIiwiZ2V0RWxlbWVudEJ5SWQiLCJtZW51IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJyZW1vdmUiLCJhZGQiXSwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqXG4gKiAgV2ViIFN0YXJ0ZXIgS2l0XG4gKiAgQ29weXJpZ2h0IDIwMTUgR29vZ2xlIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgaHR0cHM6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZVxuICpcbiAqL1xuLyogZXNsaW50LWVudiBicm93c2VyICovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBDaGVjayB0byBtYWtlIHN1cmUgc2VydmljZSB3b3JrZXJzIGFyZSBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgYnJvd3NlcixcbiAgLy8gYW5kIHRoYXQgdGhlIGN1cnJlbnQgcGFnZSBpcyBhY2Nlc3NlZCBmcm9tIGEgc2VjdXJlIG9yaWdpbi4gVXNpbmcgYVxuICAvLyBzZXJ2aWNlIHdvcmtlciBmcm9tIGFuIGluc2VjdXJlIG9yaWdpbiB3aWxsIHRyaWdnZXIgSlMgY29uc29sZSBlcnJvcnMuIFNlZVxuICAvLyBodHRwOi8vd3d3LmNocm9taXVtLm9yZy9Ib21lL2Nocm9taXVtLXNlY3VyaXR5L3ByZWZlci1zZWN1cmUtb3JpZ2lucy1mb3ItcG93ZXJmdWwtbmV3LWZlYXR1cmVzXG4gIHZhciBpc0xvY2FsaG9zdCA9IEJvb2xlYW4od2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnbG9jYWxob3N0JyB8fFxuICAgICAgLy8gWzo6MV0gaXMgdGhlIElQdjYgbG9jYWxob3N0IGFkZHJlc3MuXG4gICAgICB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT09ICdbOjoxXScgfHxcbiAgICAgIC8vIDEyNy4wLjAuMS84IGlzIGNvbnNpZGVyZWQgbG9jYWxob3N0IGZvciBJUHY0LlxuICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lLm1hdGNoKFxuICAgICAgICAvXjEyNyg/OlxcLig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPykpezN9JC9cbiAgICAgIClcbiAgICApO1xuXG4gIGlmICgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yICYmXG4gICAgICAod2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSAnaHR0cHM6JyB8fCBpc0xvY2FsaG9zdCkpIHtcbiAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3Rlcignc2VydmljZS13b3JrZXIuanMnKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlZ2lzdHJhdGlvbikge1xuICAgICAgLy8gdXBkYXRlZm91bmQgaXMgZmlyZWQgaWYgc2VydmljZS13b3JrZXIuanMgY2hhbmdlcy5cbiAgICAgIHJlZ2lzdHJhdGlvbi5vbnVwZGF0ZWZvdW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIHVwZGF0ZWZvdW5kIGlzIGFsc28gZmlyZWQgdGhlIHZlcnkgZmlyc3QgdGltZSB0aGUgU1cgaXMgaW5zdGFsbGVkLFxuICAgICAgICAvLyBhbmQgdGhlcmUncyBubyBuZWVkIHRvIHByb21wdCBmb3IgYSByZWxvYWQgYXQgdGhhdCBwb2ludC5cbiAgICAgICAgLy8gU28gY2hlY2sgaGVyZSB0byBzZWUgaWYgdGhlIHBhZ2UgaXMgYWxyZWFkeSBjb250cm9sbGVkLFxuICAgICAgICAvLyBpLmUuIHdoZXRoZXIgdGhlcmUncyBhbiBleGlzdGluZyBzZXJ2aWNlIHdvcmtlci5cbiAgICAgICAgaWYgKG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAvLyBUaGUgdXBkYXRlZm91bmQgZXZlbnQgaW1wbGllcyB0aGF0IHJlZ2lzdHJhdGlvbi5pbnN0YWxsaW5nIGlzIHNldDpcbiAgICAgICAgICAvLyBodHRwczovL3NsaWdodGx5b2ZmLmdpdGh1Yi5pby9TZXJ2aWNlV29ya2VyL3NwZWMvc2VydmljZV93b3JrZXIvaW5kZXguaHRtbCNzZXJ2aWNlLXdvcmtlci1jb250YWluZXItdXBkYXRlZm91bmQtZXZlbnRcbiAgICAgICAgICB2YXIgaW5zdGFsbGluZ1dvcmtlciA9IHJlZ2lzdHJhdGlvbi5pbnN0YWxsaW5nO1xuXG4gICAgICAgICAgaW5zdGFsbGluZ1dvcmtlci5vbnN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGluc3RhbGxpbmdXb3JrZXIuc3RhdGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAnaW5zdGFsbGVkJzpcbiAgICAgICAgICAgICAgICAvLyBBdCB0aGlzIHBvaW50LCB0aGUgb2xkIGNvbnRlbnQgd2lsbCBoYXZlIGJlZW4gcHVyZ2VkIGFuZCB0aGVcbiAgICAgICAgICAgICAgICAvLyBmcmVzaCBjb250ZW50IHdpbGwgaGF2ZSBiZWVuIGFkZGVkIHRvIHRoZSBjYWNoZS5cbiAgICAgICAgICAgICAgICAvLyBJdCdzIHRoZSBwZXJmZWN0IHRpbWUgdG8gZGlzcGxheSBhIFwiTmV3IGNvbnRlbnQgaXNcbiAgICAgICAgICAgICAgICAvLyBhdmFpbGFibGU7IHBsZWFzZSByZWZyZXNoLlwiIG1lc3NhZ2UgaW4gdGhlIHBhZ2UncyBpbnRlcmZhY2UuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSAncmVkdW5kYW50JzpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBpbnN0YWxsaW5nICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2VydmljZSB3b3JrZXIgYmVjYW1lIHJlZHVuZGFudC4nKTtcblxuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIElnbm9yZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oZSkge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZHVyaW5nIHNlcnZpY2Ugd29ya2VyIHJlZ2lzdHJhdGlvbjonLCBlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFlvdXIgY3VzdG9tIEphdmFTY3JpcHQgZ29lcyBoZXJlXG5cbiAgbGV0IGRvYyA9IGRvY3VtZW50XG5cbiAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKT0+e1xuICAgIGNvbnN0IG1lbnVCdXR0b24gPSBkb2MuZ2V0RWxlbWVudEJ5SWQoJ21lbnVfdG9nZ2xlJyk7XG4gICAgY29uc3QgbWVudSA9IGRvYy5nZXRFbGVtZW50QnlJZCgnbWVudScpXG5cbiAgICBtZW51QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcbiAgICAgIGlmIChtZW51LmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuJykpe1xuICAgICAgICBtZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIG1lbnUuY2xhc3NMaXN0LmFkZCgnZmxleCcpXG4gICAgICB9ZWxzZXtcbiAgICAgICAgbWVudS5jbGFzc0xpc3QucmVtb3ZlKCdmbGV4JylcbiAgICAgICAgbWVudS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59KSgpO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsWUFBVztFQUNWLFlBQVk7O0VBRVo7RUFDQTtFQUNBO0VBQ0E7RUFDQSxJQUFJQSxXQUFXLEdBQUdDLE9BQU8sQ0FBQ0MsTUFBTSxDQUFDQyxRQUFRLENBQUNDLFFBQVEsS0FBSyxXQUFXO0VBQzlEO0VBQ0FGLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxRQUFRLEtBQUssT0FBTztFQUNwQztFQUNBRixNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsUUFBUSxDQUFDQyxLQUFLLENBQzVCLHdEQUNGLENBQ0YsQ0FBQztFQUVILElBQUksZUFBZSxJQUFJQyxTQUFTLEtBQzNCSixNQUFNLENBQUNDLFFBQVEsQ0FBQ0ksUUFBUSxLQUFLLFFBQVEsSUFBSVAsV0FBVyxDQUFDLEVBQUU7SUFDMURNLFNBQVMsQ0FBQ0UsYUFBYSxDQUFDQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FDcERDLElBQUksQ0FBQyxVQUFTQyxZQUFZLEVBQUU7TUFDM0I7TUFDQUEsWUFBWSxDQUFDQyxhQUFhLEdBQUcsWUFBVztRQUN0QztRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUlOLFNBQVMsQ0FBQ0UsYUFBYSxDQUFDSyxVQUFVLEVBQUU7VUFDdEM7VUFDQTtVQUNBLElBQUlDLGdCQUFnQixHQUFHSCxZQUFZLENBQUNJLFVBQVU7VUFFOUNELGdCQUFnQixDQUFDRSxhQUFhLEdBQUcsWUFBVztZQUMxQyxRQUFRRixnQkFBZ0IsQ0FBQ0csS0FBSztjQUM1QixLQUFLLFdBQVc7Z0JBQ2Q7Z0JBQ0E7Z0JBQ0E7Z0JBQ0E7Z0JBQ0E7Y0FFRixLQUFLLFdBQVc7Z0JBQ2QsTUFBTSxJQUFJQyxLQUFLLENBQUMsaUJBQWlCLEdBQ2pCLGtDQUFrQyxDQUFDO2NBRXJEO2NBQ0U7WUFDSjtVQUNGLENBQUM7UUFDSDtNQUNGLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLFVBQVNDLENBQUMsRUFBRTtNQUNuQkMsT0FBTyxDQUFDQyxLQUFLLENBQUMsMkNBQTJDLEVBQUVGLENBQUMsQ0FBQztJQUMvRCxDQUFDLENBQUM7RUFDSjs7RUFFQTs7RUFFQSxJQUFJRyxHQUFHLEdBQUdDLFFBQVE7RUFFbEJELEdBQUcsQ0FBQ0UsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsTUFBSTtJQUMzQyxNQUFNQyxVQUFVLEdBQUdILEdBQUcsQ0FBQ0ksY0FBYyxDQUFDLGFBQWEsQ0FBQztJQUNwRCxNQUFNQyxJQUFJLEdBQUdMLEdBQUcsQ0FBQ0ksY0FBYyxDQUFDLE1BQU0sQ0FBQztJQUV2Q0QsVUFBVSxDQUFDRCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBSTtNQUN2QyxJQUFJRyxJQUFJLENBQUNDLFNBQVMsQ0FBQ0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFDO1FBQ3BDRixJQUFJLENBQUNDLFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMvQkgsSUFBSSxDQUFDQyxTQUFTLENBQUNHLEdBQUcsQ0FBQyxNQUFNLENBQUM7TUFDNUIsQ0FBQyxNQUFJO1FBQ0hKLElBQUksQ0FBQ0MsU0FBUyxDQUFDRSxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzdCSCxJQUFJLENBQUNDLFNBQVMsQ0FBQ0csR0FBRyxDQUFDLFFBQVEsQ0FBQztNQUM5QjtJQUNGLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztBQUNKLENBQUMsRUFBRSxDQUFDIiwiaWdub3JlTGlzdCI6W119

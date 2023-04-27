let cacheData = 'App1';
this.addEventListener('install',(event) =>{
    event.waitUntil(
        caches.open(cacheData).then((caches)=>{
        caches.addAll([
                 "/static/js/bundle.js",
                 "/dashboard",
                 "/dashboard",
                 "/dashboard",
                 "/",
                 "/ws",
                 "/manifest.json",
                 "/index.html"

        ])
    })
    )
})
this.addEventListener("fetch", (event) => {


    // console.warn("url",event.request.url)


    if (!navigator.onLine) {
        // if (event.request.url === "http://localhost:3000/static/js/bundle.js") {
            event.waitUntil(
                this.registration.showNotification("Internet", {
                    body: "internet not working",
                })
            )
        // }
        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp
                }
                let requestUrl = event.request.clone();
                fetch(requestUrl)
            })
        )
    }
}) 
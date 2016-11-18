Using Rx to periodically fetch resource/s
=========================================

A playground where i'm using reactive extensions(rxjs) to build a simple library, 
one that deals with fetching a resource at specific intervals of time, and a clear 
strategy when failing.

## Example

You want to fetch an HTTP Resource, every 30 seconds, request timeout at 1 second, 
restarting the process for 10 times in case of errors:

    let stream = Periodical.run(
      () => fetch(endpoint),
      {
        repetitions: 10,
        interval: 30 * 1000,
        timeout: 1000
      });
    
    stream.subscribe(
      result => console.log(result),
      error => console.error(error),
      () => console.log('periodical has ended');
      
Stopping the periodical(stream) is easy, just call `stream.unsubscribe()`.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

Reactive Periodical Streams
===========================

Periodically run functions, having a strategy for timeout, restart and lifecycle(finite or infinite),
using observables(reactive extensions) for better composition and modularity.

## Example

You want to fetch an HTTP Resource, every 30 seconds, request timeout at 1 second, restarting the process for 10 times
in case of errors:

    let newPeriodical = Periodical.run(
      () => fetch(endpoint),
      {
        repetitions: 10,
        interval: 30 * 1000,
        timeout: 1000
      });
    
    newPeriodical.subscribe(
      result => console.log(result),
      error => console.error(error),
      () => console.log('periodical has ended');
      
Stopping the periodical(stream) is easy, just call `newPeriodical.unsubscribe()`.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## todo
1. add invalidation check as function parameter on valid responses
2. add protection/validation againts non-json responses
3. add `BehaviourSubject` as subscriptions
4. add tests(maybe while developing?!) 
5. add subscription correct handle inside the api.js

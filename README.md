Reactive Periodical Streams
===========================

Run periodical functions with strategies for intervals, restarts and finite lifecycle,
using observables(reactive extensions) for better composition and modularity.

## Example

You want to fetch an HTTP Resource, every 30 seconds, request timeout at 1 second, restarting the process for 10 times
in case of errors:

    Periodical.run(
      () => Rx.Observable.fromPromise(fetch(endpoint)),
      {
        repetitions: 10,
        interval: 30 * 1000,
        timeout: 1000
      })

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

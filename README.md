Using Rx to periodically fetch resource/s
=========================================

Periodically fetch resources from different locations using multiple apis, 
fetching a resource at specific intervals of time(and a clear strategy when failing).

## Example

Fetch an HTTP Resource, every 30 seconds, request timeout at 1 second,
never restarting the process:

    // periodically
    let stream = Periodical.run('https://someo.ne/api'
      {
        repetitions: 10,
        interval: 30 * 1000,
        timeout: 1000
      });
    
    stream.subscribe(
      result => console.log(result),
      error => console.error(error),
      () => console.log('periodical has ended');
      
Stopping the periodical(stream) by calling `stream.unsubscribe()`.

## Strategy

Define the strategy to follow when dealing with errors - can retry, repeat or stop
a resource, from polling its value.

    {
      /*
        default is 0
        alternatives: seconds | minutes | hours | days
        examples: `{seconds: 30}` - every 30 seconds, make the request to fetch resource
      */
      repetitions: 'infinite',

      // minutes `{minutes: 25}`, hours `{hours: 6}`
      interval: {seconds: 30},

      // in case of (some tbd) errors, retry the task for 20 times
      // WILL HAVE A PRECEDENCE OVER `repetitions` and will bypass its value
      // if undefined, default value is 10, or 'infinite' and never stops trying to repeat the task
      retries: 30,

      // when the interval has changed, before the task is called, you can  
      // modify the strategy of the next stage
      //
      // The state in this case is the last recorded value of running the
      // task that resulted in some data(eg: 'data.match.odds')
      onInterval: (periodical, state) => {
       if (result.match.isLive) 
         return {continue: true, strategy: {interval: {seconds: 5}}}
       if (result.match.hasEnded) 
         return {stop: true}
      }
    }

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

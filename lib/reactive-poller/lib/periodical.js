import Rx from 'rxjs';
import Either from 'data.either';

const defaultStrategy = {timeout: 2500, interval: 5000, repetitions: 5};
const connectObservable = (observable) => observable.publish().connect();

/*
  TODO

  It defines a periodical strategy:
  - stop restarting after some repetitions
  - it increases the time between restarts/retries, using a linearly equation/function
  - it starts only after a time, it doesn't have an initial
    bearing(like using `BehaviorSubject`)
*/
const incrementalIntervalStrategy = (...opts) => {};

export default {
  /**
   * Creates a periodical task that can be restarted and has a strategy.
   *
   * create :: Function -> JSON -> Observable
   */
  create(requestTask, strategy = defaultStrategy) {
    const periodical = new Rx.ReplaySubject(1);

    const initial = Rx.Observable
      .create(obs => connectObservable(requestTask(periodical, strategy.interval)))
      .share()

    periodical.subscribe(
      ({response, last}) => {
        response
          .map(r => {
            connectObservable(requestTask(periodical, strategy.interval));
          })
          .orElse(() => {
            connectObservable(requestTask(periodical, last + strategy.interval));
          });
      },

      ({error, last}) => {
        // something has caused an error that couldn't be catched
        console.log('something errord with: ', error);
      },

      () => {
        // the whole periodical
        console.log('periodical complete');
      });

    return periodical
      .merge(initial)
      .map(({response, last}) => response.value);
  }
}

import Rx from 'rxjs';
import Either from 'data.either';

const defaultStrategy = {
  timeout: 2500,
  interval: 5000,
  repetitions: 5,
  modifier: (result, strategy) => strategy
};
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
      .create(obs => connectObservable(requestTask(periodical, strategy)))
      .first()
      .share();

    periodical.subscribe(
      ({response, strategy}) => {
        const newStrategy = strategy.modifier(response.value, strategy);

        response
          .map(r => {
            connectObservable(requestTask(periodical, newStrategy));
          })
          .orElse(() => {
            connectObservable(requestTask(periodical, newStrategy));
          });
      },

      ({error, strategy}) => {
        // something has caused an error that couldn't be catched
        console.log('something errord with: ', error);
      },

      () => {
        // the whole periodical
        console.log('periodical complete');
      });

    return periodical
      .merge(initial)
      .map(({response, strategy}) => response.value);
  }
}

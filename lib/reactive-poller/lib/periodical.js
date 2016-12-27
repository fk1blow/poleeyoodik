import Rx from 'rxjs';

const defaultStrategy = {
  timeout: 2500,
  interval: 5000,
  repetitions: 5,
  modifier: (strategy, result) => strategy
};

const performRequest = (observable) => observable.publish().connect();

export default {
  /**
   * Creates a periodical task that can be restarted and has a strategy.
   *
   * create :: Function -> Object -> Observable
   */
  create(makeTask, strategy = defaultStrategy) {
    const periodical = new Rx.ReplaySubject(1)

    periodical.subscribe(
      ({response, strategy}) => {
        const newStrategy = strategy.modifier(strategy, response.value);

        if (typeof(newStrategy.interval) === 'number') {
          performRequest(makeTask(periodical, newStrategy));
        } else {
          periodical.error({description: 'undefined or null strategy interval'});
        }
      },

      (error) => {
        console.log("error:", error)
      }
    )

    return periodical.merge(
      Rx.Observable
        .create(() => performRequest(makeTask(periodical, strategy)))
        .first()
        .share())
  }
}

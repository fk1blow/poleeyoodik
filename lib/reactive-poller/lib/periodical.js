import Rx from 'rxjs';

const defaultStrategy = {
  timeout: 2000,
  interval: 10000,
  repetitions: 1,
  modifier: (strategy, result) => strategy
};

// create :: Function -> Object -> ConnectableObservable
export default function Periodical(makeTask, strategy = defaultStrategy) {
  const periodical = new Rx.ReplaySubject(1);

  periodical.subscribe(
    ({response, strategy}) => {
      const newStrategy = strategy.modifier(strategy, response.value);
      if (typeof(newStrategy.interval) === 'number') {
        makeTask(periodical, newStrategy).publish().connect();
      } else {
        periodical.error({description: 'undefined or null strategy interval'});
      }
    },

    (error) => {
      console.log("error:", error)
    }
  );

  return periodical.merge(
    Rx.Observable
      .create(() => makeTask(periodical, strategy).publish().connect())
      .first()
      .share());
}

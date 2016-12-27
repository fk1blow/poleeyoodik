import Rx from 'rxjs';

const defaultStrategy = {
  timeout: 2000,
  interval: 10000,
  repetitions: 1,
  modifier: (strategy, result) => strategy
};

const validateStrategy = (strategy, testKeys) =>
  testKeys
    .filter(v => v !== 'modifier')
    .some((elem, idx, arr) => typeof(strategy[elem]) === 'number')

export default function Periodical(makeTask, strategy = defaultStrategy) {
  const periodical = new Rx.ReplaySubject(1);

  periodical.subscribe(
    ({response, strategy}) => {
      const newStrategy = strategy.modifier(strategy, response.value);
      if (typeof(newStrategy.interval) === 'number') {
        makeTask(periodical, newStrategy).publish().connect();
      } else {
        // why keep running the task if theres an invalid strategy?
        periodical.error({error: {message: 'invalid strategy provided'}});
      }
    }
  );

  return periodical.merge(
    Rx.Observable
      .create(() => makeTask(periodical, strategy).publish().connect())
      .first()
      .share());
}

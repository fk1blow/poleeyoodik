import Rx from 'rxjs';
import Either from 'data.either';

const connectObservable = observable => observable.publish().connect();

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const fetchResource = (endpoint, subject, after) => 
  Rx.Observable
    .of(endpoint)
    .delay(after)
    .flatMap(url =>
      fetch(url, { credentials: 'include' })
        .then(checkStatus)
        .then(r => r.json())
        .then(r => subject.next({ response: Either.Right(r), last: after }))
        .catch(e => subject.next({ response: Either.Left(e), last: after })),
    )

export default {
  create(url, opts = { timeout: 5000, periodic: 5000, repetitions: 5 }) {
    const periodical = new Rx.ReplaySubject(1);
    const initial = Rx.Observable
                      .create(() => 
                        connectObservable(
                          fetchResource(url, periodical, opts.periodic)))
                      .share();

    periodical.subscribe(
      ({ response, last }) => {
        response
          .map(() => 
            connectObservable(fetchResource(url, periodical, opts.periodic)))
          .orElse(() => 
            connectObservable(fetchResource(url, periodical, last + opts.periodic)));
      },

      ({ error }) => {
        console.log('something errord with: ', error); // eslint-disable-line
      },

      () => {
        console.log('periodical complete'); // eslint-disable-line
      });

    return periodical
      .merge(initial)
      .map(({ response }) => response.value);
  },
};

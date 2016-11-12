import Rx from 'rxjs';
import Either from 'data.either';

const connectObservable = (observable) => observable.publish().connect();
const testUrl = 'https:/ijsonplaceholder.typicode.com/posts/1';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const parseJSON = (response) => response.json();

const fetchResource = (endpoint, subjectTarget, adder) => {
  return Rx.Observable
    .of(endpoint)
    .delay(adder)
    .flatMap(url =>
      fetch(url, {credentials: 'include'})
        .then(checkStatus)
        .then(parseJSON)
        .then(r => subjectTarget.next({response: Either.Right(r), last: adder}))
        .catch(e => subjectTarget.next({response: Either.Left(e), last: adder}))
    )
}

export default {
  create(url, opts = {timeout: 5000, periodic: 2500, repetitions: 5}) {
    const periodical = new Rx.Subject();
    const target = new Rx.Subject();

    periodical.subscribe(
      ({response, last}) => {
        console.log('repeat')

        response
          .map(() => {
            target.next(response)
            connectObservable(fetchResource(testUrl, periodical, 500))
          })
          .orElse(() => connectObservable(fetchResource(testUrl, periodical, last + 500)))
      },
      ({error, last}) => {
        // console.log("periodical:", periodical)
        // console.log("target:", target)
        console.log('retry...')
        // target.error(error)
        // target.next(response)
        // connectObservable(fetchResource(url, periodical, 500))
      },
      () => {
        console.log('periodical complete')
      });

    return Rx.Observable
      .create(obs => connectObservable(fetchResource(url, periodical, 500)))
      .merge(target)
      .share();
  }
}

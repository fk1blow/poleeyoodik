import SubscriptionManager from './subscription-manager';
import PeriodicalHttp from './periodical-http';

export default {
  poll(resource) {
    // let newSub = SubscriptionManager.create(resource, "xxxxxx")
    // console.log("newSub:", newSub)
    const testUrl = 'https:/jsonplaceholder.typicode.com/posts/1';

    const periodical = PeriodicalHttp.create(testUrl, {timeout: 1000, interval: 5000})
    periodical.subscribe(
      r => console.log("subscriber response:", r),
      e => console.log("subscriber error:", e),
      _ => console.log("complete"))

    // setTimeout( _ => {
    //   console.log('second cumming')
    //   periodical.subscribe(
    //     r => console.log("r1:", r),
    //     err => console.log("err:", err))
    // }, 5000)
  }
}

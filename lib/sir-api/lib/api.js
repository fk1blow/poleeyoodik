import SubscriptionManager from './subscription-manager';
import PeriodicalHttp from './periodical-http';

export default {
  poll(resource) {
    let newSub = SubscriptionManager.create(resource)
    // console.log("newSub:", newSub.value)

    // let anewSub = SubscriptionManager.create(resource)
    // console.log("anewSub:", anewSub)

    // const testUrl = 'https:/jsonplaceholder.typicode.com/posts/1';
    // const opts = {timeout: 1000, periodic: 2500};

    const periodical = PeriodicalHttp.create(testUrl, newSub.value, opts)
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

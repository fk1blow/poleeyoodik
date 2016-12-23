import Maybe from 'data.maybe';

const SubscriptionStore = {};

export default {
  // convenience function
  id: (id) => {
    return SubscriptionStore[id] ? Maybe.of(SubscriptionStore[id]) : Maybe.Nothing()
  },
  
  subscription: function(id) {
    return id(id)  
  },

  create: (id, sub) { 
    return Maybe.of(SubscriptionStore[id] = sub)
  }
};

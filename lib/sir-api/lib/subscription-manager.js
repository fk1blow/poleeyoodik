import Maybe from 'data.maybe';

const SubscriptionStore = {};

export default {
  // convenience function
  id: function(id) {
    return SubscriptionStore[id] ? Maybe.of(SubscriptionStore[id]) : Maybe.Nothing()
  },
  
  // soon to be deprecated interface
  subscription: function(id) {
    return id(id)  
  },

  create: function(id, sub) { 
    return Maybe.of(SubscriptionStore[id] = sub)
  }
};

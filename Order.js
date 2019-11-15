//@ts-check
import StateMachine from 'javascript-state-machine';

export default class Order {
   constructor(items) {
      this.items = items;
      this.history = [];

      this._fsm(); 
   }
}

StateMachine.factory(Order, {
   init: 'init',
   transitions: [
      { name: "accept",   from: "init",      to: "pending"   },
      { name: "ship",     from: "pending",   to: "shipped"    },
      { name: "complete", from: "shipped",    to: "completed" },

      // { name: "cancel",   from: "init",      to: "canceled"  },
      // { name: "cancel",   from: "pending",   to: "canceled"  },
      // instead 
      { name: "cancel", from: ["init", "pending" ], to: "canceled" },
      
      //{ name: "refund",   from: "shipped",   to: "refunded"  },
      //{ name: "refund",   from: "completed", to: "refunded"  }
      // instead 
      { name: "refund",   from: ["shipped", "completed"], to: "refunded"  }
   ],
   methods: {
      onEnterState(lifecycle) {
         const { from, to } = lifecycle;
         if (from !== "none") {
            this.history.push({state: to, createdAt: new Date() });
         }
      }
   },
});
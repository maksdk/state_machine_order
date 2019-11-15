//@ts-check
import Order from './Order';

export const init = items => new Order(items);

export const tryCancel = order => {
   if (order.can("cancel")) {
      order.cancel();
   }
};
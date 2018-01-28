import clothBuilderAction from './clothBuilder';
import ordersAction from './order';
import purchaseActin from './purchase';

const action =( {
    ...clothBuilderAction,
    ...ordersAction,
    ...purchaseActin
})

export default action;
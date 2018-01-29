import clothBuilderAction from './clothBuilder';
import ordersAction from './order';
import purchaseAction from './purchase';
import authAction from './auth';

const action =( {
    ...clothBuilderAction,
    ...ordersAction,
    ...purchaseAction,
    ...authAction
})

export default action;
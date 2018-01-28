import clothBuilderAction from './clothBuilder';
import ordersAction from './order';

const action =( {
    ...clothBuilderAction,
    ...ordersAction
})

export default action;
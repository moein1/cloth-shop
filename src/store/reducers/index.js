import  {combineReducers} from 'redux';

import clothBuilderReducere from './clothBuilder';
import orderReducer from './order';
import purchaseReducer from './purchase';

const reducer = combineReducers({
    clt: clothBuilderReducere,
    ord : orderReducer,
    purch : purchaseReducer
});

export default reducer;
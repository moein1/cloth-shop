import  {combineReducers} from 'redux';

import clothBuilderReducere from './clothBuilder';
import orderReducer from './order';
import purchaseReducer from './purchase';
import authReducer from './auth';

const reducer = combineReducers({
    clt: clothBuilderReducere,
    ord : orderReducer,
    purch : purchaseReducer,
    auth : authReducer
});

export default reducer;
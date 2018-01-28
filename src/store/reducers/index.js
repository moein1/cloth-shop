import  {combineReducers} from 'redux';

import clothBuilderReducere from './clothBuilder';
import orderReducer from './order';

const reducer = combineReducers({
    clt: clothBuilderReducere,
    ord : orderReducer
});

export default reducer;
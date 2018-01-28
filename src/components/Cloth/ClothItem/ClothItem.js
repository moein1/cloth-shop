import React ,{Component} from 'react';
import propTypes from 'prop-types';

class ClothItem  extends Component{
   render(){
    let item =<div>this is item</div>
       switch (this.props.type) {
           case ('bottom'):
               item =<div>this is bottom </div>
               break;
            case ('top'):
                item =<div>this is top</div>
                break;
           default:
               item = null
               break;
       }
      return item;
   }
}

ClothItem.propTypes = {
    type :propTypes.string.isRequired

}

export default ClothItem;
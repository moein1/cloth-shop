import React ,{Component} from 'react';
import propTypes from 'prop-types';

class ClothItem  extends Component{
   render(){
    let ingredient =<div>this is ingredien</div>
       switch (this.props.type) {
           case ('bottom'):
               ingredient =<div>this is bottom </div>
               break;
            case ('top'):
                ingredient =<div>this is top</div>
                break;
           default:
               ingredient = null
               break;
       }
      return ingredient;
   }
}

ClothItem.propTypes = {
    type :propTypes.string.isRequired

}

export default ClothItem;
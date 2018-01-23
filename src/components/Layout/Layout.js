import React ,{Component} from 'react';
import Aux from '../../hoc/auxel';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state={
        openSidedrawer : false
    }

    sideDrawerHandler=()=>{
        this.setState((prevState)=>{
           return{ openSidedrawer :!prevState.openSidedrawer}
        })       
    }
    render(){
        return(
            <Aux>
                <Toolbar menuClicked={this.sideDrawerHandler}></Toolbar>
                <SideDrawer clicked={this.sideDrawerHandler}  open={this.state.openSidedrawer} />
                <main>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;
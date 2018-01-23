import React ,{Component} from 'react';

class Modal extends Component{
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !== this.props.show || 
        nextProps.loading!== this.props.loading;
    }
    render(){
        return <div
        className="summary-modal"
        style={{
        transform: this.props.show
            ? 'translateY(0)'
            : 'translateY(-100vh)',
        opacity: this.props.show
            ? '1'
            : '0'
    }}>{this.props.children}</div>
    }
}


export default Modal;
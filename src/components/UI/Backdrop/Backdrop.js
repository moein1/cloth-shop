import React from 'react';

const backdrop = (props) => (
    <div
        className="modal-backdrop"
        onClick={props.clicked}
        style={{
        display: props.show
            ? 'block'
            : 'none'
    }}></div>
)

export default backdrop;
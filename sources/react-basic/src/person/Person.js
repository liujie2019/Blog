import React from 'react';

const person = props => {
    return (
        <div>
            <p>{props.name}</p>
            <p>{props.children}</p>
            <input
                type="text"
                onChange={props.handleChange}
                defaultValue="123"
            />
        </div>
    );
}

export default person;
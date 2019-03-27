import React from 'react';
import PropTypes from 'prop-types';

export default class SubChild extends React.Component {
    render() {
      return (
        <button 
            style={{background: this.context.color}}
        >
          删除
        </button>
      );
    }
  }
  
  SubChild.contextTypes = {
    color: PropTypes.string
  };
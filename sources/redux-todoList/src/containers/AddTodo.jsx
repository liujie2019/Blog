import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

const AddTodo = ({ dispatch }) => {
  let input;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.value.trim()) {
        return;
    }
    dispatch(addTodo(input.value)); // addTodo是actionCreator
    input.value = '';
  }
  return (
    <Fragment>
      <form onSubmit={e => handleSubmit(e)}>
        <input ref={node => input = node} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </Fragment>
  )
}
// 这里connect只注入 dispatch，不监听 store
export default connect()(AddTodo);

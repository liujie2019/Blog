import React from 'react';
import withFetch from '../hoc/withFetch';

const User = withFetch('https://randomuser.me/api/')(props => {
  return (
    <h1>{props.data.results[0].email}</h1>
  )
})

export default User;
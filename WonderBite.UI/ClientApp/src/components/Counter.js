import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Counter';
import { Header, Button, Icon } from 'semantic-ui-react'

const Counter = props => (
  <div>
        <Header as='h1'>Counter</Header>

        <p>This is a simple example of a React component.</p>

        <p>Current count: <strong>{props.count}</strong></p>
        
        <Button onClick={props.increment} color='orange'><Icon name='bug' /> Increment</Button>
  </div>
);

export default connect(
  state => state.counter,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Counter);

import React from 'react';

export default class GameNav extends React.Component {
  render() {
    return (
      <nav className="text-center">
        {this.props.children}
      </nav>
    )
  }
}
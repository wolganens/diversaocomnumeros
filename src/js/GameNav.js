import React from 'react';

export default class GameNav extends React.Component {
  render() {
    return (
      <nav className="game-nav text-center">
        {this.props.children}
      </nav>
    )
  }
}
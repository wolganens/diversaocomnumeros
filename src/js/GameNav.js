import React from 'react';

export default class GameNav extends React.Component {
  render() {
    return (
      <nav className="game-nav text-center">
      	<div className="btn-group">
        	{this.props.children}
        </div>
      </nav>
    )
  }
}
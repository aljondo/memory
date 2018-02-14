import React from 'react';
import ReactDOM from 'react-dom';

export default class Tile extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.clickHandler(this.props.boardId);
  }
  render() {
    const { isCompleted, isGuess, letter } = this.props;
    const displayed = (isGuess || isCompleted) ? letter : "?";
    const className = isCompleted ? "completed" : "";
    return (
      <button
        className={className}
        onClick={this.handleClick}
      >
        {displayed}
      </button>
    )
  }
}
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
    const { hidden, letter, className } = this.props;
    var displayed = hidden ? "?" : letter;
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
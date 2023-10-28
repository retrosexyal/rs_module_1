import React, { Component } from "react";

interface ButtonProps {
  onClick: () => void;
}

export class Button extends Component<ButtonProps> {
  render() {
    return <button onClick={this.props.onClick}>btn</button>;
  }
}

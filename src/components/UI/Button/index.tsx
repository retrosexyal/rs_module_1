import React, { Component } from "react";

interface ButtonProps {
  onClick: () => void;
  text: string;
}

export class Button extends Component<ButtonProps> {
  render() {
    return <button onClick={this.props.onClick}>{this.props.text}</button>;
  }
}

import React, { Component, ChangeEvent } from "react";

interface InputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export class Input extends Component<InputProps> {
  render() {
    return <input onChange={this.props.onChange} value={this.props.value} />;
  }
}

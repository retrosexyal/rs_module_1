import React, { Component, ChangeEvent } from "react";

interface InputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export class Input extends Component<InputProps> {
  render() {
    return <input onChange={this.props.onChange} />;
  }
}

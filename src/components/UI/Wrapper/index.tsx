import { Component, ReactNode } from "react";
import styles from "./wrapper.module.scss";

interface WrapperProps {
  children: ReactNode;
}

export class Wrapper extends Component<WrapperProps> {
  render() {
    return <div className={styles.wrapper}>{this.props.children}</div>;
  }
}

import React, {Component} from 'react';
import styles from './square.css';

class Square extends Component {
  render() {
    return <div className={styles.square} onClick={this.props.onClick}><span className={styles.squareVal}>{this.props.value}</span></div>;
  }
}
export default Square;


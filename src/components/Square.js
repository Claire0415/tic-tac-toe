import React, {Component} from 'react';
import styles from './square.css';

class Square extends Component {
  render() {
    // console.log(this.props.value)
    return <div className={styles.square} onClick={this.props.onClick}><span className={styles.squareVal}>{this.props.value}</span></div>;
  }
}
export default Square;


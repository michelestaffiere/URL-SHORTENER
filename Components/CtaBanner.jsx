import React, { Component } from 'react'
import styles from '../Styles/ctaBanner.module.css'

export default class CtaBanner extends Component {
  render() {
    return (
      <div className={styles.banner}>
        <h2>Boost your Links Today</h2>
        <button>Get Started</button>
      </div>
    )
  }
}

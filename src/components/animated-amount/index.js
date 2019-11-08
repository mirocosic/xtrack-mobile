import React, { Component } from "react"

import { formatCurrency } from "../../utils/currency"
import { Title } from "../typography"

export default class AnimatedAmount extends Component {

  state = { amount: 0 }

  componentWillReceiveProps(nextProps) {
    const interval = setInterval(() => {
      this.setState({amount: this.state.amount + 1 }, () => {
        if (this.state.amount === nextProps.amount) clearInterval(interval);
      })
    }, 1)
  }

  render() {
    return (
      <Title>{formatCurrency(this.state.amount)}</Title>
    )
  }
}

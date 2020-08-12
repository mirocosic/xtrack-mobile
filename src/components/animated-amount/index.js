import React, { Component } from "react"

import { formatCurrency } from "../../utils/currency"
import { Title } from "../typography"

export default class AnimatedAmount extends Component {

  state = { amount: 0 }

  componentWillReceiveProps(nextProps) {
    const { amount } = this.state
    const interval = setInterval(() => {
      this.setState({ amount: amount + 1 }, () => {
        if (amount === nextProps.amount) clearInterval(interval);
      })
    }, 1)
  }

  render() {
    const { amount } = this.state
    return (
      <Title>{formatCurrency(amount)}</Title>
    )
  }
}

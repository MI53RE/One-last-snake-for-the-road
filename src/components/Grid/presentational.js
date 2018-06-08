import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Cell from 'components/Cell'

const stylize = (props, state) => ({
  row: {
    display: 'flex',
  }
})

class Grid extends PureComponent {
  render() {
    const styles = stylize(this.props, this.state)
    const { rows, columns } = this.props

    return (
      <div>
        {
          Array(rows)
            .fill(true)
            .map((foo, x) => (
              <div key={`rows-${x}`} style={styles.row}>
                {Array(columns).fill(true).map((bar, y) => <Cell key={`cell-${x}-${y}`} />)}
              </div>
            ))
        }
      </div>
    )
  }
}

Grid.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
}

export default Grid

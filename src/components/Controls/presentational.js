import React, { Component } from 'react'
import DatGui, { DatBoolean, DatButton, DatNumber, DatString } from 'react-dat-gui'
import 'react-dat-gui/build/react-dat-gui.css'

class Controls extends Component {
  render() {
    return (
      <DatGui data={this.props.options} onUpdate={this.props.onUpdate}>
        {Object.keys(this.props.options).map(key => {
          const option = this.props.options[key]

          switch (typeof option) {
            case 'boolean':
              return <DatBoolean key={key} path={key} label={key} />
            case 'number':
              return <DatNumber key={key} path={key} label={key} min={1} max={50} step={1} />
            case 'string':
              return <DatString key={key} path={key} label={key} />
            default:
              return null
          }
        })}
      </DatGui>
    )
  }
}

export default Controls

import * as React from "react"
import "./FilterInput.css"

export default function FilterInput({
  handleOnChange,
  inputValue
}) {
  return (
    <div className="filter-input">
      <i className="material-icons">search</i>
      <input onChange={handleOnChange} value={inputValue} type="text" placeholder="Search transactions" />
    </div>
  )
}

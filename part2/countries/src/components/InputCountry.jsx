import React from 'react'

const InputCountry = ({value,onChange}) => {
  return (
    <div> find countries:<input value={value} onChange={onChange}/></div>
  )
}

export default InputCountry
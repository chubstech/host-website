import React from 'react'

function Sidebar({items}) {
  return (
    <div className="sidebar">
    <h2 id="hder">Innovation Lab</h2>
    <br></br>
    <ul>
    {items.map(({ label, name, ...rest }) => (
      <a key={name} button {...rest}>
        <p>{label}</p>
      </a>
    ))}
    </ul>
    </div>
  )
}

export default Sidebar

import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import './styles.scss'

const BoxMessage = () => {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="box-msg-data">
      <div className="box-msg-to-from">
        <div className="box-msg-to">
          <div id="box-msg-to-label" className="card-label">
            To
          </div>
          <input
            id="box-msg-to-input"
            className="box-msg-input"
            type="text"
            placeholder="To"
          />
        </div>
        <div className="box-msg-from">
          <div id="box-msg-from-label" className="card-label">
            From
          </div>
          <input
            id="box-msg-from-input"
            className="box-msg-input"
            type="text"
            placeholder="From"
          />
        </div>
      </div>
      <div className="box-msg-description">
        <div id="box-msg-description-label" className="card-label">
          Message on Card
        </div>
        <textarea
          id="box-msg-content"
          placeholder="Enter your card message here. 120 characters max."
          maxLength="120"
          rows="6"
        />
        <div id="msg-remaining-characters" className="box-msg-characters">
          {remainingCharacters} characters remaining
        </div>
      </div>
    </div>
  )
}

export default BoxMessage

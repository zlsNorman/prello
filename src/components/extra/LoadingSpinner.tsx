import React from "react"

export default function LoadingSpinner() {
  return (
    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="loader-wrapper">
              <div className="loader is-loading" />
            </div>
            <p className="pt-6 has-text-centered">
              Lade Daten
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

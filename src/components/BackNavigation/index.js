import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs'

import './index.css'

class BackNavigation extends Component {
  onClickGoBack = () => {
    const {history} = this.props
    // console.log(history)
    history.goBack()
  }

  render() {
    return (
      <div className="back-arrow-container">
        <button
          type="button"
          onClick={this.onClickGoBack}
          className="back-button"
        >
          <BsArrowLeft className="back-arrow" />
        </button>
        <p className="back-text">Back</p>
      </div>
    )
  }
}

export default withRouter(BackNavigation)

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const LoaderView = () => (
  <div className="loader-div">
    <Loader
      type="TailSpin"
      color="#0074D9"
      height={80}
      width={80}
      className="loader"
    />
    <h1 className="loader-text">Loading...</h1>
  </div>
)

export default LoaderView

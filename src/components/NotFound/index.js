import BackNavigation from '../BackNavigation'

import './index.css'

const NotFound = () => (
  <>
    <BackNavigation />

    <div className="not-found-container">
      <img
        src="https://galeri13.uludagsozluk.com/699/devlet-bahceli-nin-serefi_1793959.jpg"
        alt="not-found-page"
        className="not-found-img-mobile"
      />
      <img
        src="https://assets.prestashop2.com/sites/default/files/styles/blog_750x320/public/blog/2019/10/banner_error_404.jpg?itok=eAS4swln"
        alt="not-found-page"
        className="not-found-img-desktop"
      />
      <h1 className="not-found-text">
        Lost your Way ? <br /> Go Home
      </h1>
    </div>
  </>
)

export default NotFound

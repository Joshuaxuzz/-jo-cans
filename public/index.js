import Cans from '../src/index.js'
import config from './cans.config'
!async function () {
  var cans = new Cans()
  await cans.render(config)
  var output = cans.output()
  let img = new Image()
  img.style.width = '375px'
  img.src = output
  document.body.appendChild(img)
  // console.log(cans)
}()
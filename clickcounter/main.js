const params = Object.fromEntries(new URLSearchParams(location.search).entries())

document.documentElement.style.fontSize = params.fontSize

let clicks = 0

function increase() {
  document.querySelector('p').innerText = ++clicks
}

window.addEventListener('keydown', ({ key }) => {
  if (key === 'Backspace' || key === 'Escape') {
    fetch('http://smartphone/keydown', {
      method: 'POST',
      body: JSON.stringify({ key })
    })
  }
})
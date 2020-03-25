const hourHand = document.getElementById("clock--hour-hand")
const minuteHand = document.getElementById("clock--minute-hand")
function setClock() {
  const time = new Date()
  const minute = time.getMinutes()
  const second = time.getSeconds()
  const minutePos = 360 * (minute + second / 60) / 60 - 90
  const hour = time.getHours()
  const hourPos = 30 * (hour % 12 + minute / 60) - 90
  hourHand.style.transform = `rotate(${hourPos}deg)`
  minuteHand.style.transform = `rotate(${minutePos}deg)`
}
setInterval(setClock, 10000)
setClock();
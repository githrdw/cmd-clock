const $hourHand = document.getElementById("clock--hour-hand")
const $minuteHand = document.getElementById("clock--minute-hand")
const $time = document.getElementById("time--digital")
const $weekday = document.getElementById("time--weekday")
const $date = document.getElementById("time--date")
const $alarm = document.getElementById("time--alarm")
const $body = document.body
const $card = document.getElementById("card--background")
const $sun = document.getElementById("sun")
const $moon = document.getElementById("moon")
const $ffBtn = document.getElementById("ffmode")

let ffMode = false
let timer = setInterval(setClock, 10000)

function getAlarm(hour) {
  if (hour >= 7 && hour <= 8) return "Opstaan"
  else if (hour === 9) return "Ontbijt"
  else if (hour > 9 && hour < 12) return "Sporten"
  else if (hour === 12) return "Lunch"
  else if (hour > 12 && hour < 17) return "Werken"
  else if (hour === 17) return "Diner"
  else if (hour > 17 && hour <= 20) return "Happy hour"
  else if (hour >= 21 && hour <= 22) return "TV kijken"
  else if (hour > 22 && hour <= 23) return "Naar bed"
  else {
    return "Slapen"
  }
}

function setClock(custom) {
  const time = custom || new Date()
  const minute = time.getMinutes()
  const second = time.getSeconds()
  const hour = time.getHours()
  const minutePos = 360 * (minute + second / 60) / 60 - 90
  const leadingMinute = minute.toString().padStart(2, '0')
  const hourPos = 30 * (hour % 12 + minute / 60) - 90

  $hourHand.style.transform = `rotate(${hourPos}deg)`
  $minuteHand.style.transform = `rotate(${minutePos}deg)`
  $sun.style.transform = `rotate(${-90 + 360 / 24 * hour}deg)`
  $moon.style.transform = `rotate(${90 + 360 / 24 * hour}deg)`
  $body.style.backgroundPosition = $card.style.backgroundPosition = (hour >= 0 && hour < 7) ? "bottom" : "center"

  $time.innerHTML = `${hour}:${leadingMinute}`
  $weekday.innerHTML = time.toLocaleDateString(undefined, { weekday: 'long' })
  $date.innerHTML = time.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })
  $alarm.innerHTML = getAlarm(hour) || ""
}

function toggleFFMode() {
  clearInterval(timer)
  if (ffMode) {
    timer = setInterval(setClock, 10000)
    setClock()
  } else {
    timer = setInterval(() => {
      let time = new Date();
      time.setHours(Math.round(time.getSeconds() / 60 * 24))
      time.setMinutes(time.getSeconds())
      setClock(time)
    }, 1000)
  }
  ffMode = !ffMode
}

setClock()
$ffBtn.addEventListener("click", toggleFFMode)
export let formatTime = (time) => {
  let y = new Date(time).getFullYear()
  let M = new Date(time).getMonth() + 1 < 10 ? `0${new Date(time).getMonth() + 1}` : new Date(time).getMonth() + 1
  let d = new Date(time).getDate() < 10 ? `0${new Date(time).getDate()}` : new Date(time).getDate()
  let h = new Date(time).getHours() < 10 ? `0${new Date(time).getHours()}` : new Date(time).getHours()
  let m = new Date(time).getMinutes() < 10 ? `0${new Date(time).getMinutes()}` : new Date(time).getMinutes()
  let s = new Date(time).getSeconds() < 10 ? `0${new Date(time).getSeconds()}` : new Date(time).getSeconds()
  return `${y}-${M}-${d} ${h}:${m}:${s}`
}

export class KeyController {
  constructor() {
    // 생성자
    this.keys = []

    window.addEventListener("keydown", e => {
      console.log(e.code + " 누름")
      this.keys[e.code] = true
      // this.keys["KeyW"] = true // ex) W 키를 눌렀을 경우
    })

    window.addEventListener("keyup", e => {
      console.log(e.code + " 뗌")
      delete this.keys[e.code]
    })
  }
}

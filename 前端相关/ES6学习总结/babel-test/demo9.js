const alertMe = (msg) => {
    window.alert(msg)
  }
  class Robot {
    constructor (msg) {
      this.message = msg
    }
    say () {
      alertMe(this.message)
    }
  }
  const marvin = new Robot('hello babel');
function randomPicker(array) {
  const randomIndex = Math.floor(Math.random() * array.length)

  return array[randomIndex]
}

function getUrl(length) {

  const number = '1234567890'
  const lowercaseLetter = 'abcdefghijklmnopqrstuvwxyz'
  const uppercaseLetter = lowercaseLetter.toUpperCase()

  //check if url isValid

  //mix number and letter
  const numberArray = number.split('')
  const lowercaseLetterArray = lowercaseLetter.split('')
  const uppercaseLetterArray = uppercaseLetter.split('')

  //concate letter pool
  const pool = [...numberArray, ...lowercaseLetterArray, ...uppercaseLetterArray]

  //create random letter
  let randomLetter = ''
  for (let i = 0; i < length; i++) {
    randomLetter += randomPicker(pool)
  }

  //concate url
  const baseUrl = 'http://localhost:3000/'
  const randomUrl = baseUrl + randomLetter
  return randomUrl
}


console.log(getUrl(5))
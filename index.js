const execa = require('execa')

// Remove %, check if isNaN
const getPercentage = (string) => {
  let s = string.substring(0, string.length - 1)
  if (isNaN(s)) {
    throw new Error('Percentage passed is NaN')
  } else {
    return s
  }
}

// Execute command and return percentage, if --verbose return full stdout
const battery = (flags) => execa.shell('pmset -g batt | egrep "([0-9]+%).*" -o').then(result => {
  let stdout = result.stdout
  if (flags.verbose) {
    stdout = stdout.substring(0, stdout.length - 14)
    return stdout
  } else {
    stdout = stdout.split('; ')
    return `${getPercentage(stdout[0])}%`
  }
})

module.exports = (flags = {}) => {
  // Check if user is using MacOS
  if (process.platform === 'darwin') {
    return Promise.resolve(battery(flags))
  } else {
    return Promise.resolve('Only MacOS systems are supported, for other platforms check gillstrom/battery-level.')
  }
}

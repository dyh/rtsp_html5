const yaml = require('yaml')
const { resolve } = require('path')
const fs = require('fs')
const file = fs.readFileSync(resolve('./config.yml'), 'utf8')
const yamlConfig = yaml.parse(file)

module.exports = yamlConfig
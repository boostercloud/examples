import * as fs from 'fs'
import * as yargs from 'yargs'
import * as yaml from 'yaml'
import * as path from 'path'
const loadTestsFolder = path.join(__dirname, 'load')

const args = yargs
  .option('target', {
    alias: 't',
    type: 'string',
  })
  .option('conference', {
    alias: 'c',
    type: 'string',
  }).argv

if (!args.target || !args.conference) {
  throw new Error(
    `Invalid arguments. Either target ('${args.target}') or conference ('${args.conference}') are empty/undefined. Be sure to use -t and -c flags`
  )
}

fs.readdirSync(loadTestsFolder).forEach(modifyTargetAndConference)

function modifyTargetAndConference(fileName: string): void {
  const filePath = path.join(loadTestsFolder, fileName)
  console.info(
    `> Modifying "config.target" and "config.variables.conferenceName" fields of the test script "${filePath}"`
  )
  const scriptInJSON = yaml.parse(fs.readFileSync(filePath).toString())
  scriptInJSON.config.target = args.target
  scriptInJSON.config.variables.conferenceName = args.conference

  const scriptInYAML = yaml.stringify(scriptInJSON)
  fs.writeFileSync(filePath, scriptInYAML)
}

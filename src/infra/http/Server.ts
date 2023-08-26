import 'dotenv/config'
import Saturn from './App'
import log from "@vendor/log"

Saturn.listen(process.env.PORT, () =>
  log.success("Saturn: Network & Web has been loaded")
)
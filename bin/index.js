//
// #!/usr/bin/env node
// -------------------------

import app from '../app/app.js'

console.info('Starting app!')

app.listen(
  app.get('port'), () => console.log(
    `Listening on port ${app.get('port')}`
  )
)

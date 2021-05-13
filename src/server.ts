import { App } from "./app"


const app: App = new App()
 
const port = process.env.DB_PORT || 3000

app.express.listen(port, () => {
  console.info('\u001b[34;1m' + 'Listening on port ' + port)
})

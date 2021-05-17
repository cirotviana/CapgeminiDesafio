import App from "./app"

const app:any = App;

const port = process.env.DB_PORT || 3000

app.listen(port, () => {
  console.info('\u001b[34;1m' + 'Listening on port ' + port)
})

export default app;
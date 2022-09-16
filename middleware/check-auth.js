export default function (context) {
  console.log(process.client)

  if (process.client) {
    context.store.dispatch('initAuth')
  }
}

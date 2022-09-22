export default function (context) {
  console.log(process.client)


    context.store.dispatch('initAuth', context.req)
}

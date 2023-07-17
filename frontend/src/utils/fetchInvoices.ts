import { Invoice } from '../types/Invoice.type'

export const fetchInvoices = () => wrapPromise(getInvoices())

export interface Resource<A> {
  read: () => never | A
}

const url = new URL('http://localhost:3000/invoices')

const getInvoices = () =>
  new Promise<Invoice[]>((resolve, reject) => {
    fetch(url)
        .then((result) => resolve(result.json()))
        .catch((error) => reject(error))
  })

const wrapPromise = <A>(promise: Promise<A>) => {
  let result: "pending" | Error | A = "pending"

  const setResult = (newResult: typeof result) => {
    result = newResult
  }

  const suspender = promise.then(setResult).catch(setResult)

  const resource: Resource<A> = {
    read() {
      if (result === "pending") {
        throw suspender
      } else if (result instanceof Error) {
        console.error('Error fetching invoices')
        throw result
      } else {
        return result
      }
    }
  }

  return resource
}

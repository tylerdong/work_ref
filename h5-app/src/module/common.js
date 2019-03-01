import dateFns from 'date-fns'
export const dateFormat = (value, format) => {
  if (value && format) {
    return dateFns.format(value, format)
  }
}
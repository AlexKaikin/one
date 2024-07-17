export function toFormData<Type extends object>(
  obj: Type,
  formData = new FormData(),
  prevKey: string | null | undefined = null
): Type {
  Object.entries(obj).forEach(([key, value]) => {
    const fieldName = prevKey
      ? `${prevKey}[${value instanceof File ? '' : key}]`
      : key

    if (
      value instanceof Object &&
      !(value instanceof File || value instanceof Date)
    ) {
      toFormData(value, formData, fieldName)
    } else {
      formData.append(fieldName, value)
    }
  })

  return formData as Type
}

export function toObject(obj: any) {
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      toObject(obj[key])
    } else {
      if (obj[key] === 'true') {
        obj[key] = true
      } else if (obj[key] === 'false') {
        obj[key] = false
      } else if (obj[key] === 'undefined') {
        obj[key] = undefined
      }
    }
  }
}

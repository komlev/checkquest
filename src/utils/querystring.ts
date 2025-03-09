export const stringify = (
  params: Record<string, unknown>,
  addPrefix?: boolean
) =>
  (addPrefix ? "?" : "") +
  new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, value]) =>
        value !== undefined ? { ...acc, [key]: value } : acc,
      {}
    )
  ).toString();

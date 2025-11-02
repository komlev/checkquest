export const stringify = (
  params: Record<string, unknown>,
  addPrefix?: boolean,
) =>
  (addPrefix ? "?" : "") +
  new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, value]) =>
        // biome-ignore lint/performance/noAccumulatingSpread: it is not critical
        value !== undefined ? { ...acc, [key]: value } : acc,
      {},
    ),
  ).toString();

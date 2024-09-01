// src/renderer/src/pages/utils.js

export const formatLabel = (field) => {
  return field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')
}

export function togglePhoto (id) {
  return { type: 'photos/select', payload: id }
}

export function setPhotosPerPage (perPage) {
  return { type: 'photos/setPhotosPerPage', payload: perPage }
}

export function resetSelection () {
  return { type: 'photos/reset' }
}

export function photosToBatchDeletePayload (photos) {
  return photos.reduce((list, photo) => {
    const albumIndex = list.findIndex(({ album }) => album === photo.album)
    let result

    if (albumIndex >= 0) {
      result = [
        ...list.slice(0, albumIndex),
        { album: photo.album, documents: `${list[albumIndex].documents},${photo.name}` },
        ...list.slice(albumIndex + 1)
      ]
    } else {
      result = [...list, { album: photo.album, documents: photo.name }]
    }

    return result
  }, [])
}

export function photoIdsToDeletePayload (photoIds, photos) {
  return photoIds.map(id => photos.find(photo => photo.id === id))
}

export function pagesToFlatArray (data) {
  return data.reduce((list, page) => [...list, ...page.documents], [])
}

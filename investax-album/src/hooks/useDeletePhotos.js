import { useMutation, queryCache } from 'react-query'
import { photoIdsToDeletePayload, photosToBatchDeletePayload, pagesToFlatArray } from './utils'
import axios from '../axios'
import { usePhotos } from './usePhotos'

export function useDeletePhotos () {
  const { resetSelection } = usePhotos()
  const [mutate, { status }] = useMutation(
    (selected) => {
      const photos = pagesToFlatArray(queryCache.getQueryData('photos'))
      const payload = photoIdsToDeletePayload(selected, photos)

      if (photos.length === 1) {
        const { album, name } = photos[0]
        return axios.delete(`/photos/${album}/${name}`)
      } else {
        return axios.delete('/photos', { data: photosToBatchDeletePayload(payload) })
      }
    },
    {
      onSuccess: () => {
        resetSelection()
        queryCache.invalidateQueries('photos')
      }
    }
  )

  return { deletePhotos: mutate, status }
}

import { useInfiniteQuery } from 'react-query'
import axios from '../axios'
import { usePhotos } from './usePhotos'

function usePhotosList () {
  const { state: { photosPerPage: limit } } = usePhotos()
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
    clear
  } = useInfiniteQuery(
    'photos',
    (key, params) => {
      const defaultParams = { skip: 0, limit }
      return axios.post('/photos/list', params || defaultParams).then(res => res.data)
    },
    {
      getFetchMore: (lastPage, allPages) => {
        if (lastPage && lastPage.count < limit) {
          return false
        }

        return {
          skip: allPages.length * limit,
          limit
        }
      }
    }
  )

  return {
    data,
    status,
    error,
    fetchMore,
    canFetchMore,
    isFetching,
    isFetchingMore,
    clear,
    limit
  }
}

export default usePhotosList

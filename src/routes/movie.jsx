import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Movie() {
  const { movieCd } = useParams()
  const [loading, setLoading] = useState(true)
  const [movieInfo, setMovieInfo] = useState({})

  const fetchMovieInfo = async () => {
    const response = await fetch(
      `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${
        import.meta.env.VITE_KOFIC_API_KEY
      }&movieCd=${movieCd}`
    )
    const movieInfo = (await response.json()).movieInfoResult.movieInfo
    setMovieInfo(movieInfo)
    setLoading(false)
  }

  useEffect(() => {
    fetchMovieInfo()
  }, [])

  return (
    <>
      {loading ? (
        <h1>불러오는 중</h1>
      ) : (
        <>
          <h1>
            {movieInfo.movieNm} ({movieInfo.movieNmEn}) {movieInfo.prdtYear}
          </h1>
          <p>상영시간: {movieInfo.showTm}분</p>
          <p>
            제작국가:{' '}
            {movieInfo.nations?.map((nation) => nation.nationNm).join(', ')}
          </p>
          <p>
            장르: {movieInfo.genres?.map((genre) => genre.genreNm).join(', ')}
          </p>
          <p>
            감독:{' '}
            {movieInfo.directors
              ?.map((director) => director.peopleNm)
              .join(', ')}
          </p>
          <p>
            심의정보:{' '}
            {movieInfo.audits?.map((audit) => audit.watchGradeNm).join(', ')}
          </p>
          <p>
            배우: {movieInfo.actors?.map((actor) => actor.peopleNm).join(', ')}
          </p>
          <p>
            스텝: {movieInfo.staffs?.map((staff) => staff.peopleNm).join(', ')}
          </p>
        </>
      )}
    </>
  )
}

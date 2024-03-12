import { useEffect, useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  let [year, month, yesterday] = new Date(Date.now() - 86400000)
    .toISOString()
    .split('T')[0]
    .split('-')

  const [loading, setLoading] = useState(true)

  const [dailyBoxOfficeList, setDailyBoxOfficeList] = useState([])

  const fetchDailyBoxOfficeList = async () => {
    const response = await fetch(
      `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${
        import.meta.env.VITE_KOFIC_API_KEY
      }&targetDt=${year}${month}${yesterday}`
    )
    const data = await response.json()
    setDailyBoxOfficeList(data.boxOfficeResult.dailyBoxOfficeList)
    setLoading(false)
  }

  useEffect(() => {
    fetchDailyBoxOfficeList()
  }, [])

  return (
    <>
      <h1>박스오피스</h1>
      <h2>
        {year}. {month}. {yesterday}.
      </h2>
      {loading ? (
        <h3>불러오는 중</h3>
      ) : (
        <ol>
          {dailyBoxOfficeList.map((movie) => (
            <li key={movie.rank}>
              <Link to={`/movie/${movie.movieCd}`}>
                <h3>
                  {movie.rank}{' '}
                  {movie.rankInten === '0'
                    ? ''
                    : movie.rankInten > 0
                    ? '⬆️'
                    : '⬇️'}
                </h3>
                <h3>
                  {movie.rankOldAndNew === 'OLD' ? '' : '🆕'} {movie.movieNm}
                </h3>
                <p>개봉일: {movie.openDt}</p>
                <p>누적관객수: {parseInt(movie.audiAcc).toLocaleString()}명</p>
                <p>누적매출액: {parseInt(movie.salesAcc).toLocaleString()}원</p>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </>
  )
}

export default App

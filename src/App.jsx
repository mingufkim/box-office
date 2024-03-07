import './App.css'

function App() {
  let [year, month, yesterday] = new Date(Date.now() - 86400000)
    .toISOString()
    .split('T')[0]
    .split('-')

  return (
    <>
      <h1>박스오피스</h1>
      <h2>
        {year}. {month}. {yesterday}.
      </h2>
    </>
  )
}

export default App

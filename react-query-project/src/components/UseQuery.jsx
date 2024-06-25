import { useQuery } from 'react-query'

function UseQuery() {

  //https://jsonplaceholder.org/posts
  const fetchData = useQuery('user', () => {
    return fetch('https://jsonplaceholder.org/posts').then(response => response.json())
  }, {
    enabled: false
  })

  const { data, isLoading, refetch } = fetchData;

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <button onClick={() => refetch()}>Veri çek</button>
      </div>
      <div>
        {data && data.map((data, i) => (
          <div key={i}>{data.title}</div>
        ))}
      </div>
    </>
  )
}

export default UseQuery

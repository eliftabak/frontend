// ASSESSMENT:
// You will be implementing a table with its content fetched from https://jsonplaceholder.typicode.com/todos?_start=0&_limit=10
// You will use functional components and hooks
// And a simple table styling in question1.css
// An example UI of a working version is presented in question1.gif
//

// BONUS POINT: implement pagination feature with Previous-Next buttons
// _start and _limit are query parameters which you can use to fetch some of the items, which is called 'pagination'
// _limit is always 10 for our case, but _start parameter can be changed to fetch portions of that data


// SOLUTION:
// React and ReactDOM is already imported in index.html
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_start=${(page - 1) * 10}&_limit=10`);
      const data = await response.json();
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, [page]);

  function handlePreviousClick() {
    if (page > 1) {
      setPage(page - 1);
    }
  }
  
  function handleNextClick() {
    setPage(page + 1);
  }

  return (
    <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>User ID</th>
            <th>Title</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {data.map(data => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.userId}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <button className='pagination-button' onClick={handlePreviousClick} disabled={page === 1}>
            Previous
          </button>
          <button className='pagination-button' onClick={handleNextClick}>Next</button>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

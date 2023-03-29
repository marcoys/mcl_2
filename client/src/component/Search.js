
import Card from './Card.js';


function Search({ login, searchResult }) {
  
  return (
    <>
      <div className="card">
        {
          searchResult !== undefined ? 
            (
              searchResult.slice(0).map((show, i) => {
                return (
                  <Card show={show} key={show._id} login={login} />
                )
              })
            )
          :
          <p>ㅎㅇ</p>
        }
      </div>
    </>
  );
}

export default Search;

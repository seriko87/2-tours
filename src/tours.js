import React, { useState, useEffect } from "react";
const url = "https://course-api.com/react-tours-project";

const Tours = () => {
  const [isLoading, setLoading] = useState(true);
  const [tours, setTour] = useState();

  const newList = (id) => {
    let newTour = tours.filter((item) => item.id !== id);
    setTour(newTour);
  };

  useEffect(() => {
    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((tour) => {
        setTour(tour);
        setLoading(false);
        console.log("doen");
      })
      .catch((error) => console.log(error));
  }, []);

  const refreshPage = () => {
    window.location.reload(true);
  };
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <section>
      {tours.length ? (
        <h2>Our Tours</h2>
      ) : (
        <>
          <h2>No Tours Left</h2> <button onClick={refreshPage}> Refresh</button>
        </>
      )}

      {tours.map((tour) => {
        const { id, name, info, image, price } = tour;
        return (
          <div key={id} className='tours'>
            <div className='image'>
              <img src={image} alt={name} />
            </div>
            <div>
              <div className='title'>
                <h2>{name}</h2>
                <h3>${price}</h3>
              </div>

              <p>{info}</p>
            </div>
            <button onClick={() => newList(id)}> not interested</button>
          </div>
        );
      })}
    </section>
  );
};

export default Tours;

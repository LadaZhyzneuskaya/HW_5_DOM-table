fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then((data) => {
    console.log(data.products);
    // Start here :)

    const products = data.products;

    const container = document.querySelector('div.wrapper');

    let htmlCatalog = '';

    products.forEach( ({ description, thumbnail, price, rating, title }) => {
      htmlCatalog += `
        <div class="col">
          <div class="card h-100">
            <div class="image-block">
              <img src="${thumbnail}" class="card-img-top image" alt="${title}">
            </div>
            
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${description}</p>
            </div>

            <div class="card-footer border-top-0">
              <div class="row border-top mx-1 py-2 bg-secondary bg-opacity-10">
                <p class="col data-price">Price: ${price}$</p>
                <p class="col data-rating">Rating: ${rating}</p>
              </div>
            </div>
          </div>
        </div>`

      container.innerHTML = htmlCatalog;
    });

  });
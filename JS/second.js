fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then((data) => {
    console.log(data.products);
    // Start here :)

    const products = data.products;

    const container = document.querySelector('div.wrapper');

    products.forEach(product => {
      const column = document.createElement('div');
      const cardWrapper = document.createElement('div');
      const cardImageBlock = document.createElement('div');
      const image = document.createElement('img');
      const cardBodyBlock = document.createElement('div');
      const cardBodyTitle = document.createElement('h5');
      const cardBodyText = document.createElement('p');
      const cardFooterBlock = document.createElement('div');
      const cardFooterFlex = document.createElement('div');
      const cardFooterPrice = document.createElement('p');
      const cardFooterRating = document.createElement('p');

      column.classList.add('col');
      cardWrapper.classList.add('card', 'h-100');
      cardImageBlock.classList.add('image-block');
      image.classList.add('card-img-top', 'image');
      image.setAttribute('src', `${product.thumbnail}`);
      image.setAttribute('alt', `${product.title}`);
      cardBodyBlock.classList.add('card-body');
      cardBodyTitle.classList.add('card-title');
      cardBodyText.classList.add('card-text');
      cardFooterBlock.classList.add('card-footer', 'border-top-0');
      cardFooterFlex.classList.add('row', 'border-top', 'mx-1', 'py-2', 'bg-secondary', 'bg-opacity-10');
      cardFooterPrice.classList.add('col');
      cardFooterRating.classList.add('col');

      cardImageBlock.append(image);
      cardBodyBlock.append(cardBodyTitle, cardBodyText);
      cardFooterBlock.append(cardFooterFlex);
      cardFooterFlex.append(cardFooterPrice, cardFooterRating);
      cardWrapper.append(cardImageBlock, cardBodyBlock, cardFooterBlock);
      column.append(cardWrapper);
      container.append(column);

      cardBodyTitle.textContent = `${product.title}`;
      cardBodyText.textContent = `${product.description}`;
      cardFooterPrice.textContent = `Price: $${product.price}`;
      cardFooterRating.textContent = `Rating: ${product.rating}`;
      });

  });
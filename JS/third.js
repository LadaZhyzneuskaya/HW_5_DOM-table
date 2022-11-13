fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then((data) => {
    console.log(data.products);
    // Start here :)

    const products = data.products;

    const container = document.querySelector('div.wrapper');

    const makeElement = (tagName, className, text) => {
      const element = document.createElement(tagName);
      element.classList.add(className);
      element.textContent = text;
      console.log(element);
      return element;
    }

    products.forEach(product => {
      const column = makeElement('div', 'col');

      const cardWrapper = makeElement('div', 'card');
      cardWrapper.classList.add('h-100');

      const cardImageBlock = makeElement('div', 'image-block');

      const image = makeElement('img', 'card-img-top');
      image.classList.add('image');
      image.setAttribute('src', product.thumbnail);
      image.setAttribute('alt', product.title);

      const cardBodyBlock = makeElement('div', 'card-body');

      const cardBodyTitle = makeElement('h5', 'card-title', `${product.title}`);

      const cardBodyText = makeElement('p', 'card-text', `${product.description}`);

      const cardFooterBlock = makeElement('div', 'card-footer');
      cardFooterBlock.classList.add('border-top-0');

      const cardFooterFlex = makeElement('div', 'row');
      cardFooterBlock.classList.add('border-top');
      cardFooterBlock.classList.add('mx-1');
      cardFooterBlock.classList.add('py-2');
      cardFooterBlock.classList.add('bg-secondary');
      cardFooterBlock.classList.add('bg-opacity-10');

      const cardFooterPrice = makeElement('p', 'col', `Price: $${product.price}`);

      const cardFooterRating = makeElement('p', 'col', `Rating: ${product.rating}`);

      
      cardImageBlock.append(image);
      cardBodyBlock.append(cardBodyTitle, cardBodyText);
      cardFooterBlock.append(cardFooterFlex);
      cardFooterFlex.append(cardFooterPrice, cardFooterRating);
      cardWrapper.append(cardImageBlock, cardBodyBlock, cardFooterBlock);
      column.append(cardWrapper);
      container.append(column);
    });
  });
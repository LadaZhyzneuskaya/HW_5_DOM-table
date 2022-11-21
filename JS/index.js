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

      return element;
    }

    products.forEach((product) => {
      const column = makeElement('div', 'col');

      const cardWrapper = makeElement('div', 'card');
      cardWrapper.setAttribute('data-id', product.id);
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
      cardFooterPrice.setAttribute('data-price', 'price');

      const cardFooterRating = makeElement('p', 'col', `Rating: ${product.rating}`);

      const cardFooterButtonBlock = makeElement('div', 'd-grid');
      cardFooterButtonBlock.classList.add('gap-2');
    
      const cardFooterAddButton = makeElement('button', 'btn', 'Add to cart');
      cardFooterAddButton.classList.add('btn-primary');
      cardFooterAddButton.classList.add('my-2');
      cardFooterAddButton.setAttribute('type', 'submit');
      cardFooterAddButton.setAttribute('data-cart', 'add-button');

      cardImageBlock.append(image);
      cardBodyBlock.append(cardBodyTitle, cardBodyText);
      cardFooterBlock.append(cardFooterFlex, cardFooterButtonBlock);
      cardFooterButtonBlock.append(cardFooterAddButton);
      cardFooterFlex.append(cardFooterPrice, cardFooterRating);
      cardWrapper.append(cardImageBlock, cardBodyBlock, cardFooterBlock);
      column.append(cardWrapper);
      container.append(column);
    });



    // ----------  SEARCH FILTER ----------

    const formSearch = document.querySelector('form.d-flex');
    const titleProductList = document.querySelectorAll('.card-title');
    const descriptionProductList = document.querySelectorAll('p.card-text');

    formSearch.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    formSearch.addEventListener('change', (event) => {
      const value = event.target.value.trim().toLowerCase();

      [...titleProductList].find((title) => {
        if (title.innerText.toLowerCase().includes(value) === false) {
          title.closest('div.card').classList.add('d-none');
        } else {
          title.closest('div.card').classList.remove('d-none');
        }
      });

      [...descriptionProductList].find((descr) => {
        if (descr.innerText.toLowerCase().includes(value) === false) {
          descr.closest('div.card').classList.add('d-none');
        } else {
          descr.closest('div.card').classList.remove('d-none');
        }
      });

      if (!value) {
        makeElement();
      }
    });



    // ---------- OPEN/CLOSE CART PAGE ----------

    const cartPage = document.querySelector('div.cart');

    const showCartPage = () => {
      cartPage.classList.toggle('cart-off');
    }

    const openCartButton = document.getElementById('showCart');
    openCartButton.addEventListener('click', showCartPage);

    const cartCloseButton = document.querySelector('button.cart-close-btn');
    cartCloseButton.addEventListener('click', showCartPage);


  
    // ---------- CART TOTAL PRICE ----------

    function calcCartPrice() {
      const orderListItems = document.querySelectorAll('.list-group-item');
      const cartTotalPriceInfo = document.querySelector('[data-total-price]');
      const buttonCartTotalPrice = document.querySelector('[data-cart-button-total-price]');

      let totalPrice = 0;

      orderListItems.forEach((item) => {
        const amountEl = item.querySelector('[data-counter]');
        const priceEl = item.querySelector('[data-innerPrice]');
        const currentPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText);
        
        totalPrice += currentPrice;
      })

      cartTotalPriceInfo.innerText = totalPrice.toFixed(2);
      buttonCartTotalPrice.innerText = totalPrice.toFixed(2);
    }



    // ---------- ADD PRODUCTS TO CART ----------

    const orderList = document.querySelector('.list-group');

    document.addEventListener('click', (event) => {
      if (event.target.hasAttribute('data-cart')) {
        const card = event.target.closest('.card');

        const cardPriceNumber = card.querySelector('[data-price]').innerText
          .split('')
          .filter((item) => {
            if (item === '0') {
              return 10;
            }
            
            return Number(item);
          })
          .join('');

        // Data from card
        const productInfo = {
          id: card.dataset.id,
          image: card.querySelector('.card-img-top').getAttribute('src'),
          title: card.querySelector('.card-title').innerText,
          description: card.querySelector('.card-text').innerText,
          price: Number(cardPriceNumber),
        }

        // The presence of the same item in the cart
        const itemInCart = orderList.querySelector(`[data-id="${productInfo.id}"]`);

        if (itemInCart) {
          const counterElement = itemInCart.querySelector('[data-counter]');
          counterElement.innerText = parseInt(counterElement.innerText) + 1;
        } else {
          const cartItemHTML = `
            <li class="list-group-item d-flex align-content-center" data-id="${productInfo.id}">
            <img class="p-2 flex-shrink-0 cart-image-size" src="${productInfo.image}" alt="img">

            <p class="p-2 flex-grow-1 mt-3">${productInfo.title}</p>

            <div class="cart-count p-2 my-2">
              <span class="badge py-3 bg-secondary" data-action="minus">-</span>

              <span class="badge bg-primary rounded-pill pt-3 fs-6">
                <span data-counter>1</span>
                <span>x</span>
                <span data-innerPrice>${productInfo.price}</span>
              </span>

              <span class="badge py-3 bg-secondary p-2" data-action="plus">+</span>
            </div>

            <button class="btn ms-3 btn-danger p-2 my-3" type="reset" value="Reset">Remove from order</button>
          </li>`;

          orderList.insertAdjacentHTML('beforeend', cartItemHTML);
        }

        // Disabled badge-minus
        const badgeMinus = document.querySelectorAll('[data-action="minus"]');

        badgeMinus.forEach((item) => {
          if (item.nextElementSibling.firstElementChild.innerText === '1') {
            item.classList.add('bg-opacity-50');
          } else {
            item.classList.remove('bg-opacity-50');
          }
        })

        toggleCartStatus();

        calcCartPrice();
      }
    })



    // ---------- COUNTER ----------

    document.addEventListener('click', (event) => {
      if (event.target.dataset.action === 'minus' || event.target.dataset.action === 'plus') {
        const counterWrapper = event.target.closest('.cart-count');
        counter = counterWrapper.querySelector('[data-counter]');
      }

      if (event.target.dataset.action === 'minus') {
        if (parseInt(counter.innerText) === 2 && event.target.closest('.cart-count')) {
          counter.innerText = --counter.innerText;
          const badgeMinus = event.target.closest('.cart-count').firstElementChild;
          badgeMinus.classList.add('bg-opacity-50');
        } else if (parseInt(counter.innerText) > 1) {
          counter.innerText = --counter.innerText;
        }
      }

      if (event.target.dataset.action === 'plus') {
        counter.innerText = ++counter.innerText;
        const minus = event.target.closest('.cart-count').firstElementChild;
        minus.classList.remove('bg-opacity-50');
      }

      calcCartPrice();
    })



    // ---------- CART STATUS ----------

    function toggleCartStatus() {
      const listGroup = document.querySelector('ul.list-group');
      const cartPlaceholder = document.querySelector('.cart-placeholder-container');
      const cartOrderButton = document.querySelector('[data-order]');
      
      if (listGroup.children.length > 0) {
        cartPlaceholder.classList.add('d-none');
        cartOrderButton.removeAttribute('disabled');
      } else {
        cartPlaceholder.classList.remove('d-none');
        cartOrderButton.disabled = true;
      }
    }



    // ---------- REMOVE PRODUCT FROM CART ----------

    const orderUl = document.querySelector('ul.list-group');
    orderUl.addEventListener('click', (event) => {
      if (!event.target.classList.contains('btn-danger')) {
        return;
      }

      const orderLiElement = event.target.closest('li');
      orderLiElement.remove();

      toggleCartStatus();
    });
  });
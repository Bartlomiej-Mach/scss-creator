


const smartCheck = () => {
  const sizes = document.querySelectorAll('.main--element.sizes .smart-check button');
  const sizesCheckbox = document.querySelectorAll('.main--element.sizes .checkbox input');
  const popularSizes = document.querySelectorAll('.main--element.sizes .popular');
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');

  for (let i = 0; i < sizes.length; i++) {
    sizes[i].addEventListener('click', () => {
      if(sizes[i].getAttribute('data-check') == 'popular') {
        for (let j = 0; j < sizesCheckbox.length; j++) {
          sizesCheckbox[j].checked = false;
          allCheckboxes[j].closest('.checkbox').classList.remove('active');
        }
        for (let j = 0; j < popularSizes.length; j++) {
          popularSizes[j].checked = true;
          popularSizes[j].closest('.checkbox').classList.add('active');
        }
      } else if(sizes[i].getAttribute('data-check') == 'all') {
        for (let j = 0; j < sizesCheckbox.length; j++) {
          sizesCheckbox[j].checked = true;
          allCheckboxes[j].closest('.checkbox').classList.add('active');
        }
      } else if(sizes[i].getAttribute('data-check') == 'deselect') {
        for (let j = 0; j < sizesCheckbox.length; j++) {
          sizesCheckbox[j].checked = false;
          allCheckboxes[j].closest('.checkbox').classList.remove('active');
        }
      }
    })
  }
}

const checkboxColors = () => {
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  for (let i = 0; i < allCheckboxes.length; i++) {
    allCheckboxes[i].addEventListener('click', () => {
      allCheckboxes[i].closest('.checkbox').classList.toggle('active');
    })
    
  }
}


const generateCode = () => {

  // base
  let output = 
  `
  @import 'custom_modules/scss/functions';
  `;
  const footer = document.querySelector('footer .footer--code');


  // font 
  const fontInput = document.querySelector('.main--element.font input');
  if(fontInput.value !== '') {
    output += 
    `
    body {
      font-family: "${fontInput.value}", sans-serif;
    }
    `
  }

  // banner preview
  const previewInput = document.querySelector('.main--element.preview input');
  if(previewInput.value !== '') {
    output += 
    `
  @if '__BANNER.DESIGN_PREVIEW__' == 'true' {
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: 0 auto; 
      width: __BANNER.WIDTH__px;
      height: __BANNER.HEIGHT__px;
      z-index: 9999;
      pointer-events: none;
      opacity: 0;
      opacity: 0.3;
      background-size: cover;
      background-image: url('./images/${previewInput.value}')
    }
  }
    `
  }

  // banner bg 
  const bannerBgInput = document.querySelector('.main--element.banner-bg input');
  if(bannerBgInput.value !== '') {
    output += 
    `
    .banner {
      background-image: url('./images/${bannerBgInput.value}');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    `
  }

  //banner sizes + offers

  const sizeCheckbox = document.querySelectorAll('.main--element.sizes .checkbox input:checked');
  const variablesOffersContainer = document.querySelectorAll('.main--element.offers-container .checkbox input:checked');
  const variablesOfferInfo = document.querySelectorAll('.main--element.offer-info .checkbox input:checked');
  const arrowsDotsCheckbox = document.querySelectorAll('.main--element.arrows-dots .checkbox input:checked');
  const videoCheckbox = document.querySelectorAll('.main--element.video .checkbox input:checked');
  
  let arrowDots = '';
  let video = '';

  let nameOffersContainer = '';
  let priceOffersConatiner = '';
  let buttonOffersContainer = '';
  let customOfferContainer = '';

  let nameOfferInfo = '';
  let priceOfferInfo = '';
  let buttonOfferInfo = '';
  let customOfferInfo = '';

  let offersContainer = '';
  let offerInfo = '';


  // offers container creator
  if(variablesOffersContainer.length > 0) {
    for (let i = 0; i < variablesOffersContainer.length; i++) {
      
      if(variablesOffersContainer[i].id == 'nameC') {
        nameOffersContainer += 
        `
          .name {
            left: 10px;
            top: 100px;
            font-size: 15px;
            width: 130px;
          }
        `
      }

      if(variablesOffersContainer[i].id == 'priceC') {
        priceOffersConatiner = 
        `
          .price-wrapper {
            left: 10px;
            top: 130px;
            font-size: 15px;
          }
        `
      } 
      
      if(variablesOffersContainer[i].id == 'oldpriceC') {
        priceOffersConatiner = 
        `
          .price-wrapper {
            left: 10px;
            top: 130px;
            font-size: 15px;
            .oldprice {
              font-size: 15px;
              margin: 0 10px 0 0;
            }
          }
        `
      } 
      
      if(variablesOffersContainer[i].id == 'buttonC') {
        buttonOffersContainer = 
        `
          .button {
            width: 100px;
            height: 35px;
            left: 10px;
            top: 160px;
            font-size: 13px;
          }
        `
      } 

      if(variablesOffersContainer[i].id == 'customC') {
        const cp = document.querySelector('#customNameC');
        
        if(cp.value !== '') {
          customOfferContainer = 
          `
            .custom-property--${cp.value} {
              left: 10px;
              top: 140px;
              font-size: 13px;
            }
          `
        }
        
      }

    }
  }
  
  if(variablesOffersContainer.length > 0) {
    offersContainer = 
    `
    .offers-container {
      width: 100%;
      height: 300px;
      left: 0px;
      bottom: 0px;      

      .offers-wrapper {
        padding: 0 0 !important;
        gap: 0 0 !important;

        .offer {
          .image {
            width: 100%;
            height: 50px;
            left: 0;
            top: 0;
          }
          
          ${nameOffersContainer}
          ${priceOffersConatiner}
          ${buttonOffersContainer}
          ${customOfferContainer}
        }
      }
    } 
    `
  }

  // offer info creator
  if(variablesOfferInfo.length > 0) {
    for (let i = 0; i < variablesOfferInfo.length; i++) {
      
      if(variablesOfferInfo[i].id == 'name') {
        nameOfferInfo += 
        `
        .name {
          left: 10px;
          top: 100px;
          font-size: 15px;
          width: 130px;
        }
        `
      }

      if(variablesOfferInfo[i].id == 'price') {
        priceOfferInfo = 
        `
        .price-wrapper {
          left: 10px;
          top: 130px;
          font-size: 15px;
        }
        `
      } 
      
      if(variablesOfferInfo[i].id == 'oldprice') {
        priceOfferInfo = 
        `
        .price-wrapper {
          left: 10px;
          top: 130px;
          font-size: 15px;
          .oldprice {
            font-size: 15px;
            margin: 0 10px 0 0;
          }
        }
        `
      } 
      
      if(variablesOfferInfo[i].id == 'button') {
        buttonOfferInfo = 
        `
        .button {
          width: 100px;
          height: 35px;
          left: 10px;
          top: 160px;
          font-size: 13px;
        }
        `
      } 

      if(variablesOfferInfo[i].id == 'custom') {
        const cp = document.querySelector('#customName');
        
        if(cp.value !== '') {
          customOfferInfo = 
          `
          .custom-property--${cp.value} {
            left: 10px;
            top: 140px;
            font-size: 13px;
          }
          `
        }
        
      }

    }
  }

  if(variablesOfferInfo.length > 0) {
    console.log(variablesOfferInfo);
    offerInfo = 
    `
    .offer-info {
      width: 100%;
      height: 300px;
      left: 0px;
      bottom: 0px;      
      ${nameOfferInfo}
      ${priceOfferInfo}
      ${buttonOfferInfo}
      ${customOfferInfo}
    } 
    `
  }

  // arrows and dots 
  
  if(arrowsDotsCheckbox.length > 0) {
    for (let i = 0; i < arrowsDotsCheckbox.length; i++) {
      if(arrowsDotsCheckbox[i].id == 'arrows') {
        arrowDots += 
        `
    .arrow {
      width: 40px !important;
      height: 40px !important;
      transform: translateY(0) !important;
      top: 400px;
      svg {
        width: 20px !important;
        height: 20px !important;
      }
    }

    #arrowPrev {
      left: 20px !important;
    }
    #arrowNext {
      right: 20px !important;
    }
        `;
      }
      if(arrowsDotsCheckbox[i].id == 'dots') {
        arrowDots += 
        `
    .dots {
      width: 70px;
      bottom: 10px;
      .dot {
        width: 8px !important;
        height: 8px !important;
      }
    }
        `
      }
    }
  }

  // video 

  if(videoCheckbox.length > 0) {
    for (let i = 0; i < videoCheckbox.length; i++) {
      if(videoCheckbox[i].id == 'video') {
        video = 
        `
    .video-container {
      left: 0;
      top: 100px;
      width: 100%;
      height: 100%;
      .video-button {
        width: 100px;
        height: 20px;
        left: 50px;
        top: 150px;
        font-size: 15px;
      }
    }
        `
      }
      if(videoCheckbox[i].id == 'videoAudio') {
        video = 
        `
    .video-container {
      left: 0;
      top: 100px;
      width: 100%;
      height: 100%;
      .video-button {
        width: 100px;
        height: 20px;
        left: 50px;
        top: 150px;
        font-size: 15px;
      }
      .audio {
        width: 40px;
        height: 40px;
      }
    }
        `
      }
      
    }
  }

  // rest of css

  for (let i = 0; i < sizeCheckbox.length; i++) {

    output += 
    `
  .${sizeCheckbox[i].id} {
    .logo {
      width: 100%;
      height: 60px;
      left: 0;
      top: 0;
      &__image {
        width: 100%
      }
    }
    ${video}
    ${offersContainer}
    ${offerInfo}
    ${arrowDots}
  }  
    `    
  }



  footer.innerHTML = `<pre><code>${output}</code></pre>`;
  

}


document.querySelector('.generate-code').addEventListener('click', () => {
  document.querySelector('.copy-code').disabled = false;
  document.querySelector('.copy-code').classList.remove('disabled');
  generateCode();
})


const copyCode = () => {
  document.querySelector('.copy-code').addEventListener('click', async () => {
    document.querySelector('.popup').classList.add('popup--active');
    setTimeout(() => {
      document.querySelector('.popup').classList.remove('popup--active');
    }, 2000);

    try {
      const textToCopy = document.querySelector('.footer--code code').textContent;
      
      await navigator.clipboard.writeText(textToCopy);
      
      
  } catch (err) {
      console.error('Nie udało się skopiować tekstu: ', err);
  }
});
}





copyCode();
checkboxColors();
smartCheck();
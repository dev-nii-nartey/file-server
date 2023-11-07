
//send open mail overlay
const sendMailBtn = document.querySelectorAll('.btn.sendMail');
const closeOverlayBtn = document.querySelector('.closebtn');


const closeSendMailForm = () => {
  document.querySelector('.myOverlay').style.display = 'none';
};

sendMailBtn.forEach((e) => {
  const selectedFile = e.value;
  console.log(e.value);
  e.addEventListener('click', () => {
    document.querySelector('.myOverlay').style.display = 'block';
    document.getElementById('mailfilepath').value = selectedFile;
  });
});

closeOverlayBtn.addEventListener('click', closeSendMailForm);





//search products
const search = () => {
  const searchBox = document.getElementById('search-item').value.toUpperCase();
  const productItems = document.getElementById('grid');
  const product = document.querySelectorAll('.card.product-item');
  const productName = productItems.querySelectorAll('.product__title');

  for (let i = 0; i < productName.length; i++) {
    const match = product[i].getElementsByTagName('h1')[0];

    if (match) {
      let textValue = match.textContent || match.innerHTML;

      if (textValue.toUpperCase().indexOf(searchBox) > -1) {
        product[i].style.display = '';
      } else {
        product[i].style.display = 'none';
      }
    }
  }
};







/* () => {
  const data = { filepath: e.value };
  fetch('/download', {method: 'POST',  headers: {
    'Content-Type': 'application/json'
  },
   body: JSON.stringify(data)});
}; */

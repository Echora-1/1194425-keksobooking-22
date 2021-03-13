const createImage = () => {
  const image = document.createElement('img');
  image.classList.add('photo-housing')
  image.style.position = 'absolute';               /* 2 */
  image.style.top = '50%';
  image.style.left = '50%';
  image.style.transform = 'translate(-50%, -50%)';                       /* 3 */
  image.style.width = '40px';
  image.style.height = '40px';

  return image;
};

export{createImage};

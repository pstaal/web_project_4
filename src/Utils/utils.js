//create handleCardClick function for cards
export function handleCardClick(evt) {
 const imageLink = evt.target.src;
 const imageName = evt.target.alt;
 popupImage.open(imageLink, imageName); 
};





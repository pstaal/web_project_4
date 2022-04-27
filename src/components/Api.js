import Card from "./Card";
import Section from "./Section";
import { profilePicture, profileButton, placeButton, pictureButton } from "../utils/constants";
import UserInfo from "./UserInfo";
import PopupConfirmation from "./PopupConfirmation";
import PopupWithImage from "./PopupWithImage";


//handleclick function for deleting card
function handleClick(card) {
  api.deleteCard(card.id);
  card.removeCard();
}

//instantiate popup confirmation class
const popupConfirmation = new PopupConfirmation(".popup-confirm", handleClick);
popupConfirmation.setEventListeners();

//instantiate popupimage class
const popupImage = new PopupWithImage(".popup-picture");
popupImage.setEventListeners();

//instantiate user info class
export const userInfo = new UserInfo({userNameSelector: '.profile__name', userJobSelector: '.profile__function'});


//function to create a new card
function createCard(data, template, callback, popupConfirmation) {
    const card = new Card(data, template, callback, popupConfirmation);
    return card.generateCard();
}

//create handleCardClick function for cards
export function handleCardClick({ link, text }) {
  popupImage.open(link, text); 
};


class Api {
    constructor({ baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._section = null;
      }

      initialize() {
        return Promise.all([
          fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
          }),
          fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
          })
        ]);
      }
    
      getInitialCards() {
            this.initialize()
            .then(res => res[0].json())
            .then((result) => {
              const section = new Section({ 
                items: result, 
                renderer: (item) => {
                  console.log(item)
                  const element = createCard({text: item.name, imageLink: item.link, likes: item.likes, owner: item.owner.name, _id: item._id}, "#card-template", handleCardClick, popupConfirmation);
                  section.addItem(element);
                }
                },
                ".places"
              );
              this._section = section;
              
              this._section.renderItems();
            });  
      }

      getInitialUser() {
        this.initialize()
            .then(res => res[1].json())
            .then((result) => {
                userInfo.setUserInfo({userName: result.name, userJob: result.about});
                profilePicture.src = result.avatar;
            })
      }


      addCart({title, link}){
        placeButton.textContent = "Saving...";
        fetch(`${this._baseUrl}/cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name: title,
            link
          })
        })
        .then((res) => res.json())
        .then((result) => {
          placeButton.textContent = "Create";
          const element = createCard({text: result.name, imageLink: result.link, likes: result.likes, owner: document.querySelector(".profile__name").innerHTML, _id: result._id}, "#card-template", handleCardClick, popupConfirmation);
          this._section.addItem(element);
        });
     }


     deleteCard(id) {
      fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers
      });
     }

     toggleLike(id) {
       let card = document.getElementById(id);
       if(card.querySelector(".places__card-button").classList.contains("places__card-button-liked")){
        fetch(`${this._baseUrl}/cards/likes/${id}`, {
          method: "DELETE",
          headers: this._headers
        })
        .then((res) => res.json())
        .then((result) => {
          card.querySelector(".places__likes-counter").innerHTML = result.likes.length;
        });
         
       } else {
        fetch(`${this._baseUrl}/cards/likes/${id}`, {
          method: "PUT",
          headers: this._headers
        })
        .then((res) => res.json())
        .then((result) => {
          card.querySelector(".places__likes-counter").innerHTML = result.likes.length;
        });
       }
     }

     changePicture({avatar}){
      pictureButton.textContent = "Saving...";
      fetch(`${this._baseUrl}/users/me/avatar`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            avatar
          })
        })
        .then(res => res.json())
            .then((result) => {
                pictureButton.textContent = "Save";
                profilePicture.src = result.avatar;
        });
      }

      getInitialUser() {
        fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
          })
            .then(res => res.json())
            .then((result) => {
                userInfo.setUserInfo({userName: result.name, userJob: result.about});
                profilePicture.src = result.avatar;
            })
      }

      setNewUser({userName, userJob}) {
        profileButton.textContent = "Saving...";
        fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
              name: userName,
              about: userJob
            })
            }).then(res => res.json())
              .then(data => {
                profileButton.textContent = "Save";
                userInfo.setUserInfo({ userName: data.name, userJob: data.about}); 
              });
      }
    
    

};


export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "5ad7ef92-ff2d-4fbe-9e41-f5034926c435",
    "Content-Type": "application/json"
  }
}); 


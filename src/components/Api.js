import Card from "./Card";
import Section from "./Section";
import { profilePicture } from "../utils/constants";
import UserInfo from "./UserInfo";

//instantiate user info class
export const userInfo = new UserInfo({userNameSelector: '.profile__name', userJobSelector: '.profile__function'});


//function to create a new card
export function createCard(data, template, callback) {
    const card = new Card(data, template, callback);
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
      }
    
      getInitialCards() {
            fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
          })
            .then(res => res.json())
            .then((result) => {
              const section = new Section({ 
                items: result, 
                renderer: (item) => {
                  const element = createCard({text: item.name, imageLink: item.link}, "#card-template", handleCardClick);
                  section.addItem(element);
                }
                },
                ".places"
              );
              
              section.renderItems();
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

      setNewUser(data) {
        fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
              name: data.userName,
              about: data.userJob
            })
            }).then(res => res.json())
              .then(data => userInfo.setUserInfo({ userName: data.name, userJob: data.about})); 
      }
    
    

};

export const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
      authorization: "5ad7ef92-ff2d-4fbe-9e41-f5034926c435",
      "Content-Type": "application/json"
    }
  }); 

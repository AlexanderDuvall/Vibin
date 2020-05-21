import React from 'react'
import insert from  '../../../assets/images/insert.png'
import  avatar from '../../../assets/images/default-avatar.jpg'
class UserHeader extends React.Component{

    selectImage = (type) => {
        let t = type + "Input";
        console.log(t);
        document.getElementById(t).click();
    }

    handleChange = (image) => {
        let im = image.substring(0, image.length-5);
        console.log(im);
        }

    render() {
        return(
        <div className="Header" id="header">
            <div className="LeftHeader" id="leftHeader">
                <img src={insert} className="LeftHeaderImage" id="leftHeaderImage" onClick={() => { this.selectImage("firstHeader") }} />
                <div className="Badge LeftBadge" id="badge1">
                    Banner Color
                </div>
            </div>
            <div className="Avatar" id="avatar">
                <img src={avatar} style={{width: 100, height: 100}} id="avatarImage" onClick={() => {this.selectImage("avatar")}}/>
            </div>
            <div className="RightHeader" id="rightHeader">
                <img src={insert} className="RightHeaderImage" id="rightHeaderImage" onClick={() => {this.selectImage("secondHeader")}}/>
                <div className="Badge RightBadge" id="badge2">
                    Banner Text Color
                </div>
            </div>
            <input hidden className="photo_upload" type="file" name="user[firstHeader]" id="firstHeaderInput" onChange={() => {this.handleChange(this.id)}}/>
            <input hidden className="photo_upload" type="file" name="user[secondHeader]" id="secondHeaderInput" onChange={() => {this.handleChange(this.id)}}/>
            <input hidden className="photo_upload" type="file" name="user[avatar]" id="avatarInput" onChange={() => {this.handleChange(this.id)}}/>
        </div>
        );
    }
}
export default UserHeader;
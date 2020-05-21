import React from 'react'
import insert from  '../../../assets/images/insert.png'
import  avatar from '../../../assets/images/default-avatar.jpg'
class UserHeader extends React.Component{

    selectImage(type){
        document.getElementById(type).trigger('click');
    }

    handleChange(image){
        let im = image + "Image";
        document.getElementById(im).src = window.URL.createObjectURL(this.files[0]);
    }



    render() {
        return(
        <div className="Header" id="header">
            <div className="LeftHeader" id="leftHeader">
                <img src={insert} className="LeftHeaderImage" id="leftHeaderImage" onClick={this.selectImage("firstHeader")}/>
                <div className="Badge LeftBadge" id="badge1">
                    Banner Color
                </div>
            </div>
            <div className="Avatar" id="avatar">
                <img src={avatar} style={{width: 100, height: 100}} id="avatarImage" onClick={this.selectImage("avatarUpload")}/>
            </div>
            <div className="RightHeader" id="rightHeader">
                <img src={insert} className="RightHeaderImage" id="rightHeaderImage" onClick={this.selectImage("secondHeader")}/>
                <div className="Badge RightBadge" id="badge2">
                    Banner Text Color
                </div>
            </div>
            <input hidden className="photo_upload" type="file" name="user[firstHeader]" id="firstHeader" onChange={this.handleChange()}/>
            <input hidden className="photo_upload" type="file" name="user[secondHeader]" id="secondHeader" onChange={this.handleChange()}/>
            <input hidden className="photo_upload" type="file" name="user[avatar]" id="avatarUpload" onChange={this.handleChange()}/>
        </div>
        );
    }
}
export default UserHeader;
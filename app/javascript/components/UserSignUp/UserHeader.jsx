import React from 'react'
import Croppie from 'croppie'
import insert from  '../../../assets/images/insert.png'
import  avatar from '../../../assets/images/default-avatar.jpg'
import ImageCrop from "./ImageCrop";
class UserHeader extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            leftHeader: insert,
            avatar: avatar,
            rightHeader: insert
        }
        this.setLeftHeader = this.setLeftHeader.bind(this);
        this.setAvatar = this.setAvatar.bind(this);
        this.setRightHeader = this.setRightHeader.bind(this);
    }

    selectImage = (type) => {
        document.getElementById(type).click();
    }

    setLeftHeader(event) {
        <ImageCrop/>;
            /*
        this.setState({
            leftHeader: URL.createObjectURL(event.target.files[0])
        });
        let leftHeaderPic = document.getElementById("leftHeaderImage");
        leftHeaderPic.Croppie( {
            viewport: {
                width: $('#main').width / 2,
                height: $('.Images').height,
                type: 'square'
            },
            boundary: {
                width: $('#main').width / 2,
                height: $('.Images').height
            },
            showZoomer: false
        });*/
    }
    setAvatar(event) {
        this.setState({
            avatar: URL.createObjectURL(event.target.files[0])
        })
    }
    setRightHeader(event) {
        this.setState({
            rightHeader: URL.createObjectURL(event.target.files[0])
        })
    }

    render() {
        return(
        <div className="Header" id="header">
            <div className="LeftHeader" id="leftHeader">
                <img src={this.state.leftHeader} className="LeftHeaderImage" id="leftHeaderImage" onClick={() => { this.selectImage("leftHeaderInput") }} />
                <div className="Badge LeftBadge" id="badge1">
                    Banner Color
                </div>
            </div>
            <div className="Avatar" id="avatar">
                <img src={this.state.avatar} style={{width: 100, height: 100}} id="avatarImage" onClick={() => {this.selectImage("avatarInput")}}/>
            </div>
            <div className="RightHeader" id="rightHeader">
                <img src={this.state.rightHeader} className="RightHeaderImage" id="rightHeaderImage" onClick={() => {this.selectImage("rightHeaderInput")}}/>
                <div className="Badge RightBadge" id="badge2">
                    Banner Text Color
                </div>
            </div>
            <input hidden className="photo_upload" type="file" name="user[firstHeader]" id="leftHeaderInput" onChange={this.setLeftHeader}/>
            <input hidden className="photo_upload" type="file" name="user[secondHeader]" id="rightHeaderInput" onChange={this.setRightHeader}/>
            <input hidden className="photo_upload" type="file" name="user[avatar]" id="avatarInput" onChange={this.setAvatar}/>
        </div>
        );
    }
}
export default UserHeader;
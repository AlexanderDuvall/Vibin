import React from 'react'
import {Croppie} from 'croppie'
import insert from  '../../../assets/images/insert.png'
import  avatar from '../../../assets/images/default-avatar.jpg'
class UserHeader extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            leftHeader: insert,
            avatar: avatar,
            rightHeader: insert
        }
        this.handleChange = this.handleChange.bind(this)
    }

    selectImage = (type) => {

        document.getElementById(type).click();
    }

    handleChange(event, type) {
        this.setState({
            type: URL.createObjectURL(event.target.files[0])
        })
    }

    render() {
        return(
        <div className="Header" id="header">
            <div className="LeftHeader" id="leftHeader">
                <img src={this.state.file} className="LeftHeaderImage" id="leftHeaderImage" onClick={() => { this.selectImage("leftHeaderInput") }} />
                <div className="Badge LeftBadge" id="badge1">
                    Banner Color
                </div>
            </div>
            <div className="Avatar" id="avatar">
                <img src={this.state.file} style={{width: 100, height: 100}} id="avatarImage" onClick={() => {this.selectImage("avatarInput")}}/>
            </div>
            <div className="RightHeader" id="rightHeader">
                <img src={insert} className="RightHeaderImage" id="rightHeaderImage" onClick={() => {this.selectImage("rightHeaderInput")}}/>
                <div className="Badge RightBadge" id="badge2">
                    Banner Text Color
                </div>
            </div>
            <input hidden className="photo_upload" type="file" name="user[firstHeader]" id="leftHeaderInput" onChange={this.handleChange(this, "leftHeaderImage")}/>
            <input hidden className="photo_upload" type="file" name="user[secondHeader]" id="rightHeaderInput" onChange={this.handleChange(this,"rightHeaderImage")}/>
            <input hidden className="photo_upload" type="file" name="user[avatar]" id="avatarInput" onChange={this.handleChange(this,"avatarImage")}/>
        </div>
        );
    }
}
export default UserHeader;
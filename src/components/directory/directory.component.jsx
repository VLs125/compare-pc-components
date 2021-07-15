import React from "react";
import MenuItem from "../menu-item/menu-item.component";
import './directory.style.scss'
import SECTIONS from "./directory.data";
class Directory extends React.Component{
    constructor() {
        super();
        this.state={
            sections :SECTIONS,
        }
    }
    render(){
    return(
        <div className="directory-menu">{this.state.sections.map(({id,...sectionProps})=>{
          return <MenuItem key={id} {...sectionProps}/>
        })}</div>
    )
    }
}
export default Directory;
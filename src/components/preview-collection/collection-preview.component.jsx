import React from 'react';

import './collection-preview.style.scss';
import CollectionItem from "../collection-item/collection-item.component";

const PreviewCollection = ({title,items})=>{
    return(
        <div className='collection-preview'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <div className='preview'>
                {items.filter((item,idx)=>idx<4)
                    .map(({id, ...item})=>{
                    return <CollectionItem key={id} {...item}/>
                })}
            </div>
        </div>
    )
}

export default PreviewCollection;

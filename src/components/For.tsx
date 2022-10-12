import React, {FC} from 'react';

interface Props{
    items:any[];
    className?:string;
}

const For:FC<Props> = ({items,className}) => {

    return (
        <div className={className}>
            {items.map((c:any, idx:number)=>{
                return <div key={idx}>{c}</div>
            })}
        </div>
    );
};

export default For;
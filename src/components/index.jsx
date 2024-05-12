
import { useState } from "react";
import data from "./accordian/data";
import './styles.css'

export default function Accordian() {
    const[selected , setselected] = useState(null);
    const[enableMultiselect , setenableMultiSelect] = useState(false);
    const[multiple , setmultiple] = useState([]);

    function handleSingleSelection(getCurrentId){
        setselected(getCurrentId === selected ? null : getCurrentId);
    }

    function handleMultiSelect(getCurrentId){
        let cpymultiple = [...multiple];
        const findidxofCurrent = cpymultiple.indexOf(getCurrentId);
        if(findidxofCurrent === -1) cpymultiple.push(getCurrentId)
            else cpymultiple.splice(findidxofCurrent , 1);

        setmultiple(cpymultiple);
    }

    return <div className="wrapper">
        <button onClick={() => setenableMultiSelect(!enableMultiselect)
            }>Enable Multi-selection</button>
        <div className="accordian">
            {
                data && data.length > 0 ? 
                data.map((dataItem) => <div className="item">
                    <div onClick={ enableMultiselect ? () => handleMultiSelect(dataItem.id) : () => handleSingleSelection(dataItem.id)} className="title">
                        <h3>{dataItem.question}</h3>
                        <span>+</span>
                    </div>
                    <div className="content">
                        {
                            // (selected === dataItem.id || 
                            //     multiple.findIndex(dataItem.id) !== -1) ? 
                            // <div className="contentfull">
                            //     {dataItem.answer}
                            // </div>
                            // : null

                            enableMultiselect? 
                            multiple.indexOf(dataItem.id) !== -1 ? 
                            <div className="contentfull">
                                {dataItem.answer}
                            </div> : null
                            : selected === dataItem.id ?
                            <div className="contentfull">
                                {dataItem.answer}
                            </div> : null
                        }
                    </div>
                    </div>
                )
                : <div>No data Found</div>
            }
        </div>
    </div>
}
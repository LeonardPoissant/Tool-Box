import React, { useContext, useEffect, useState} from "react"
import { useHistory } from "react-router-dom";

import styled, {css} from "styled-components";
import ClearIcon from '@material-ui/icons/Clear';
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';


import { HaikuContext } from "../HaikuContext/HaikuDataBaseContext";


const ManageDb = () =>{
let history = useHistory();
const { urlTitle } = useContext(HaikuContext);

const [dataBaseName, setDataBaseName] = useState("");
const [array, setArray] = useState([]);
const [deletedArray, setDeletedArray] = useState([]);
const [isClicked, setIsClicked] = useState({});
const [isDeleted, setIsDeleted] = useState(false)
const [myDb, setMyDb] = useState({})

//`https://toolzbox.herokuapp.com


console.log(urlTitle)

useEffect(()=>{

        fetch(`https://toolzbox.herokuapp.com/dbInfo/${urlTitle}`)
        .then((res) => res.json())
        .then((data) => {
        console.log(data.dataBaseArray)
        setDataBaseName(data.dataBaseName)
        setArray(data.haikuArray)
        setMyDb(data)
        });
        console.log(isDeleted)
},[]);


const handleDelete =(verse, index)=>{
    setIsClicked(prevState => ({
        ...prevState,
        [index]: !prevState[index]
    }));
    setDeletedArray([...deletedArray, verse])
};

const handleUndo = (verse, index)=>{    
    setIsClicked(prevState => ({
        ...prevState,
        [index]: !prevState[index]
    }));

    const deletedVerseIndex = deletedArray.indexOf(verse);
    if (deletedVerseIndex !== -1) deletedArray.splice(deletedVerseIndex, 1);
    setDeletedArray(deletedArray);
};



const submitDelete =()=>{
    if(deletedArray.length >0){
    fetch("https://toolzbox.herokuapp.com/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          urlTitle,
          deletedArray,
        }),
      })
        .then((res) => res.json())
        .then((db) => {
        console.log(db)
        setIsClicked({})
        setIsDeleted(!isDeleted)
        })
        .then(()=>{
            if(!isDeleted){
                console.log(urlTitle)
            history.push(`/HaikuGenerator/${urlTitle}`);} else{console.log('not ready')}
        })
        .catch((err) => {
        console.log(err.data);
        })
    } else{
        console.log("nothing to delete")
    }
    
};



return(
    <>
  
    <Title>{dataBaseName}</Title>
    

    <ButtonWrapper>
    <SubmitDeletion onClick={(e)=>submitDelete()}>CONFIRM</SubmitDeletion>
</ButtonWrapper>
<Ul>

{array.map((verse, index)=>{
    return(
        <VerseWrapper key={index}>
            <Verse >
            {verse}
            </Verse>
        {!isClicked[index]? 
            (<DeleteUndoButton onClick={(e) => handleDelete(verse, index, e)}>
                <ClearIcon id={index} fontSize={"small"}/>
            </DeleteUndoButton>) 
            : 
            <DeleteUndoButton onClick={(e) => handleUndo(verse, index, e)}>
                <UndoRoundedIcon fontSize={"small"}/>
            </DeleteUndoButton>}
        </VerseWrapper>
    )
})}
</Ul>

</>
)
}

const Wrapper = styled.div`
display:flex;
align-items:center;
justify-content:center; 
`;

const Title = styled.h1`
text-align:center;
`;

const Ul = styled.ul`
display:flex;
list-style-type:none;
flex-direction:column;
justify-content:center;
align-items:center;

`;

const VerseWrapper = styled.div`
display:flex;
max-height:20px;
max-width:400px;
padding:6px;

`;

const Verse = styled.li`

`;
const DeleteUndoButton = styled.button`

outline:none;
border-style:none;
background-color:white;
:hover{
    cursor:pointer;
}
`;

const ScrollToBottom = styled.button`
position:fixed;

`;

const ButtonWrapper = styled.div`

`;



const SubmitDeletion = styled.button`
position:fixed;
@media screen and (min-width: 812px) {
    margin-left:200px;
    margin-top:300px;
  }

`;



export default ManageDb
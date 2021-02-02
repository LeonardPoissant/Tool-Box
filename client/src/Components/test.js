import React, { useState} from "react"




const Test =()=>{
    const [generatedHaiku, setGeneratedHaiku] = useState([]);


    fetch(`/sophie/randomHaiku}`)
    .then((res) => res.json())
    .then((randomHaiku) => {
      setGeneratedHaiku(randomHaiku.dataBaseArray);
   
    });

    return (<div>

        {  generatedHaiku.map((verse, index) => {
              return (
                <div
                  key={index}
                  style={{
                    animationDuration:
                      index === 1 ? "3s" : index === 2 ? "4s" : "2s",
                  }}
                >
                  {verse}
                </div>
              );
            })}
        
    </div>)
};

export default Test
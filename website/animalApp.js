/*CHAINED PROMISES TO GET AND POST DATA*/
document.getElementById('generate').addEventListener('click', performAction);

function performAction(){
//select the actual value of an HTML input to include in POST  
  const fav =  document.getElementById('fav').value;
  const animal = document.getElementById('animal').value;


//Faking an API call
getAnimal('/fakeAnimalData')
//New Syntax
.then(function(data){
    //Add data
    console.log(data)    
    postData('/addAnimal',{animal:animal, fact:data.fact, fav:fav})

//we can do this because of Async!
updateUI()
})
}

/*POST EXAMPLE*/
const postData = async (url = '', data={})=>{
    console.log(data)
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },   
    body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData
    }catch(error) {
    console.log("error",error);
    //appropriately handle the error
    }
}

const getAnimal = async(url)=>{
    const res = await fetch(url)
    try{

        const data = await res.json();
        console.log(data)
        return data;
    } catch(error){
        console.log('error',error);
        //appropriately handle the error
    }
}

/*UPDATE UI DEMO*/
const updateUI = async () => {
    const request = await fetch('/all')
    try{
        const allData = await request.json()
        console.log(allData);
    document.getElementById('animalName').innerHTML = allData[0].animal;
    document.getElementById('animalFact').innerHTML = allData[0].fact;
    document.getElementById('animalFav').innerHTML = allData[0].fav;
    }catch(error){
        console.log("error",error)
    }
}
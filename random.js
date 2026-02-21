const { useState, useEffect } = React;
function Person({person}){
    const [info ,setInfo]=useState("");

    function getInfo(){
        if (info=="name"){
            return person.name;
        }
        if (info=="email"){
            return person.email;
        }
        if (info=="address"){
            return person.address.street+person.address.suite+person.address.city+person.address.zipcode;
        }
        if (info=="phone"){
            return person.phone;
        }
        if (info=="company"){
            return person.company.name;
        }
    }

    return(
        <>
        
        
        <h1><i className="fa-solid fa-user" 
         onMouseEnter={()=>setInfo("name")}
        ></i> {person.name}</h1>

        <h3><i className="fa-solid fa-envelope"
        onMouseEnter={()=>setInfo("email")}
        ></i> {person.email}</h3>
        
        <h3><i className="fa-solid fa-location-dot"
        onMouseEnter={()=>setInfo("address")}
        ></i> {person.address.street}, {person.address.suite}, {person.address.city}, {person.address.zipcode} 
        </h3>

        <h3><i className="fa-solid fa-phone"
        onMouseEnter={()=>setInfo("phone")}
        ></i> {person.phone}</h3>

        <h3><i className="fa-solid fa-building"
        onMouseEnter={()=>setInfo("company")}
        ></i> {person.company.name} </h3>

        <h4>{getInfo()}</h4>
        </>
    );
}



function RandomData(){

    const [person, setPerson]=useState(null);
    const [loading, setLoading]=useState(false);
    
    const FetchPerson=async function random(){
        try{
            setLoading(true);
            const randomId = Math.floor(Math.random() * 10) + 1; // 1 to 10

    
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${randomId}`);
            
            const data = await response.json();
            console.log("Full API Data:", data); 
            setPerson(data);
        }catch(error){
            console.log("Error: ",error);
        }finally{
            setLoading(false);
        }
        }
        useEffect(()=>{
            FetchPerson();
    },[]);

    return(
        <div id='container'>

      
        {loading && <div className="spinner"></div>}

    {!loading && person && <Person person={person} />}

    <button onClick={FetchPerson}>
      {loading ? "Loading..." : "Get Random Person"}
    </button>
 </div>
        
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<RandomData/>);
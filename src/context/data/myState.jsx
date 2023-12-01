import React, { useEffect, useState } from "react";
import myContext from "./myContext";
import { fireDB } from "../../components/firebase/FirebaseConfig";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query  } from "firebase/firestore";
import toast from "react-hot-toast";

function MyState(props){
const [mode, setMode] = useState('light');

const toggleMode = () => {
    if(mode === 'light'){
        setMode('dark');
        document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    }
    else{
        setMode('light');
        document.body.style.backgroundColor = 'white';
    }
}

const [searchkey, setSearchkey] = useState('')
const [loading, setloading] = useState(false);
const [getAllBlog, setGetAllBlog] = useState([]);

const deleteBlogs = async (id) => {{
    try{
await deleteDoc(doc(fireDB, "blogPost", id));
getAllBlogs();
toast.success("Blog deleted successfully")
    }catch(error){
console.log(error)
    }
}}

function getAllBlogs() {
    setloading(true);
    try {
        const q = query(
            collection(fireDB, "blogPost"),
            orderBy('time')
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
            let blogArray = [];
            QuerySnapshot.forEach((doc) => {
                blogArray.push({ ...doc.data(), id: doc.id });
            });

            setGetAllBlog(blogArray)
            console.log(blogArray)
            setloading(false)
        });
        return () => data;
    } catch (error) {
        console.log(error)
        setloading(false)
    }
}

useEffect(() => {
    getAllBlogs();
}, []);

    return(
        <myContext.Provider value={{mode, toggleMode, searchkey, setSearchkey, loading, setloading, getAllBlog, getAllBlogs, deleteBlogs}}>
            {props.children}
        </myContext.Provider>
    )
}

export default MyState
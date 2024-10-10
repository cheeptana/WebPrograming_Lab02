import { useState, useEffect } from "react";

export default function HerbLists(){
    const [loadStatus, setLoadStatus] = useState(true);
    const [petsData, setPetsData] = useState([]);

    useEffect(()=>{
        try {
            const fetchData = async () => {
                const pets = await fetch(
                    'http://localhost:3004/api/getPet'
                );
                if(pets.ok){
                    const petsJson = await pets.json();
                    setPetsData(petsJson);
                }else{
                    alert('[ERR] Unable to read data.');
                }
            }
            fetchData().catch(console.error);
            setLoadStatus(false);
            console.log('Fetch pets data.');
        } catch (error) {
            alert('[ERR] An error occurs when reading the data.');
        }
    }, [loadStatus]);

    const handleDelete = (petId) => {
        try {
            const fetchData = async() => {
                const petData = await fetch(
                    `http://localhost:3004/api/deletePet/${petId}`,
                    { 
                        method: 'DELETE'
                    }
                );
                if(petData.ok){
                    const myJson = await petData.json();
                    alert(myJson.message);
                }else{
                    alert('[ERR] An error when deleting data.');
                }
            } 
            fetchData();
            setLoadStatus(true);
        } catch (error) {
            alert('[ERR] An error occurs when deleting the data.');
        }
    }
    
    return (
    <div className="m-3">
        <a href='/lab02/petForm'>[ เพิ่มข้อมูลสัตว์เลี้ยง ]</a>
        <h1 className="font-bold">รายการสัตว์เลี้ยง</h1>
        {
            petsData.map((p_item, index) => 
            <div key={index}>
                <div className="font-bold p-2 m-2 border-2 rounded-lg">
                    ชื่อสัตว์เลี้ยง: {p_item.petName}<br/>
                    ประเภท: {p_item.petType}<br/>
                    วันเกิด: {p_item.petBD}<br/>
                    เจ้าของ: {p_item.petOwner}<br/>
                </div>
                <div className="p-2 m-2">
                    <a href={`/lab02/petDetail/${p_item.petId}`}>[ รายละเอียด ]</a>
                    <a href={`/lab02/petEditForm/${p_item.petId}`}>[ แก้ไข ]</a>
                    <a href="#" onClick={(e) => handleDelete(`${p_item.petId}`)}>[ ลบ ]</a>
                </div>
            </div>
            )
        }
    </div>
    );
}
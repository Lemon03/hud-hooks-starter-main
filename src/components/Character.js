import React, {useState} from 'react';
import './Character.css';

const Character = (props) => {
    const [name, setName] = useState(props.name);
    const [location, setLocation] = useState(props.location || '');
    const [comment, setComment] = useState(props.comment || '');
    const [health, setHealth] = useState(parseInt(props.health, 10));
    const [stamina, setStamina] = useState(parseInt(props.stamina, 10));
    const [gold, setGold] = useState(parseInt(props.gold, 10));
    const [showLocationInput, setShowLocationInput] = useState(false);

    const updateData = async (updatedFields) => {
        const response = await fetch(`http://localhost:3002/char/${props.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFields),
        });

        if (response.ok) {
            setName(updatedFields.name || name);
            setHealth(parseInt(updatedFields.health, 10) || health);
            setStamina(parseInt(updatedFields.stamina, 10) || stamina);
            setGold(parseInt(updatedFields.gold, 10) || gold);
            setLocation(updatedFields.location || location);
            setComment(updatedFields.comment || comment)
        }
    };

    const handleLocationChange = (e) => {
        const newLocation = e.target.value;
    
        setTimeout(() => {
          const newGold = gold - 1;
          updateData({ location: newLocation, gold: newGold.toString() });
        }, 3000);
    };
      

    return (
        <div>
            <h2>{name}'s Bio:</h2>
            <p>Race: {props.race}</p>
            <p>Status: <br />
                Health at {health} <br />
                Stamina at {stamina}
            </p>
            <p>Gold: {gold}</p>
            <p>Locaion: {location}</p>
            <p className={comment}>Comment: {comment}</p>

            <button onClick={() => {
                const newHealth = health + 10;
                const newGold = gold - 2;
                setHealth(newHealth);
                setGold(newGold);
                updateData({ health: newHealth.toString(), gold: newGold.toString() });
            }}>
                Add 10 Health (costs 2 Gold)
            </button><br />

            <button onClick={() => {
                const newStamina = stamina + 5;
                const newGold = gold - 1;
                setStamina(newStamina);
                setGold(newGold);
                updateData({ stamina: newStamina.toString(), gold: newGold.toString() });
            }}>
                Add 5 Stamina (costs 1 Gold)
            </button><br />

            <button onClick={() => {
                const newHealth = health - 10;
                const newStamina = stamina - 5;
                const newGold = gold + 3;
                setHealth(newHealth);
                setStamina(newStamina);
                setGold(newGold);
                updateData({ health: newHealth.toString(), stamina: newStamina.toString(), gold: newGold.toString() });
            }}>
                Add 3 Gold (costs 10 Health and 5 Stamina)
            </button><br />


            <label htmlFor='nameChange'>Change Player's Name:</label><br />
            <input
                type="text"
                id="nameChange"
                onChange={e => updateData({ name: e.target.value })}
            /><br />


            <button onClick={() => setShowLocationInput(!showLocationInput)}>
                    Change Location (costs 1 Gold)
                </button><br />

                {showLocationInput && (
                    <div>
                    <label htmlFor="locationChange">New Location:</label><br />
                    <input
                        type="text"
                        id="locationChange"
                        onChange={handleLocationChange}
                    /><br />
                    </div>
                )}



            <label htmlFor='commentChange'>Change Player's Comment:</label><br />
            <input
                type="text"
                id="commentChange"
                onChange={e => updateData({ comment: e.target.value })}
            /><br />

        </div>
    )


}

export default Character;
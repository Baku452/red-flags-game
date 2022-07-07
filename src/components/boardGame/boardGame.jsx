import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import CardGame from '../cardGame/cardGame';

const BoardGame = () => {
    const [cards, setCards] = useState();
    const [filteredCards, setFilteredCards] = useState({});
    const [deck, setDeck] = useState([]);

    const CARD_TYPE = {
        WHITE: {
            name: "white",
            number: 2
        },
        RED: {
            name: "red",
            number: 1
        }
    }

    function createDeck (pileCards, setPileCards) {
        const splicePileCards = pileCards;
        let deckPlayer = []; 
        for(const typeCard in CARD_TYPE){
            deckPlayer = [...deckPlayer, ...splicePileCards[typeCard].splice(0, CARD_TYPE[typeCard].number)]
        }
        setPileCards(splicePileCards)
        setDeck(deckPlayer)
    }

    function filterCardsByType ( typeCard ) {
        const filteredDeck = cards.filter( card => card.type === typeCard);
        filteredDeck.sort(() => 0.5 - Math.random());
        return filteredDeck;
    }

    function getRandomCarts(){

        // Filter Cards
        let filteredCardsObj = {}
        for(const typeCard in CARD_TYPE){
            filteredCardsObj[typeCard] = filterCardsByType(CARD_TYPE[typeCard].name);
        }
        setFilteredCards(filteredCardsObj)

        //Create a Deck
        createDeck(filteredCardsObj, setFilteredCards )
    }

    useEffect(() => {
      const fetchData = async () => {
        const resData = await fetch("/data/cards.json")
        const dataCards = await resData.json();
        setCards(dataCards)
      }

      fetchData();

    }, [])
    
    return ( 
        <Box
            sx={{
                width: 1200,
                height: 500,
                color: 'white',
                backgroundColor: 'secondary.dark',
                margin: 'auto',
                borderRadius: 5,
                py: 5,
                px: 10,
                transform: `translateY(30%)` 
            }}
        >
            <h1>Red Flags Game</h1>
            <button onClick={getRandomCarts}>Retrieve Carts to Play</button>
            <div style={{ display: 'flex', justifyContent: 'space-around'}}>
                {
                deck.map( (card, index) => (
                    <CardGame key={index} card={card} />  
                    ))
                }
            </div>
        </Box> 
    );
}
 
export default BoardGame;
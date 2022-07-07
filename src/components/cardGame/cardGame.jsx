import { Card } from '@mui/material';

const CardGame = ({card}) => {
    return ( 
        <Card     
            sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 2,
                p: 2,
                width: 200,
                minHeight: 300
          }}>
            <p style={{ color: 'black'}}>{card.text}</p>
        </Card> 
    );
}
 
export default CardGame;
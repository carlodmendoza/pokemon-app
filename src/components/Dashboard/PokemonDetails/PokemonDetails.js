import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Typography, Divider, Avatar, Chip } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_POKEMON_ALL_INFO } from '../../../graphql/getPokemons';
import PokemonEvolution from './PokemonEvolution';

const styles = {
    mainContainer: {
        m: 0, 
        p: 0
    },
    header: {
        mt: '20px', 
        height: '50px', 
        display: 'flex', 
        justifyContent: 'space-between'
    },
    name: {
        color: 'text.main'
    },
    number: {
        color: 'primary.main'
    }
}

function PokemonDetails(props) {
    const [pokemonID, setPokemonID] = useState("");
    const { data } = useQuery( GET_POKEMON_ALL_INFO, {
        variables: { id: pokemonID}
    });
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        if (data) {
            setPokemon(data.pokemon);
        }
        // eslint-disable-next-line 
    }, [data])

    useEffect(() => {
        if (props.id !== "") {
            setPokemonID(props.id);
        }
    }, [props.id])

    return ( 
        <Container sx={styles.mainContainer}>
            { Object.keys(pokemon).length !== 0 &&
            <>
                <Container sx={styles.header}>
                    <Typography sx={styles.name} variant="h4">{pokemon.name}</Typography>
                    <Typography sx={styles.number} variant="h4">#{pokemon.number}</Typography>
                </Container>
                <Divider />
                <Container sx={{height: '500px'}}>
                    <Container sx={{height: '250px', display: 'flex', alignItems: 'center'}}>
                        <Avatar sx={{ width: '200px', height: '200px' }} src={pokemon.image} variant="rounded"/>
                        <Container sx={{ height: '200px'}}>
                            <Container sx={{padding: '0px !important', display: 'flex', justifyContent: 'space-between'}}>
                                <Typography sx={{textAlign: 'left', color: 'text.main'}} variant="subtitle1"><b>Type/s:</b> </Typography>
                                <Container sx={{display: 'flex'}}>
                                    { pokemon.types?.map((type, index) => <Chip sx={{color: 'white', bgcolor: 'background.main'}} key={`type-${index}`} label={type} size="small"/>)}
                                </Container>
                            </Container>
                            <Typography sx={{textAlign: 'left', color: 'text.main'}} variant="subtitle1"><b>Classification:</b> {pokemon.classification}</Typography>
                            <Typography sx={{textAlign: 'left', color: 'text.main'}} variant="subtitle1"><b>Weight:</b> {pokemon.weight?.minimum} – {pokemon.weight?.maximum}</Typography>
                            <Typography sx={{textAlign: 'left', color: 'text.main'}} variant="subtitle1"><b>Height:</b> {pokemon.height?.minimum} – {pokemon.height?.maximum}</Typography>
                            <Container sx={{padding: '0px !important', display: 'flex'}}>
                                <Typography sx={{textAlign: 'left', color: 'text.main', lineHeight: '1.25'}} variant="subtitle1"><b>Strong Against:</b> </Typography>
                                <Container sx={{display: 'flex', alignItems: 'center'}}>
                                    { pokemon.resistant?.map((type, index) => <Chip sx={{color: 'white', bgcolor: 'background.main'}} key={`strong-${index}`} label={type} size="small" />)}
                                </Container>
                            </Container>
                            <Container sx={{padding: '0px !important', display: 'flex'}}>
                                <Typography sx={{textAlign: 'left', color: 'text.main', lineHeight: '1.25', mt: '5px'}} variant="subtitle1"><b>Weak Against:</b> </Typography>
                                <Container sx={{display: 'flex', alignItems: 'center'}}>
                                    { pokemon.weaknesses?.map((type, index) => <Chip sx={{color: 'white', bgcolor: 'background.main'}} key={`weak-${index}`} label={type} size="small" />)}
                                </Container>
                            </Container>
                        </Container>
                    </Container>
                    <Container sx={{padding: '0px !important', height: '250px', display: 'flex', alignItems: 'center'}}>
                        <Container sx={{height: '250px'}}>
                            <Typography sx={{color: 'text.main'}} variant="subtitle1"><b>Moves</b></Typography>
                            <Divider />
                            <Typography sx={{color: 'text.main', mt: '10px'}} variant="subtitle2"><b>Fast Attacks</b></Typography>
                            { pokemon.attacks?.fast?.map((atk, index) => <Typography sx={{color: 'text.main'}} variant="body2" key={`fast-${index}`}>{`${atk.name} (${atk.type})`}</Typography>)}
                            <Typography sx={{color: 'text.main', mt: '10px'}} variant="subtitle2"><b>Special Attacks</b></Typography>
                            { pokemon.attacks?.special?.map((atk, index) => <Typography sx={{color: 'text.main'}} variant="body2" key={`special-${index}`}>{`${atk.name} (${atk.type})`}</Typography>)}
                        </Container>
                        <Container sx={{height: '250px'}}>
                            <Typography sx={{color: 'text.main'}} variant="subtitle1"><b>Evolution</b></Typography>
                            <Divider />
                            { pokemon.evolutions?.map(pokemon => <PokemonEvolution key={`evolution-${pokemon.id}`} id={pokemon.id} getClickedPokemon={(id) => setPokemonID(id)}/>) }
                        </Container>    
                    </Container>
                </Container>
            </>
            }
        </Container>
    )
}

PokemonDetails.propTypes = {
    id: PropTypes.string,
}

export default PokemonDetails;
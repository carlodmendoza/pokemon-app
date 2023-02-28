import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../../../graphql/getPokemons';
import PokemonListItem from './PokemonListItem';

const styles = {
    stack: {
        mt: '20px', 
        height: '500px', 
        overflow:'auto',
        alignItems: 'center'
    }
}

function PokemonList(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const { data } = useQuery( GET_POKEMONS, {
        variables: { first: currentPage*10}
    });
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        if (data) {
            const lowerIndex = (currentPage*10) - 10;
            const higherIndex = (currentPage*10);
            const pokemonData = data.pokemons.slice(lowerIndex, higherIndex);
            setPokemons(pokemonData);
        }
        // eslint-disable-next-line 
    }, [data])

    useEffect(() => {
        setCurrentPage(props.currentPage);
    }, [props.currentPage])

    return ( 
        <Stack sx={styles.stack} spacing={2}>
            {pokemons.map(pokemon => <PokemonListItem key={pokemon.id} id={pokemon.id} number={pokemon.number} name={pokemon.name} image={pokemon.image} getClickedPokemon={(id) => props.getClickedPokemon(id)}/>)}
        </Stack>
    )
}

PokemonList.propTypes = {
    currentPage: PropTypes.number,
    getClickedPokemon: PropTypes.func
}

export default PokemonList;
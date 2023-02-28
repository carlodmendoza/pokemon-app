import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
    query pokemons($first: Int!) {
        pokemons(first: $first) {
            id
            number
            name
            image
        }
    }
`

export const GET_POKEMON_BASIC_INFO = gql`
    query pokemon($id: String!) {
        pokemon(id: $id) {
            id
            name
            image
        }
    }
`

export const GET_POKEMON_ALL_INFO = gql`
    query pokemon($id: String!) {
        pokemon(id: $id) {
            id
            name
            number
            types
            classification
            weight {
                minimum
                maximum
            }
            height {
                minimum
                maximum
            }
            resistant
            weaknesses
            attacks {
                fast {
                    name
                    type
                    damage
                }
                special {
                    name
                    type
                    damage
                }
            }
            evolutions {
                id
            }
            image
        }
    }
`
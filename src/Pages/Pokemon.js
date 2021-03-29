import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetPokemon } from '../actions/pokemonActions'
import _ from 'lodash'

const Pokemon = (props) => {
    const pokemonName = props.match.params.pokemon
    const dispatch = useDispatch()
    const pokemonState = useSelector(state => state.Pokemon)
    React.useEffect(() => {
        dispatch(GetPokemon(pokemonName))
    }, [])

    const ShowData = () => {
        if(!_.isEmpty(pokemonState.data[pokemonName])) {
            const pokeData = pokemonState.data[pokemonName]
            return(
                <section className='glass'>
                    <h2 className='name'>{pokeData.name}</h2>
                    <div className='pictures'>
                        <div className='row'>
                            <img src={pokeData.sprites.front_default} alt="imgFront"/>
                            <img src={pokeData.sprites.back_default} alt="imgShinyF"/>                   
                        </div>
                        <div className='row'>
                            <img src={pokeData.sprites.front_shiny} alt="imgBack"/>
                            <img src={pokeData.sprites.back_shiny} alt="imgShinyB"/>
                        </div>
                    </div>
                </section>
            )
        }

        if(pokemonState.loading) {
            return(
                <div className='message'>
                    <p>Loading...</p>
                </div>
            ) 
        }

        if(pokemonState.errorMsg !== "") {
            return(
                <div className='message'>
                    <p>{pokemonState.errorMsg}</p>
                </div>
            ) 
        }

        return(
            <div className='message'>
                <p>error getting pokemon</p>
            </div>
        ) 
    }

    return (
        <div className='info'>
            <h1>{pokemonName}</h1>
            {ShowData()}
        </div>
    )
}

export default Pokemon
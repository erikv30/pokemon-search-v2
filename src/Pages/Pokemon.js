import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetPokemon } from '../actions/pokemonActions'
import _ from 'lodash'

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
  };

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
                    <div className='header-poke'>
                    <h2 className='name'>{pokeData.name}</h2>
                    <span className='number'>N.° {pokeData.id}</span>
                    </div>
                    <div className="type">
                        {pokeData.types.map(type => (
                            <span key={type.type.name} style={{backgroundColor: `#${TYPE_COLORS[type.type.name]}`, color: '#ffffff', padding: '10px 15px', borderRadius: '20px'}}>{type.type.name}</span>
                        ))}
                    </div>
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
                    <div className='description'>
                        <div id='left' className='item'>
                            <h1>Stats</h1>
                            {pokeData.stats.map(el => {
                                return(
                                    <div key={el.stat.name} className='col-1'>
                                    <p>{el.stat.name}:</p>
                                    <span>{el.base_stat}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='item'>
                            <h1>Abilities</h1>
                            {pokeData.abilities.map(el => {
                                return(
                                    <div key={el.ability.name} className='col-2'>
                                    <p>{el.ability.name}</p>
                                    </div>
                                )
                            })}
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
            {ShowData()}
        </div>
    )
}

export default Pokemon
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import {GetPokemonList} from '../actions/pokemonActions'
import { Link } from 'react-router-dom'

const PokemonList = () => {
    const dispatch = useDispatch()
    const pokemonList = useSelector(state => state.PokemonList)
    React.useEffect(() => {
        FetchData(1)
    }, [])

    const FetchData = (page = 1) => {
        dispatch(GetPokemonList(page))
    }

    const ShowData = () => {
        if(!_.isEmpty(pokemonList.data)) {
            return(
                <section className='cards'>
                    {pokemonList.data.map(el => {
                return(
                    <div className='card'>
                        <Link to={`/pokemon/${el.name}`}>
                            <h1>{el.name}</h1>
                        </Link>
                    </div>
                )
            })}
                </section>
            ) 
        }

        if(pokemonList.loading) {
            return <p>Loading...</p>
        }

        if(pokemonList.errorMsg !== "") {
            return <p>{pokemonList.errorMsg}</p>
        }

        return <p>unable to get data</p>
    }

    return (
        <div>
            {ShowData()}
        </div>
    )
}

export default PokemonList
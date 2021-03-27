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
            return(
                <section className='glass'>
                    <h2 className='name'>pokemon name</h2>
                    <div className='pictures'>
                        <div className='row'>
                            <img src='' alt="imgFront"/>
                            <img src='' alt="imgShinyF"/>                   
                        </div>
                        <div className='row'>
                            <img src='' alt="imgBack"/>
                            <img src='' alt="imgShinyB"/>
                        </div>
                    </div>
                </section>
            )
        }

        if(pokemonState.loading) {
            return <p>Loading...</p>
        }

        if(pokemonState.errorMsg !== "") {
            return <p>{pokemonState.errorMsg}</p>
        }

        return <p>error getting pokemon</p>
    }

    return (
        <div className='info'>
            <h1>{pokemonName}</h1>
            {ShowData()}
        </div>
    )
}

export default Pokemon
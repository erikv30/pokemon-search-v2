import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import {GetPokemonList} from '../actions/pokemonActions'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

const PokemonList = (props) => {
    const [search, setSearch] = useState('')

    const dispatch = useDispatch()
    const pokemonList = useSelector(state => state.PokemonList)
    React.useEffect(() => {
        FetchData(1)
    }, [])

    const FetchData = (page = 1) => {
        dispatch(GetPokemonList(page))
    }

     const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            props.history.push(`/pokemon/${search}`)
        }
      }

    const ShowData = () => {
        if(pokemonList.loading) {
            return(
                <div className='message'>
                    <p>Loading...</p>
                </div>
            ) 
        }
        
        if(!_.isEmpty(pokemonList.data)) {
            return(
                <section className='cards'>
                    {pokemonList.data.map(el => {
                return(
                    <div key={el.name} className='card'>
                        <Link to={`/pokemon/${el.name}`}>
                            <h1>{el.name}</h1>
                        </Link>
                    </div>
                )
            })}
                </section>
            ) 
        }

        if(pokemonList.errorMsg !== "") {
            return(
                <div className='message'>
                    <p>{pokemonList.errorMsg}</p>
                </div>
            ) 
        }

        return(
            <div className='message'>
                <p>unable to get data</p>
            </div>
        ) 
    }

    return (
        <div>
            <div className='search-wrap'>
                <input type="text" onChange={e => setSearch(e.target.value)} onKeyPress={e => handleKeyPress(e)} placeholder='Example: cyndaquil or 155' />
                <button onClick={() => props.history.push(`/pokemon/${search}`)}>Search</button>
            </div>
            {ShowData()}
            {!_.isEmpty(pokemonList.data) && (
                <ReactPaginate 
                    pageCount={Math.ceil(pokemonList.count / 20)}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    onPageChange={(data) => FetchData(data.selected + 1)}
                    containerClassName='pagination'
                    pageLinkClassName='pages'
                    previousLinkClassName='prev'
                    nextLinkClassName='next'
                    activeClassName='active-page'
                />
            )}
        </div>
    )
}

export default PokemonList
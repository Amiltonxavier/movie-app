import { ChangeEvent, Dispatch, SetStateAction } from 'react'

type Props = {
    searchTerm: string,
    setSearchTerm: Dispatch<SetStateAction<string>>
}


export function Search({ searchTerm, setSearchTerm }: Props) {


    function handleChange (event:ChangeEvent<HTMLInputElement> ){
           event.preventDefault
            setSearchTerm(event.target.value)
    }

    return (
        <div className='search'>
            <div>
                <img src="search.svg" alt="search icon" />
                <input
                    type="text"
                    name=""
                    placeholder='Search through thousands of movie'
                    id=""
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

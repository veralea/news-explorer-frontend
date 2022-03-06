import { useState } from "react";

function SearchForm(props) {
    const [search, setSearch] = useState('');
    
    function handleSearchChange(e) {
        setSearch(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        props.search(search);
    }
    
    return (
        <>
        <h1 className="search-form__title">What's going on in the world?</h1>
        <p className="search-form__subtitle">Find the latest news on any topic and save them in your personal account.</p>
        <form className="search-form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                className="search-form__input"
                onChange = {handleSearchChange} 
                name="search" 
                value={search}
                placeholder="Enter topic" 
                required
            />
            <button type="submit" name="submit" className="search-form__button">
                Search
            </button>    
        </form>
        </>
    );
}

export default SearchForm;
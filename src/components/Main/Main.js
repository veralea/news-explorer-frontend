import SearchForm from '../SearchForm/SearchForm';

function Main(props) {
    return (
        <main className="main">
            <SearchForm search={props.search}/>
        </main>
    );
}

export default Main;
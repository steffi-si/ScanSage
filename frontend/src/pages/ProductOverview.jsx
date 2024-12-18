import { Link } from 'react-router-dom';
import { useEffect , useState } from 'react';
import Header from '../views/Header.jsx';
import Footer from '../views/Footer.jsx';


function ProductOverview() {
    const [products, setProducts] = useState([]);
    const [loading , setLoading] = useState(true);
    const [ error, setError] = useState(null);

    useEffect(() => {
        //fetch request to get products
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://localhost:3000/api/products');
                if(!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const data = await response.json();
                setProducts(data);
            } catch(error) {
                setError(error.message);  
            } finally {
                setLoading(false);  //set loading to false
            }
            fetchProducts();
        }
    }, []);

    // if(loading) {
    //     return <p>Loading...</p>;
    // }
    // if(error) {
    //     return <p>{error}</p>;
    // }

    return(
        <div className="product-overview">
            <Header />
            <div className="toolbar">
                <button className="scan-button">
                    <div icon="📱" >Scan</div>
                </button>
                <FilterComponent />
            </div>
            <div className="product-container">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <Footer />
        </div>
    )
}


function ProductCard( {product} ) {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.number}</p>
            <p>{product.status}</p>
           <Link to={`/productdetail/}`} className="details-button">ProductDetails</Link>
        </div>
    );
}


function FilterComponent() {
    return(
        <div className="filter-component">
            <label htmlFor="filter">Filter:</label>
            <select id="filter">
                <option value="">All Products</option>
                <option value="category1">Categorie 1</option>
                <option value="category2">Categorie 2</option>
                {/* More filter function... */}
            </select>
        </div>
    )
}

export default ProductOverview;
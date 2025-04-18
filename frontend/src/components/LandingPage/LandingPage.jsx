import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../redux/products"
import ProductCard from "../ProductCard"
import { Link } from "react-router-dom"

function LandingPage() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)

    useEffect(() => {
        dispatch(fetchProducts()).then()
    }, dispatch)

    return (
        <>
            <h1>Landing page</h1>
            {products && products.map(p => {
                return <Link to={`product/${p.id}`}> 
                    < ProductCard key = {p.id} product={p}/>
                </Link>
            })}
        </>
    )
}

export default LandingPage
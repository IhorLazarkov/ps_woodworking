import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../redux/products"
import ProductCard from "../ProductCard"
import { Link } from "react-router-dom"
import "./LandingPage.css"
import FooterCard from "./FooterCard"

function LandingPage() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(fetchProducts()).then(() => setIsLoaded(true))
    }, dispatch)

    return (
        <>
            <h1>Landing page</h1>
            <main id="landing-page">
                {!isLoaded
                    ? <h3>Loading ...</h3>
                    : <>
                        {products && products.map(p => {
                            return <Link to={`product/${p.id}`}>
                                < ProductCard key={p.id} product={p} />
                            </Link>
                        })}
                    </>
                }
            </main>
            <footer id="landing-page">
                <FooterCard />
                <div className="delimeter"></div>
                <FooterCard />
                <div className="delimeter"></div>
                <FooterCard />
            </footer>
        </>
    )
}

export default LandingPage
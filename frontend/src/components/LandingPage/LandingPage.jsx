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
    }, [dispatch])

    return (
        <>
            <div className="landing-title">
                <h1>Welcome to Plane & Simple Woodworking</h1>
            </div>
            <main id="landing-page">
                {!isLoaded
                    ? <h3>Loading ...</h3>
                    : <>
                        {products && products.map(p => {
                            return <Link key={p.id} to={`product/${p.id}`}>
                                < ProductCard product={p} />
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
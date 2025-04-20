import { useEffect, useState } from "react";
import { getUserCurrentProducts } from "../../redux/products"
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from './ProductCard'
import './MyProductsPage.css'

function MyProductsPage() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)
    const [isLoaded, setLoaded] = useState(true)

    useEffect(() => {
        dispatch(getUserCurrentProducts()).then(() => {
            setLoaded(true)
        })
    }, [dispatch])

    if (!products) return null;

    return (
        <>
            <h1>My products page</h1>
            <main style={{ display: "flex", gap: "10px" }}>
                {!isLoaded
                    ? <h3>Loading ...</h3>
                    : <>
                        {products && products.map(({
                            id,
                            name,
                            department,
                            description,
                            previewImage }) => {
                            return <div key={id}>
                                <ProductCard
                                    id={id}
                                    name={name}
                                    department={department}
                                    description={description}
                                    previewImage={previewImage}
                                />
                            </div>
                        })}
                    </>
                }
            </main>
        </>
    )
}

export default MyProductsPage

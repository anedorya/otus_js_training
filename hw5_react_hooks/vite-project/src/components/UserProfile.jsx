import { useFetch } from "../hooks/useFetch";


function UserProfile() {
    const {data, loading} = useFetch('https://fakestoreapi.com/products')

    if (loading) {
        return <p>Идет загрузка...</p>
    }

    if (!data  || data.length === 0) return <p>Ошибка</p>

    return ( 
        <div>
            <p>Продукты: </p>
             <ul>
                {data.map(product => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>
        </div>
     );
}

export default UserProfile;
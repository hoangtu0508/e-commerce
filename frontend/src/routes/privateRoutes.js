import Dashboard from "../Admin/components/pages/Dashboard/Dashboard"
import EditProducts from "../Admin/components/pages/Products/EditProduct/EditProduct"
import NewProducts from "../Admin/components/pages/Products/NewProducts/NewProducts"
import Products from "../Admin/components/pages/Products/Products"

const privateRoutes = () => [
    {path: '/admin', component: Dashboard},
    {path: 'product', component: Products},
    {path: 'product/new-product', component: NewProducts},
    {path: 'product/eidt-product/:id', component: EditProducts}
]

export default privateRoutes
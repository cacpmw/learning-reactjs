import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { NamedRoutes } from '../routes'
import api from '../services/api'
import '../styles/pages/main.css'
interface IProps {
}

interface IState {
    products: Product[];
    paginationInfo: PaginationInfo
}

interface Product {
    title: string,
    _id: number,
    description: string
}
interface PaginationInfo {
    total: number,
    limit: number,
    page: string,
    pages: number
}


export default class Main extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            products: [],
            paginationInfo: {
                total: 0,
                limit: 0,
                page: "",
                pages: 0
            }
        };
    }

    componentDidMount() {
        this.loadProducts()
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...paginationInfo } = response.data
        this.setState({
            products: docs,
            paginationInfo
        })

    }

    previousPage = () => {
        const paginationInfo = this.state.paginationInfo

        if (Number(paginationInfo.page) === 1) return

        const previousPage = Number(paginationInfo.page) - 1

        this.loadProducts(previousPage)
    }
    nextPage = () => {

        const paginationInfo = this.state.paginationInfo

        if (Number(paginationInfo.page) === paginationInfo.pages) return

        const nextPage = Number(paginationInfo.page) + 1

        this.loadProducts(nextPage)
    }

    render() {

        const { products, paginationInfo } = this.state
        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                        <Link to={NamedRoutes(product._id).products.show}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={Number(paginationInfo.page) === 1} onClick={this.previousPage} >Anterior</button>
                    <button disabled={Number(paginationInfo.page) === paginationInfo.pages} onClick={this.nextPage}> Proximo</button>
                </div>
            </div>
        )
    }
}
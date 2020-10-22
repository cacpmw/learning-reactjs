import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router';
import api from '../services/api'
import '../styles/pages/product.css'

interface MatchParams {
    id: string;
}
interface IProps extends RouteComponentProps<MatchParams> {
}

interface IState {
    product: IProduct;
}

interface IProduct {
    title: string,
    _id: number,
    description: string,
    url: string
}

export default class Product extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            product: {
                _id: 0,
                title: "",
                description: "",
                url: ""
            },
        };
    }
    async componentDidMount() {
        const { id } = this.props.match.params

        const response = await api.get(`/products/${id}`)
        this.setState({
            product: response.data
        })



    }
    render() {
        const { product } = this.state

        return (
            <div className="product-info">
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p>
                    URL: <a target="_blank" rel="noopener noreferrer" href={product.url}>{product.url}</a>
                </p>
            </div>
        )
    }
}
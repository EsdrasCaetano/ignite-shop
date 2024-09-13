import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductContainer, ProdutDetails } from "@/styles/pages/product"
import { GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import Stripe from "stripe"

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
        description: string;
    }
}
export default function Product({ product }: ProductProps) {
    // const { query } = useRouter()

     return (
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt=""/>
            </ImageContainer>

            <ProdutDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>

                <p>
                    {product.description}
                </p>

                <button>Comprar agora</button>
            </ProdutDetails>
        </ProductContainer>
    )
}



export const getStaticPaths = async () => {
    // Aqui você pode fazer uma chamada para buscar os produtos do Stripe ou de outra API
    const products = await stripe.products.list();
  
    const paths = products.data.map(product => ({
      params: { id: product.id }
    }));
  
    return {
      paths, // Gera as páginas estáticas para esses produtos
      fallback: 'blocking', // Se um produto não for gerado na build, tenta gerar dinamicamente no primeiro acesso
    };
  };

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    if (!params || !params.id) {
      return {
        notFound: true,
      }
    }
  
    const productId = params.id;
  
    const product = await stripe.products.retrieve(productId, {
      expand: ['default_price'],
    })
  
    const price = product.default_price as Stripe.Price
  
    return {
      props: {
        product: {
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          price: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format((price.unit_amount ?? 0) / 100),
          description: product.description,
        },
      },
      revalidate: 60 * 60 * 1, // 1 hour
    }
  }
  

  
import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router'
import type { CoinProps } from '../home'

interface ResponseData {
  data: CoinProps
}

interface ErrorData {
  error: string
}

type DataProps = ResponseData | ErrorData

export function Detail() {
  const { cripto } = useParams()
  const navigate = useNavigate()

  const [coin, setCoin] = useState<CoinProps>()

  useEffect(() => {
    async function getCoin(){
      try {
        fetch(`https://rest.coincap.io/v3/assets/${cripto}?key=80721d010992339b45d7c60f828e28fc7faaebb5b74ec870f06381c75a2e211d`)
        .then(response => response.json())
        .then((data: DataProps) => {
          
          if ("error" in data){
            navigate("/")
            return
          }

          const price = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          })

          const priceCompact = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            notation: "compact"
          })

          const resultData = {
            ...data.data,
            formatedPrice: price.format(Number(data.data.priceUsd)),
            formatedMarket: priceCompact.format(Number(data.data.marketCapUsd)),
            formatedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr))
          }

          console.log(resultData)

          setCoin(resultData)

        })

      } catch (error) {
        console.log(error)
        navigate('/')
      }
    }

    getCoin()
  }, [cripto])
  return (
    <div>
      <h1>Página Detalhe da moeda</h1>
    </div>
  )
}
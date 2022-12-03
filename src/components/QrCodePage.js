import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { freightUrl } from '../util'

import logo from '../assets/logo_trans.png'
import { createQRImage } from '../util/qr'
import { Button, Spin } from 'antd'

export default function QrCodePage() {
  const [imgData, setImgData] = useState()
  const [loading, setLoading] = useState(false)

  const params = useParams()
  const {itemId} = params

  async function getQr() {
    setLoading(true)
    try {
      const data = await createQRImage(freightUrl(itemId))
      setImgData(data)
    } catch (e) {
      alert(e)
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getQr()
  }, [itemId])

  if (loading) {
    return <Spin/>
  }


  return (
    <div className='centered'>
      <img src={logo} className='qr-logo'/>
      <br/>
      {imgData && <img className="qr-image" src={imgData} />}
      <br/>
      <br/>
      <p><b>Tracking URL</b><br/><a href={freightUrl(itemId)} target="_blank">{itemId}</a></p>
      <br/>
      <br/>
      <Button className='standard-btn no-print' onClick={() => window.print()}>Print this page</Button>

    </div>
  )
}
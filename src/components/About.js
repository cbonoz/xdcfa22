import React from "react"
import ReactMarkdown from "react-markdown"
import { APP_NAME } from "../constants"

import logo from './../assets/logo_trans.png'

// TODO: replace markdown here

const text = `

Blockfreight
---

Blockfreight is a blockchain product tracking platform for any parcel.

Generates a unique blockchain-backed QR code that can either be presented or placed on the cargo of interest.

### Motivation

Often excel spreadsheets that track the history of inventory and deliveries are shared via email.

For those vendors using existing software platforms (such as Flexport), much of the data is only held centrally within those platforms, subject to custom terms and conditions, and modifiable by their internal teams. Also often need to have a formal app B2B subscription plan.

Other common challenges that occur outside of platforms can include limitations from the non-universal nature of email (emails are private between sender and recipient), delays might not be accurately or consistently reported, and products might be lost.

Using XDC smart contracts, Blockfreight can:
1. Enable an immutable, append-only, history of interactions with given parcels.
2. Create a permission framework (optional) that enforces only certain wallets or user accounts can log events against a given item.
3. Store the data in a transparent way for all parties, where no single party has to be the custodian of the data log.
4. Perform low cost, high volume, and fast transactions.

Every completed freight update via the QR code emits a 'FreightEvent' that gets indexed and appended to the parcel's contract.

`

export const About = () => {
    return <div>
        <br/>
        <img src={logo} className='about-logo'></img>
        <br/>
        <br/>
        <h1>About</h1>
        <ReactMarkdown>{text}</ReactMarkdown>
        <a href="https://github.com/cbonoz/chainfa22" target="_blank">Github</a>
        <p>

</p>

</div>
}
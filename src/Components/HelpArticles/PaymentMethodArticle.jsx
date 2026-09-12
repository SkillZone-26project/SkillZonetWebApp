import React from 'react'
import Nav from '../Nav/Nav'
import HelpLayout from './HelpLayout'
import { paymentMethodArticle } from '../../data/helpArticlesData'


const PaymentMethodArticle = () => {
  return (
    <div>
        <Nav />
              <div className="pt-[72px]">
                <HelpLayout article={paymentMethodArticle} />
              </div>

    </div>
  )
}

export default PaymentMethodArticle
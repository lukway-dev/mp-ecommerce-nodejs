const mercadopago = require('mercadopago')
const mercadopagoButton = document.getElementById('mercadopago-button')

mercadopago.configure({
  access_token: 'TEST-8406703159152890-042221-c4aa848274bd3dcf8cb9a713979a148f-747057913'
})

const createPreference = () => {
  // Add the SDK credentials
  const mp = new MercadoPago('PUBLIC_KEY', {
    locale: 'es-AR'
  })

  // Initialize the checkout
  mp.checkout({
    preference: {
      id: 'YOUR_PREFERENCE_ID'
    },
    render: {
      container: '.cho-container', // Indicates where the payment button is going to be rendered
      label: 'Pagar' // Changes the button label (optional)
    }
  })
}

mercadopagoButton.addEventListener('click', () => { createPreference() })

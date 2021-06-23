// Mercado Pago SDK
const mercadopago = require('mercadopago')
// Add Your credentials
mercadopago.configure({
  access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398'
})

// Create a preference object
const createPreference = (data) => {
  const preference = {
    items: [
      {
        id: '1234',
        title: data.title,
        description: 'Dispositivo móvil de Tienda e-commerce',
        picture_url: data.img,
        unit_price: parseInt(data.price),
        quantity: parseInt(data.unit)
      }
    ],
    payer: {
      name: 'Lalo',
      surname: 'Landa',
      email: 'test_user_63274575@testuser.com',
      phone: {
        area_code: '11',
        number: 22223333
      },
      identification: {
        type: 'DNI',
        number: '12345678'
      },
      address: {
        street_name: 'Falsa',
        street_number: 123,
        zip_code: '1111'
      }
    },
    back_urls: {
      success: 'https://lukway-dev-mp-commerce-nodejs.herokuapp.com/success',
      failure: 'https://lukway-dev-mp-commerce-nodejs.herokuapp.com/failure',
      pending: 'https://lukway-dev-mp-commerce-nodejs.herokuapp.com/pending'
    },
    auto_return: 'approved',
    payment_methods: {
      excluded_payment_methods: [
        {
          id: 'amex'
        }
      ],
      excluded_payment_types: [
        {
          id: 'atm'
        }
      ],
      installments: 6
    },
    notification_url: 'https://lukway-dev-mp-commerce-nodejs.herokuapp.com/notification'
    // external_reference: 'lukway.developer@gmail.com'
    // integrator_id: 'dev_24c65fb163bf11ea96500242ac130004'
  }

  const preferenceId = mercadopago.preferences.create(preference)
    .then(function (response) {
      // This value replaces the String "<%= global.id %>" in your HTML
      return {
        preferenceId: response.body.id,
        initPoint: response.body.init_point
      }
    }).catch(function (error) {
      console.log(error)
    })

  return preferenceId
}

module.exports = createPreference

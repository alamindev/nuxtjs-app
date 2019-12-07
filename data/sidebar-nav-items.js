export default function () {
  return [{
      title: 'Overview',
      to: {
        name: 'overview'
      },
      htmlBefore: '<i class="material-icons">dashboard</i>',
      htmlAfter: ''
    },
    {
      title: 'Payment',
      htmlBefore: '<i class="material-icons">credit_card</i>',
      to: {
        name: 'payment'
      }
    },
    {
      title: 'Menu Editor',
      htmlBefore: '<i class="material-icons">restaurant_menu</i>',
      to: {
        name: 'menu'
      }
    },
    {
      title: 'Employee',
      htmlBefore: '<i class="material-icons">supervisor_account</i>',
      to: {
        name: 'employee'
      }
    }
    // {
    //   title: 'Table',
    //   htmlBefore: '<i class="material-icons">layers</i>',
    //   to: {
    //     name: 'table'
    //   }
    // }
    // {
    //   title: 'Help',
    //   htmlBefore: '<i class="material-icons">help_outline</i>',
    //   to: {
    //     name: 'help'
    //   }
    // }
  ]
}

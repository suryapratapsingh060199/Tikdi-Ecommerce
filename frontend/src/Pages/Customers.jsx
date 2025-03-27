import React from 'react'

export default function Customers() {
  return (
    <div className='Customers'>
    <h1>Your Customers</h1>
      <div className='orders-body'>
        <table class="content-table">
          <thead className='Table_header'>
            <tr className='sticky-table-headers__sticky'>
              <th>Customer Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>City</th>
              <th>Total Orders</th>
              <th>Total Sales</th>

            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  )
}
